declare namespace Authors {
  interface Author {
    id?: string;
    [name: string]: string;
    [lastName: string]: string;
    [firstName: string]: string;
    [website: string]: string;
    [youTube: string]: string;
    [instagram: string]: string;
    [imageUrl: string]: string;
    [recipeCount: string]: number;
  }
}
