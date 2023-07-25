declare namespace Authors {
  interface Author extends Record<string, string> {
    id: string;
    name: string;
    lastName: string;
    firstName: string;
    website: string;
    youTube: string;
    instagram: string;
    imageUrl: string;
  }
}
