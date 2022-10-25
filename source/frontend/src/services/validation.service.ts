export default class ValidationService {
  private password: string;

  constructor() {
    this.password = '';
  }

  public validateEmail = (value: string): string =>
    value.includes('@') ? '' : 'Please enter a valid email address';

  public validatePassword = (password: string, isRegister: boolean): string => {
    this.password = password;
    const errMsg = isRegister
      ? 'The password must be at least 5 characters long'
      : 'The password is not correct';

    return password.length >= 5 ? '' : errMsg;
  };

  public validateConfirmPassword = (confirmPassword: string): string =>
    this.password !== confirmPassword
      ? "The provided passwords don't match"
      : '';
}
