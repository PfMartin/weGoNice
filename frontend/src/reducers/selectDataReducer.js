const INITIAL_STATE = {
  academicTitles: [],
  recipeCategories: [],
  genders: [],
  measures: [],
};

const selectDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ACADEMIC_TITLES':
      return { ...state, academicTitles: action.payload };
    case 'FETCH_RECIPE_CATEGORIES':
      return { ...state, recipeCategories: action.payload };
    case 'FETCH_GENDERS':
      return { ...state, genders: action.payload };
    case 'FETCH_MEASURES':
      return { ...state, measures: action.payload };
    default:
      return state;
  }
};

export default selectDataReducer;
