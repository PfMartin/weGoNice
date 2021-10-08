const staticPossibleCategories = [
  {
    id: 1,
    title: 'breakfast',
  },
  {
    id: 2,
    title: 'main',
  },
  {
    id: 3,
    title: 'basics',
  },
  {
    id: 4,
    title: 'dessert',
  },
  {
    id: 5,
    title: 'drinks',
  },
];

const recipeCategoriesReducer = (state = staticPossibleCategories) => {
  return state;
};

export default recipeCategoriesReducer;
