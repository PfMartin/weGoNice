package files

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/PfMartin/weGoNice/server/pkg/testUtils"
	"github.com/rs/zerolog/log"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
)

type testArgs struct {
	name               string
	testFileName       string
	expectedCode       int
	isSameFileExpected bool
}

const url = "http://localhost:8080/files"
const tmpFilesUrl = "http://localhost:8080/tmp_files"

func TestUploadImage(t *testing.T) {
	os.Setenv("FILE_DEPOT", "../testUtils/files/perm")

	tests := []testArgs{
		{name: "with acceptable file extension", testFileName: "test-image.png", expectedCode: http.StatusOK, isSameFileExpected: true},
		{name: "with inacceptable file extension", testFileName: "test.txt", expectedCode: http.StatusInternalServerError, isSameFileExpected: false},
	}

	for _, tt := range tests {

		h := NewHandler()
		err := godotenv.Load("../../.env")
		if err != nil {
			log.Info().Msg(".env file not loaded. Using environment variables on machine.")
		}

		// Create path to test-image
		dir, err := os.Getwd()
		if err != nil {
			t.Errorf("Failed to get working directory: %s", err)
		}

		name := fmt.Sprintf("../testUtils/files/%s", tt.testFileName)
		path := path.Join(dir, name)

		// Open file and create multipart FormFile
		testFile, err := os.Open(path)
		if err != nil {
			t.Errorf("Could not open file with path '%s': %s", path, err)
		}
		defer testFile.Close()

		body := &bytes.Buffer{}
		writer := multipart.NewWriter(body)
		part, err := writer.CreateFormFile("picture", filepath.Base(testFile.Name()))
		if err != nil {
			t.Errorf("Failed to create FormFile from file named '%s': %s", testFile.Name(), err)
		}

		io.Copy(part, testFile)
		writer.Close()

		// Create Request
		authorId := "111"
		req := httptest.NewRequest(http.MethodPost, url+"/"+authorId, body)
		req.Header.Add("Content-Type", writer.FormDataContentType())
		req = mux.SetURLVars(req, map[string]string{"id": authorId})

		w := httptest.NewRecorder()

		h.SaveFile(w, req)

		got := w.Code

		assert.Equal(t, tt.expectedCode, got, "Test failed:\nExpected: %d | Got: %d", tt.expectedCode, got)

		if tt.isSameFileExpected {
			currentDate := time.Now().Format("2006-01-02") // Very strange formatting with go standard library
			depotDir := os.Getenv("FILE_DEPOT")

			fileNameSlice := strings.Split(tt.testFileName, ".")
			fName := fileNameSlice[0]
			fType := fileNameSlice[1]

			depotFilePath := fmt.Sprintf("%s/%s-%s-%s.%s.gz", depotDir, currentDate, authorId, fName, fType)

			// Decompress uploaded file
			compressedFile, err := os.Open(depotFilePath)
			if err != nil {
				t.Errorf("Error while opening the compressed perm file: %s", err)
			}
			defer compressedFile.Close()

			archive, err := gzip.NewReader(compressedFile)
			if err != nil {
				t.Errorf("Error while reading the compressed perm file with gzip reader: %s", err)
			}
			defer archive.Close()

			decompressedFilePath := strings.Split(depotFilePath, ".gz")[0]
			decompressedFile, err := os.Create(decompressedFilePath)
			if err != nil {
				t.Errorf("Error creating the decompressed file path: %s", err)
			}
			defer decompressedFile.Close()

			_, err = io.Copy(decompressedFile, archive)
			if err != nil {
				t.Errorf("Error while copying content to decompressed file: %s", err)
			}

			isSameFile := testUtils.CompareFileContent(decompressedFilePath, fmt.Sprintf("../testUtils/files/%s", tt.testFileName))

			assert.Equal(t, tt.isSameFileExpected, isSameFile, "Test failed:\nExpected: %b | Got: %b", tt.isSameFileExpected, isSameFile)

			if err := os.Remove(depotFilePath); err != nil {
				t.Errorf("Error while removing the test image: %s", err)
			}

			if err := os.Remove(decompressedFilePath); err != nil {
				t.Errorf("Error while removing the decompressed test image: %s", err)
			}
		}
	}
}

