declare namespace Recipes {
  import { AmountUnit } from '@/utils/constants';

  interface Recipe {
    name: string;
    authorId: string;
    timeHours: number;
    timeMinutes: number;
  }

  interface Ingredient {
    rank: number;
    title: string;
    amount: number;
    unit: AmountUnit;
  }

  interface PrepStep {
    rank: number;
    title: string;
  }
}
