export const AUTHOR_SORTING_OPTIONS = [
  'FirstName',
  'LastName',
  'Name',
  'CreatedAt',
  'ModifiedAt',
  'Amount of Recipes', // Still has to be implemented
];

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
