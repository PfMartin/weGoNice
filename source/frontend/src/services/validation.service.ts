export default class ValidationService {
  public validateEmail = (): string => {
    return 'Please enter a valid email address';
  };

  public validatePassword = (): string => {
    return 'The password must be at lease 5 characters long';
  };

  public validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string => {
    if (password !== confirmPassword) {
      return "The provided passwords don't match";
    }

    return '';
  };
}
