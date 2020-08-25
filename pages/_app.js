import React from 'react';

import '../styles/styles.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import 'antd/dist/antd.min.css';
import 'react-markdown-editor-lite/lib/index.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
