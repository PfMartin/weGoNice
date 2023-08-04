package files

import (
	"fmt"
	"os"
)

func RemoveCompressedFile(filePath string) error {
	compressedFilePath := fmt.Sprintf("%s.gz", filePath)
	err := os.Remove(compressedFilePath)

	return err
}
