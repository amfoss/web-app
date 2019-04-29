import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('app'));
  registerServiceWorker();
}

renderApp();
if (module.hot) {
  module.hot.accept(renderApp);
}
