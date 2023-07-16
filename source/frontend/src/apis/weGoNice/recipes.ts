import {
  url,
  headers,
  handleError,
  addAuthorization,
} from '@/apis/weGoNice/utils';
import axios from 'axios';

export const createRecipe = async (
  body: Recipes.Recipe
): Promise<WeGoNiceApi.RequestResponse> => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.post(`${url}/recipes`, body, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};
