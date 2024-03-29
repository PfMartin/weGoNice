declare namespace Recipes {
  import { AmountUnit } from '@/utils/constants';

  interface Recipe {
    id?: string;
    name: string;
    url: string;
    author?: Authors.Author;
    authorId: string;
    timeHours: number;
    timeMinutes: number;
    category: string;
    ingredients: Ingredient[];
    steps: PrepStep[];
    imageName: string;
  }

  interface Ingredient {
    rank: number;
    name: string;
    amount: number;
    unit: AmountUnit;
  }

  interface PrepStep {
    rank: number;
    name: string;
  }
}
