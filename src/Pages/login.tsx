import React from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';

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
  const handleSubmit = (values: FormValues) => {
    console.log('top of handle submit')
    const userObj = {
      username: values.username,
      password: values.password,
    };
    
    console.log('before login call')
    axios.post('http://localhost:9090/auth/login', userObj)
    .then(res => {console.log('INSIDE login call')})

  };

  return (
    <div className='Login'>
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
