/**
 * Action creator to switch to the desired app
 * @param  {string} targetApp         Specifies the desired app
 * @return {action}                   Action
 */
const switchApp = (targetApp) => {
  return {
    type: 'APP_SELECTED',
    payload: targetApp,
  };
};

/**
 * Action creator to switch to the desired view
 * @param  {string} targetView        Specifies the desired view
 * @return {action}                   Action
 */
const switchView = (targetView) => {
  return {
    type: 'VIEW_SELECTED',
    payload: targetView,
  };
};

module.exports = {
  switchApp,
  switchView,
};
