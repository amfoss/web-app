import React from 'react';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import Router from 'next/router';

import LoadingScreen from './loadingScreen';
import Base from './base';

const AuthRequired = ({
  children,
  loaded,
  isAdmin,
  isClubMember,
  verificationRequired,
}) => {
  return loaded ? (
    isAdmin || isClubMember ? (
      children
    ) : (
      <Base
        title={verificationRequired ? `Verification Needed` : `Access Denied`}
        verificationRequired={false}
      >
        <div
          className="h-100 justify-content-center d-flex align-items-center"
          style={{ minHeight: '100vh' }}
        >
          <Result
            status="403"
            title="403"
            subTitle={
              verificationRequired
                ? `Please update your profile and contact any administrator of amFOSS CMS to get your profile verified.`
                : `Sorry, you are not authorized to access this page.`
            }
            extra={
              <React.Fragment>
                {verificationRequired ? (
                  <Button
                    type="primary"
                    onClick={() => Router.push('/account/settings')}
                  >
                    Update your profile
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => Router.push('/')}>
                    Back Home
                  </Button>
                )}
              </React.Fragment>
            }
          />
        </div>
      </Base>
    )
  ) : (
    <LoadingScreen text="Verifying your access!" />
  );
};

export default AuthRequired;
