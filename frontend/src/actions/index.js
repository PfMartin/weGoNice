/**
 * Action creator to switch to the desired app
 * @param  {string} app               Specifies the desired app
 * @return {action}                   Action
 */
const switchApp = (app) => {
  return {
    type: 'APP_SELECTED',
    payload: app,
  };
};

module.exports = {
  switchApp,
};
