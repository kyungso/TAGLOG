import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

const RegisterPage = () => {
    return (
      <>
        <HeaderContainer />
        <AuthTemplate>
            <RegisterForm />
        </AuthTemplate>
      </>
    );
};

export default RegisterPage;