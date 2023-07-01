declare namespace Recipes {
  import { AmountUnit } from '@/utils/constants';

  interface Recipe {
    title: string;
  }

  interface Ingredient {
    title: string;
    amount: number;
    unit: AmountUnit;
  }
}