func TestServeImage(t *testing.T) {
	fileName := "test-image.png"
	os.Setenv("FILE_DEPOT", "../../files")

	// Copy file to fileDepot

	path := fmt.Sprintf("../testUtils/files/%s.gz", fileName)
	fileIn, err := os.Open(path)
	if err != nil {
		t.Errorf("Could not open file in path '%s': %s", path, err)
	}
	defer fileIn.Close()

	destination := fmt.Sprintf("%s/%s.gz", os.Getenv("FILE_DEPOT"), fileName)
	fileOut, err := os.Create(destination)
	if err != nil {
		t.Errorf("Could not create file destination '%s': %s", destination, err)
	}
	defer fileOut.Close()

	_, err = io.Copy(fileOut, fileIn)
	if err != nil {
		t.Errorf("Could not copy file: %s", err)
	}

	// Test serving the file

	req := httptest.NewRequest(http.MethodGet, url+"/"+fileName, nil)
	req.Header.Add("Content-Type", "image")
	req = mux.SetURLVars(req, map[string]string{"filename": fileName})

	w := httptest.NewRecorder()

	h := NewHandler()
	h.ServeFile(w, req)

	res := w.Result()
	defer res.Body.Close()

	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		t.Errorf("Failed to read body of response %s", err)
	}

	err = os.WriteFile(fileName, data, 0644)
	if err != nil {
		t.Errorf("Failed to write file %s", err)
	}

	expectedStatus := http.StatusOK
	receivedStatus := w.Code

	assert.Equal(t, expectedStatus, receivedStatus, "Test failed:\nExpected: %b | Got: %b", expectedStatus, receivedStatus)

	// isSameFile := testUtils.CompareFileContent(fmt.Sprintf("../../files/%s", fileName), fmt.Sprintf("../testUtils/files/%s", fileName))
	// expectIsSameFile := true

	// assert.Equal(t, expectIsSameFile, isSameFile, "Test failed:\nExpected: %b | Got: %b", expectIsSameFile, isSameFile)

	if err := os.Remove(destination); err != nil {
		t.Errorf("Error while removing the test image from file depot: %s", err)
	}

	if err := os.Remove(fileName); err != nil {
		t.Errorf("Error while removing the test image from file test dir: %s", err)
	}
}

func TestMoveImage(t *testing.T) {
	h := NewHandler()

	dir, err := os.Getwd()
	if err != nil {
		t.Errorf("Failed to get working directory: %s", err)
	}

	tmpCompressedFilePath := path.Join(dir, "../testUtils/files/tmp/test-image.png.gz")
	tmpTestFilePath := path.Join(dir, "../testUtils/files/tmp/test-image.png")
	tmpTestFile, err := os.Create(tmpCompressedFilePath)
	if err != nil {
		t.Errorf("Failed to create temporary testfile: %s", err)
	}
	defer tmpTestFile.Close()

	testFilePath := path.Join(dir, "../testUtils/files/perm/test-image.png")
	err = h.MoveTmpFileToPerm(tmpTestFilePath, testFilePath, true)
	if err != nil {
		t.Errorf("Failed to move temp file to perm: %s", err)
	}

	compressedTestFilePath := fmt.Sprintf("%s.gz", testFilePath)
	err = os.Remove(compressedTestFilePath)
	if err != nil {
		t.Errorf("Failed to remove test file path")
	}
}

func TestRemoveTmpFile(t *testing.T) {
	fileName := "test-temp-image.png"

	dir, err := os.Getwd()
	if err != nil {
		t.Errorf("Failed to get working directory: %s", err)
	}
	os.Setenv("TMP_FILE_DEPOT", "../testUtils/files/tmp")

	srcFilePath := path.Join(dir, "../testUtils/files/test-image.png")
	srcFile, err := os.Open(srcFilePath)
	if err != nil {
		t.Errorf("Failed to open the source file, while preparing the files for the test.")
	}
	defer srcFile.Close()

	destPath := path.Join(dir, fmt.Sprintf("../testUtils/files/tmp/%s", fileName))
	destFile, err := os.Create(destPath)
	if err != nil {
		t.Errorf("Failed to create tmp file for testing")
	}
	defer destFile.Close()

	_, err = io.Copy(destFile, srcFile)
	if err != nil {
		t.Errorf("Failed to copy the file")
	}

	req := httptest.NewRequest(http.MethodDelete, tmpFilesUrl+"/"+fileName, nil)
	req = mux.SetURLVars(req, map[string]string{"filename": fileName})

	w := httptest.NewRecorder()

	h := NewHandler()
	h.RemoveFileTmp(w, req)

	assert.Equal(t, w.Code, 200)
}
