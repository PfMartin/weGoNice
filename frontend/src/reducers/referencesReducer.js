const staticReferences = [
  {
    id: 1,
    homepage: 'https://www.nikorittenau.com',
    facebook: '',
    instagram: 'https://www.instagram.com/niko_rittenau',
    youtube: '',
    salutation: {
      title: 'Mr.',
      description: '',
    },
    nickname: '',
    firstName: 'Niko',
    lastName: 'Rittenau',
    academicTitle: {
      title: '',
      description: '',
    },
  },
  {
    id: 2,
    homepage: 'https://biancazapatka.com',
    facebook: '',
    instagram: 'https://www.instagram.com/biancazapatka/',
    youtube: '',
    salutation: {
      title: 'Mrs.',
      description: '',
    },
    nickname: '',
    firstName: 'Bianca',
    lastName: 'Zapatka',
    academicTitle: {
      title: '',
      description: '',
    },
  },
  {
    id: 3,
    homepage: 'https://schnabularasa.com',
    facebook: '',
    instagram: 'https://www.instagram.com/schnabula_rasa/',
    youtube: '',
    salutation: {
      title: 'Mrs.',
      description: '',
    },
    nickname: 'Schnabularasa',
    firstName: 'Jelena',
    lastName: '',
    academicTitle: {
      title: '',
      description: '',
    },
  },
  {
    id: 4,
    homepage: 'https://maxlamanna.com',
    facebook: 'https://www.facebook.com/maxlmanna74',
    instagram: 'https://www.instagram.com/maxlamanna/',
    youtube: 'https://www.youtube.com/channel/UCusvG_uAvkU_4qzx788Z3HQ',
    salutation: {
      title: 'Mr.',
      description: '',
    },
    nickname: 'maxlamanna',
    firstName: 'Max',
    lastName: 'La Manna',
    academicTitle: {
      title: '',
      description: '',
    },
  },
];

/**
 * Updates the state property references with the payload of the action it receives
 * @param  {Array}    [state=staticReferences]            Current list of references
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of references
 */
const referencesReducer = (state = staticReferences, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default referencesReducer;
