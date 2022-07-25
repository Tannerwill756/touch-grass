import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/index';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import useAuth from '../hooks/useAuth';

import FormikField from '../components/FormikField';

export interface ILoginPageProps {}

interface FormValues {
  username: string;
  address: string;
  password: string;
  passwordConfirm: string;
}

interface LoginReturnObject{
  status: string,
  user: string
}

const initialValues: FormValues = {
  username: '',
  address: '',
  password: '',
  passwordConfirm: '',
};

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required(),
});

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const {setAuth} = useAuth();
  const [errMessage, setErrMessage] = useState<string>('')
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (values: FormValues) => {
    const userObj = {
      username: values.username,
      password: values.password,
    };
    
    axios.post('/auth/login', userObj, {
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true
    })
    .then(res => {
      setErrMessage('');
      setLoginSuccess(true);
      console.log(res);
      const access_token = res.data.access_token;
      const username = values.username;
      const password = values.password;
      setAuth({ username, password, access_token});
      navigate(`/dashboard`);

    })
    .catch(err => console.log(err))

  };

  return (
    <div className='Login' style={{width: "50%", margin: "0 auto"}}>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <FormikField
                type='input'
                label='Username'
                name='username'
                required
              />

              <FormikField
                type='password'
                label='Password'
                name='password'
                required
              />
              <p style={{color: "red"}}>{errMessage}</p>
              {loginSuccess && <p style={{color: "green"}}>Login Success</p>}
              <Button
                variant='contained'
                color='primary'
                disabled={!dirty || !isValid}
                type='submit'
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
