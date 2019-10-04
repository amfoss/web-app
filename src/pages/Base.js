import React, {useEffect, useState} from 'react';
import classnames from 'classnames';
import SEO from '../components/Seo';
import Topbar from '../components/topbar';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Base = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      const darkThemeEnabled = localStorage.getItem('darkMode');
      setDarkTheme(darkThemeEnabled === '1');
      setLoaded(true);
    }
  });

  const switchTheme = () => {
    setDarkTheme(!darkTheme);
    if(darkTheme)
      localStorage.setItem('darkMode', '0');
    else
      localStorage.setItem('darkMode', '1');
  };

  return (
    <React.Fragment>
      <SEO title="Attendance" />
      <Topbar dark={darkTheme} onChangeTheme={() => switchTheme()} />
      <div className={classnames('page-container', darkTheme ? 'bp3-dark' : null)}>{children}</div>
    </React.Fragment>
  );
};

export default Base;
