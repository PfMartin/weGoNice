package files

import (
	"compress/gzip"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/rs/zerolog"
)

func RemoveCompressedFile(filePath string) error {
	compressedFilePath := fmt.Sprintf("%s.gz", filePath)
	err := os.Remove(compressedFilePath)

	return err
}

func MoveTmpFileToPerm(tmpFilePath string, filePath string, isWithDelete bool, logger zerolog.Logger) error {
	errMsg := "Failed to update author with new imageName"

	compressedTmpFilePath := fmt.Sprintf("%s.gz", tmpFilePath)
	tmpFile, err := os.Open(compressedTmpFilePath)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to open temporary file during file copy")
		return fmt.Errorf("%s: %s", errMsg, err)
	}

	compressedPermFilePath := fmt.Sprintf("%s.gz", filePath)
	permFile, err := os.Create(compressedPermFilePath)
	if err != nil {
		tmpFile.Close()
		return fmt.Errorf("%s: %s", errMsg, err)
	}
	defer permFile.Close()

	_, err = io.Copy(permFile, tmpFile)
	tmpFile.Close()
	if err != nil {
		logger.Error().Err(err).Msg("Failed to copy temporary file to file")
		return fmt.Errorf("%s: %s", errMsg, err)
	}

	if isWithDelete {
		err = RemoveCompressedFile(tmpFilePath)
		if err != nil {
			logger.Error().Err(err).Msg("Failed to remove temp file")
			return fmt.Errorf("%s: %s", errMsg, err)
		}
	}

	return nil
}

func ValidateFileExtension(fileExtension string) error {
	lowerExtension := strings.ToLower(fileExtension)
	possibleExtensions := []string{"jpg", "png"}

	if lowerExtension != possibleExtensions[0] && lowerExtension != possibleExtensions[1] {
		return fmt.Errorf("image must be '.%s' or '.%s'", possibleExtensions[0], possibleExtensions[1])
	}

	return nil
}

func GzipFile(sourcePath string, targetPath string) error {
	sourceFile, err := os.Open(sourcePath)
	if err != nil {
		return err
	}
	defer sourceFile.Close()

	targetFile, err := os.Create(targetPath)
	if err != nil {
		return err
	}
	defer targetFile.Close()

	archiver := gzip.NewWriter(targetFile)
	defer archiver.Close()

	_, err = io.Copy(archiver, sourceFile)
	if err != nil {
		return err
	}

	err = os.Remove(sourcePath)
	return err
}
