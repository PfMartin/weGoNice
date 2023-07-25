declare namespace Authors {
  interface Author extends Record<string, string> {
    [id: string | undefined]: string;
    [name: string]: string;
    [lastName: string]: string;
    [firstName: string]: string;
    [website: string]: string;
    [youTube: string]: string;
    [instagram: string]: string;
    [imageUrl: string]: string;
  }
}
