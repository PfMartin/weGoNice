export const checkFileTypeValid = (fileType: string): boolean => {
  const allowedTypes = ['png', 'jpg'];
  if (!allowedTypes.includes(fileType)) {
    return false;
  }

  return true;
};
