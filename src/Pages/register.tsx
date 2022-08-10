import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';

import FormikField from '../components/FormikField';
import axios from '../api/index';

export interface IRegisterPageProps {}

interface FormValues {
  username: string;
  address: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: FormValues = {
  username: '',
  address: '',
  password: '',
  passwordConfirm: '',
};

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  address: Yup.string().required(),
  password: Yup.string().required(),
  passwordConfirm: Yup.string()
    .required('password is a required field')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
});

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  const [validUsername, setValidUsername] = useState<boolean>(true);
  const handleSubmit = (values: FormValues): void => {
    const userObj = {
      username: values.username,
      password: values.password,
      address: values.address,
    };
    

    axios.post('/auth/register', userObj)
    .then((res) => {
      if(res.status === 201){
        setValidUsername(true);
        console.log("success");
      }})
    .catch(err => err.response.status === 404 && setValidUsername(false))
  };

  return (
    <div className='Register'>
      <h1>Register</h1>
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
              {!validUsername && <p>Username already taken.</p>}
              <FormikField
                type='input'
                label='PayPal Email Address'
                name='address'
                required
              />
              <p>
                *ATTENTION: Make sure this is your email attached to your paypal account otherwise you won't reciever your money.
              </p>

              <FormikField
                type='password'
                label='Password'
                name='password'
                required
              />

              <FormikField
                type='password'
                label='Confirm Passowrd'
                name='passwordConfirm'
                required
              />

              <Button
                variant='contained'
                color='primary'
                disabled={!dirty || !isValid}
                type='submit'
              >
                Register
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterPage;
