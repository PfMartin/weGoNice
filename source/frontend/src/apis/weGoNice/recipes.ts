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

export const getAllRecipes = async () => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.get(`${url}/recipes`, {
      headers,
    });

    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getRecipeById = async (id: string | string[]) => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.get(`${url}/recipes/${id}`, {
      headers,
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateRecipeById = async (
  id: string,
  body: Recipes.Recipe
): Promise<WeGoNiceApi.RequestResponse> => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.put(`${url}/recipes/${id}`, body, {
      headers,
    });
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteRecipeById = async (id: string | string[]) => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.delete(`${url}/recipes/${id}`, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getRecipesByAuthorId = async (authorId: string | string[]) => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.get(`${url}/recipes/author/${authorId}`, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};
