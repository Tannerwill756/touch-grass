import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';

import FormikField from '../components/FormikField';

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
  const handleSubmit = (values: FormValues): void => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        address: values.address,
      }),
    };

    fetch('http://localhost:9090/users/createUser', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
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

              <FormikField
                type='input'
                label='Polygon Wallet Address'
                name='address'
                required
              />
              <p>
                *ATTENTION: Make sure this is your Polygon Wallet Address, this
                is how Touch Grass will be paying out winnings to players.
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
