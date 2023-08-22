export const AUTHOR_SORTING_OPTIONS = [
  'FirstName',
  'LastName',
  'Name',
  'CreatedAt',
  'ModifiedAt',
  'Number of recipes',
];

export const RECIPE_SORTING_OPTIONS = ['Name', 'Category', 'Author', 'Time'];

export const PREP_TIME_HOURS_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7'];
export const PREP_TIME_MINUTES_OPTIONS = [
  '0',
  '5',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];
export const CATEGORY_OPTIONS = ['Breakfast', 'Drink', 'Desert', 'Main'];
export enum AmountUnit {
  G = 'g',
  Ml = 'ml',
  L = 'l',
  Pc = 'pc',
}

export enum OperationMode {
  Create,
  Edit,
}

export enum SortDirections {
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
