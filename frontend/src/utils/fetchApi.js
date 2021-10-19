const API_BASE = 'http://localhost:8000';
const mode = 'cors';
const headers = {
  'Content-Type': 'application/json',
};

export const fetchGetAll = async (appPart, modelPart) => {
  try {
    const response = await fetch(`${API_BASE}/${appPart}/${modelPart}`, {
      method: 'GET',
      mode: mode,
      headers: headers,
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(`Error fetching: ${API_BASE}/${appPart}/${modelPart}`);
    console.error(err);
  }
};

export const fetchGetOne = async (appPart, modelPart, id) => {
  try {
    const response = await fetch(`${API_BASE}/${appPart}/${modelPart}/${id}`, {
      method: 'GET',
      mode: mode,
      headers: headers,
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(`Error fetching: ${API_BASE}/${appPart}/${modelPart}/${id}`);
    console.error(err);
  }
};

export const fetchPost = async (appPart, modelPart, body) => {
  try {
    const response = await fetch(`${API_BASE}/${appPart}/${modelPart}/`, {
      method: 'POST',
      mode: mode,
      headers: headers,
      body: body,
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(`Error posting: ${API_BASE}/${appPart}/${modelPart}`);
    console.error(err);
  }
};

export const fetchPut = async (appPart, modelPart, id, body) => {
  try {
    const response = await fetch(`${API_BASE}/${appPart}/${modelPart}/${id}/`, {
      method: 'PUT',
      mode: mode,
      headers: headers,
      body: body,
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(`Error updating: ${API_BASE}/${appPart}/${modelPart}/${id}`);
    console.error(err);
  }
};

export const fetchDelete = async (appPart, modelPart, id) => {
  try {
    const response = await fetch(`${API_BASE}/${appPart}/${modelPart}/${id}`, {
      method: 'DELETE',
      model: mode,
      headers: headers,
    });

    return response.json();
  } catch (err) {
    console.log(`Error deleting: ${API_BASE}/${appPart}/${modelPart}/${id}`);
    console.error(err);
  }
};
