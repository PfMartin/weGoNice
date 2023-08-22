export const checkFileTypeValid = (fileType: string): string => {
  const allowedTypes = ['png', 'jpg', 'PNG', 'JPG'];
  if (!allowedTypes.includes(fileType)) {
    return `Please select a '.png' file or a '.jpg' file`;
  }

  return '';
};
