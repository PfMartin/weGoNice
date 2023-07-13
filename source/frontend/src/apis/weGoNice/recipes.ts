import {
  url,
  headers,
  handleError,
  addAuthorization,
} from '@/apis/weGoNice/utils';

export const createRecipe = async (
  body: Recipes.Recipe
): Promise<WeGoNiceApi.RequestResponse> => {
  headers.Authorization = addAuthorization();

  try {
    console.warn(body);

    return {
      status: 200,
      data: {
        test: 'test',
      },
    };
  } catch (error) {
    return handleError(error);
  }
};
