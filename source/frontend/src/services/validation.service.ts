export default class ValidationService {
  private password: string;

  constructor() {
    this.password = '';
  }

  public validateEmail = (value: string): string =>
    value.includes('@') && value.includes('.')
      ? ''
      : 'Please enter a valid email address';

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

  public validateAuthorName = (name: string): string =>
    name ? '' : 'Please provide a name for the author';

  public validateWebsite = (url: string): string =>
    url && !url.includes('.') ? 'Please provide a valid website URL' : '';

  public validateYouTube = (url: string): string =>
    url && !url.includes('youtube.com/channel/')
      ? 'Please provide a valid YouTube URL'
      : '';

  public validateInstagram = (url: string): string =>
    url && !url.includes('instagram.com/')
      ? 'Please provide a valid Instagram URL'
      : '';

  public validateImageUrl = (url: string): string =>
    url && !url.includes('https://') ? 'Please provide a valid URL' : '';

  public validateRecipeTitle = (title: string): string =>
    title ? '' : 'Please provide a title for the recipe';

  public validateRecipeAuthor = (author: Authors.Author) =>
    author ? '' : 'Please select an author';

  public validateIngredientTitle = (title: string) =>
    title ? '' : 'Please provide a title for the ingredient';

  public validatePrepStepTitle = (title: string) =>
    title ? '' : 'Please provide a description for the preparation step';
}
