import React from 'react';
import { Stack, FormControl, FormLabel, Input, Button, Heading, Text } from '@chakra-ui/core';

import AuthPageContainer from '../helpers/AuthPageContainer';
import Form from '../helpers/Form';

function AccountValidation() {
  return (
    <AuthPageContainer>
      <Form onSubmit={() => {}}>
        <Stack spacing={4}>
          <Heading fontSize='1.5rem' textAlign='center'>
            Confirmation du compte
          </Heading>
          <Text textAlign='center'>
            Votre compte a été créé. Definissez maintenant votre mot de passe pour avoir accès à votre espace
          </Text>
          <FormControl mt={4} isDisabled>
            <FormLabel htmlFor='email' color='gray.500'>
              Adresse email
            </FormLabel>
            <Input type='email' name='email' variant='filled' defaultValue='student@email.com' />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password' color='gray.500'>
              Mot de passe
            </FormLabel>
            <Input type='password' name='password' variant='filled' placeholder='' />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password' color='gray.500'>
              Confirmer le mot de passe
            </FormLabel>
            <Input type='password' name='password' variant='filled' placeholder='' />
          </FormControl>
          <Button mt={4} colorScheme='purple' type='submit'>
            Enregistrer
          </Button>
        </Stack>
      </Form>
    </AuthPageContainer>
  );
}

export default AccountValidation;
