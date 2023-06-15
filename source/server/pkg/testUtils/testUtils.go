package testUtils

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

var testDate = time.Date(2020, time.April, 11, 21, 34, 01, 0, time.UTC)
var updateDate = time.Date(2020, time.May, 12, 10, 0, 0, 0, time.UTC)

var collections = []string{"users", "authors"}

func ClearDatabase(db *mongo.Client) error {
	var err error

	for _, collection := range collections {
		if err = db.Database("weGoNice").Collection(collection).Drop(context.TODO()); err != nil {
			return err
		}
	}

	return nil
}

func CompareFileContent(file1 string, file2 string) bool {
	f1, err := os.Open(file1)
	if err != nil {
		log.Printf("Error while opening file1: %s", err)
	}
	defer f1.Close()

	f2, err := os.Open(file2)
	if err != nil {
		log.Printf("Error while opening file2: %s", err)
	}
	defer f2.Close()

	chunkSize := 8

	for {
		b1 := make([]byte, chunkSize)
		_, err1 := f1.Read(b1)

		b2 := make([]byte, chunkSize)
		_, err2 := f2.Read(b2)

		if err1 != nil || err2 != nil {
			if err1 == io.EOF && err2 == io.EOF {
				return true
			} else if err1 == io.EOF || err2 == io.EOF {
				return false
			} else {
				log.Printf("Something went wrong, while comparing chunks: %s and %s", b1, b2)
				return false
			}
		}

		if !bytes.Equal(b1, b2) {
			log.Println(b1)
			log.Println(b2)
			return false
		}
	}

}

func PrepareFile() error {
	// Copy testfile to tmp file depot
	testFilePath := "../testUtils/files/test-image.png"
	tmpFileDepot := os.Getenv("TMP_FILE_DEPOT")

	fileIn, err := os.Open(testFilePath)
	if err != nil {
		return fmt.Errorf("could not open file in path '%s': %s", testFilePath, err)
	}
	defer fileIn.Close()

	destination := fmt.Sprintf("%s/testImage.png", tmpFileDepot)
	fileOut, err := os.Create(destination)
	if err != nil {
		return fmt.Errorf("could not create file destination '%s': %s", destination, err)
	}
	defer fileOut.Close()

	_, err = io.Copy(fileOut, fileIn)
	if err != nil {
		return fmt.Errorf("could not copy file: %s", err)
	}

	return nil
}

func ClearTestFileDepot() error {
	testFileDepot := os.Getenv("FILE_DEPOT")

	err := os.RemoveAll(testFileDepot)
	if err != nil {
		return fmt.Errorf("failed to remove all files from Test File Depot: %s", err)
	}

	err = os.Mkdir(testFileDepot, os.ModePerm)
	if err != nil {
		return fmt.Errorf("failed to readd Test File Depot: %s", err)
	}

	return nil
}
