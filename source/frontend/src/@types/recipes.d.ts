declare namespace Recipes {
  import { AmountUnit } from '@/utils/constants';

  interface Recipe {
    title: string;
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
