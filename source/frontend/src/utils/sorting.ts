import { SortDirections } from '@/utils/constants';

export const sortRecipes = (
  sortDirection: SortDirections,
  selectedSortingKey: string,
  recipes: Recipes.Recipe[]
) => {
  const sortKey: string =
    selectedSortingKey.charAt(0).toLowerCase() + selectedSortingKey.slice(1);

  return recipes.sort((a: any, b: any) => {
    switch (selectedSortingKey) {
      case 'Author':
        if (a.author.name && b.author.name) {
          if (a.author.name < b.author.name) {
            return sortDirection === SortDirections.ASC ? -1 : 1;
          } else {
            return sortDirection === SortDirections.ASC ? 1 : -1;
          }
        } else if (a.author.lastName && b.author.lastName) {
          if (a.author.lastName < b.author.lastName) {
            return sortDirection === SortDirections.ASC ? -1 : 1;
          } else {
            return sortDirection === SortDirections.ASC ? 1 : -1;
          }
        } else if (a.author.firstName && b.author.firstName) {
          if (a.author.firstName < b.author.firstName) {
            return sortDirection === SortDirections.ASC ? -1 : 1;
          } else {
            return sortDirection === SortDirections.ASC ? 1 : -1;
          }
        }
        return sortDirection === SortDirections.ASC ? 1 : -1;
      case 'Time':
        if (
          a.timeHours * 60 + a.timeMinutes <
          b.timeHours * 60 + b.timeMinutes
        ) {
          return sortDirection === SortDirections.ASC ? -1 : 1;
        }
        return sortDirection === SortDirections.ASC ? 1 : -1;
      default:
        if (a[sortKey] < b[sortKey]) {
          return sortDirection === SortDirections.ASC ? -1 : 1;
        }
        return sortDirection === SortDirections.ASC ? 1 : -1;
    }
  });
};
