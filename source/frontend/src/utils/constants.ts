export const AUTHOR_SORTING_OPTIONS = [
  'FirstName',
  'LastName',
  'Name',
  'CreatedAt',
  'ModifiedAt',
  'Amount of Recipes', // Still has to be implemented
];

export enum OperationMode {
  Create,
  Edit,
}

export enum sortDirections {
  ASC,
  DESC,
}

export enum ButtonType {
  Primary,
  Delete,
  Default,
}

export enum PrepTimeType {
  Hours,
  Minutes,
}
