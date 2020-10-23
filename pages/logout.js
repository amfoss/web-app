import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

import LoadingScreen from '../components/loadingScreen';

const cookies = new Cookies();

const LogoutPage = () => {
  const router = useRouter();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    cookies.remove('token');
    cookies.remove('refreshToken');
    cookies.remove('username');
    cookies.remove('expiry');
    if (!loggedOut) {
      setLoggedOut(true);
      router.push('/login');
    }
  });

  return <LoadingScreen text="Please wait logging you out ..." />;
};

export default LogoutPage;
