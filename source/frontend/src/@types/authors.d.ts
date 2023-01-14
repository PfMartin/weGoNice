declare namespace Authors {
  interface Author {
    name: string;
    lastname: string;
    firstname: string;
    website: string;
    youTube: string;
    instagram: string;
    imageUrl: string;
  }

  enum OperationMode {
    Edit,
    Create,
  }
}
