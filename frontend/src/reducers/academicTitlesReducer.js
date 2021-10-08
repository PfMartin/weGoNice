const staticAcademicTitles = [
  {
    id: 1,
    title: '---',
  },
  {
    id: 2,
    title: 'B.Sc.',
  },
  {
    id: 3,
    title: 'M.Sc.',
  },
  {
    id: 4,
    title: 'Dr.',
  },
];

/**
 * Updates the state property academicTitles with the payload of the action it receives
 * @param  {Array}    [state=staticSaluations]            Current list of academicTitles
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of academicTitles
 */
const academicTitlesReducer = (state = staticAcademicTitles, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default academicTitlesReducer;
