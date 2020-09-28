import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Heading,
  Divider,
  Text,
  Link
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { validateValueAsRequired } from '../../utils/validation';
import authActions from '../../store/actions/auth';

import AuthPageContainer from '../helpers/AuthPageContainer';
import Form from '../helpers/Form';
import { NotificationContext } from '../providers/Notification';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const notification = useContext(NotificationContext);
  const { handleSubmit, errors, register } = useForm();

  function onSubmit(values) {
    dispatch(
      authActions.login({
        credentials: values,
        history,
        notification
      })
    );
  }

  return (
    <AuthPageContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Heading fontSize='1.5rem' textAlign='center'>
            Connexion
          </Heading>

          <FormControl mt={4} isInvalid={errors.email}>
            <FormLabel htmlFor='email' color='gray.500'>
              Adresse email
            </FormLabel>
            <Input
              type='email'
              name='email'
              variant='filled'
              ref={register({ validate: (value) => validateValueAsRequired(value, 'Adresse email') })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor='password' color='gray.500'>
              Mot de passe
            </FormLabel>
            <Input
              type='password'
              name='password'
              variant='filled'
              ref={register({ validate: (value) => validateValueAsRequired(value, 'Mot de passe') })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <Button mt={4} type='submit' colorScheme='purple'>
            Accéder à mon espace
          </Button>

          <Divider />

          <Text textAlign='center'>
            Vous êtes perdus ?{' '}
            <Link color='purple.300' isExternal href='https://www.google.com?q=i+am+lost'>
              Cliquez ici
            </Link>
          </Text>
        </Stack>
      </Form>
    </AuthPageContainer>
  );
}

export default Login;
