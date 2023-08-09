import { SortDirections } from '@/utils/constants';

export const sortRecipes = (
  sortDirection: SortDirections,
  selectedSortingKey: string,
  recipes: Recipes.Recipe[]
) => {
  const sortKey = (selectedSortingKey.charAt(0).toLowerCase() +
    selectedSortingKey.slice(1)) as keyof Recipes.Recipe;

  return recipes.sort((a: Recipes.Recipe, b: Recipes.Recipe) => {
    switch (selectedSortingKey) {
      case 'Author':
        if (!a.author || !b.author) {
          return -1;
        }
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
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal && bVal && aVal < bVal) {
          return sortDirection === SortDirections.ASC ? -1 : 1;
        }
        return sortDirection === SortDirections.ASC ? 1 : -1;
    }
  });
};
