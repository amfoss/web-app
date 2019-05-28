import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('app'));
  serviceWorker.unregister();
}

renderApp();
if (module.hot) {
  module.hot.accept(renderApp);
}
