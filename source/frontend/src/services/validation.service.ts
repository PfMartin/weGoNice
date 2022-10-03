export default class ValidationService {
  private password: string;

  constructor() {
    this.password = '';
  }

  public validateEmail = (value: string): string =>
    value.includes('@') || value === ''
      ? ''
      : 'Please enter a valid email address';

  public validatePassword = (password: string): string => {
    this.password = password;
    return password.length >= 5 || password === ''
      ? ''
      : 'The password must be at least 5 characters long';
  };

  public validateConfirmPassword = (confirmPassword: string): string =>
    this.password !== confirmPassword
      ? "The provided passwords don't match"
      : '';
}
