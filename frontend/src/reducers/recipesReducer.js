const staticRecipes = [
  {
    id: 1,
    title: 'Breakfast recipe',
    referenceReferenceId: {
      id: 1,
      homepage: 'https://www.nikorittenau.com',
      facebook: '',
      instagram: 'https://www.instagram.com/niko_rittenau',
      youtube: '',
      salutation: {
        title: 'Mr.',
        description: '',
      },
      title: 'Niko Rittenau',
      firstName: 'Niko',
      lastName: 'Rittenau',
      academicTitle: {
        title: '',
        description: '',
      },
    },
    recipesCategoryId: {
      id: 1,
      title: 'breakfast',
    },
    generalValueId: {
      id: 1,
      value: 15,
      generalMeasureId: {
        id: 1,
        abbreviation: 'min',
      },
    },
    url: 'Test url',
  },
  {
    id: 2,
    title: 'Main recipe',
    referenceReferenceId: {
      id: 2,
      homepage: 'https://biancazapatka.com',
      facebook: '',
      instagram: 'https://www.instagram.com/biancazapatka/',
      youtube: '',
      salutation: {
        title: 'Mrs.',
        description: '',
      },
      title: 'Bianca Zapatka',
      firstName: 'Bianca',
      lastName: 'Zapatka',
      academicTitle: {
        title: '',
        description: '',
      },
    },
    recipesCategoryId: {
      id: 1,
      title: 'main',
    },
    generalValueId: {
      id: 1,
      value: 30,
      generalMeasureId: {
        id: 1,
        abbreviation: 'min',
      },
    },
    url: 'Test url',
  },
  {
    id: 3,
    title: 'Drink recipe',
    referenceReferenceId: {
      id: 3,
      homepage: 'https://schnabularasa.com',
      facebook: '',
      instagram: 'https://www.instagram.com/schnabula_rasa/',
      youtube: '',
      salutation: {
        title: 'Mrs.',
        description: '',
      },
      title: 'Schnabularasa',
      firstName: 'Jelena',
      lastName: '',
      academicTitle: {
        title: '',
        description: '',
      },
    },
    recipesCategoryId: {
      id: 1,
      title: 'drinks',
    },
    generalValueId: {
      id: 1,
      value: 30,
      generalMeasureId: {
        id: 1,
        abbreviation: 'min',
      },
    },
    url: 'Test url',
  },
  {
    id: 4,
    title: 'Dessert recipe',
    referenceReferenceId: {
      id: 4,
      homepage: 'https://maxlamanna.com',
      facebook: 'https://www.facebook.com/maxlmanna74',
      instagram: 'https://www.instagram.com/maxlamanna/',
      youtube: 'https://www.youtube.com/channel/UCusvG_uAvkU_4qzx788Z3HQ',
      salutation: {
        title: 'Mr.',
        description: '',
      },
      title: 'maxlamanna',
      firstName: 'Max',
      lastName: 'La Manna',
      academicTitle: {
        title: '',
        description: '',
      },
    },
    recipesCategoryId: {
      id: 1,
      title: 'dessert',
    },
    generalValueId: {
      id: 1,
      value: 30,
      generalMeasureId: {
        id: 1,
        abbreviation: 'min',
      },
    },
    url: 'Test url',
  },
];

/**
 * Updates the state property recipes with the payload of the action it receives
 * @param  {Array}    [state=staticRecipes]               Current list of recipes
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of recipes
 */
const recipesReducer = (state = staticRecipes, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default recipesReducer;
