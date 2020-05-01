import React from "react";
import Result from 'antd/lib/result';
import Button from "antd/lib/button";
import Router from "next/router";

import LoadingScreen from './loadingScreen';
import Base from "./base";

const AdminRequired = ({ children, loaded, isAdmin }) => {
    return loaded ?
        isAdmin ?
            <React.Fragment>
                {children}
            </React.Fragment>
            : (
            <Base title="Access Denied">
                <div
                    className="h-100 justify-content-center d-flex align-items-center"
                    style={{ minHeight: '100vh' }}
                >
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={
                            <Button type="primary" onClick={() => Router.push('/')}>
                                Back Home
                            </Button>
                        }
                    />
                </div>
            </Base>
        )
    : (<LoadingScreen text="Verifying your access!"  />)

};

export default AdminRequired
