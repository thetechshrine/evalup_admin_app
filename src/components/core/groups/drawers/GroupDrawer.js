import React from 'react';
import { FormControl, FormLabel, Input, Stack, Textarea, FormErrorMessage } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { blockDrawerDefaultPropTypes } from '../../../../utils/default-prop-types';
import { validateValueAsRequired } from '../../../../utils/validation';

import BlockDrawer from '../../../helpers/block/BlockDrawer';

function GroupDrawer({ shown, onClose, onSave }) {
  const { handleSubmit, errors, register } = useForm();

  return (
    <BlockDrawer title='Nouvelle classe' shown={shown} onClose={onClose} onSubmit={handleSubmit(onSave)}>
      <Stack>
        <FormControl isRequired isInvalid={errors.code}>
          <FormLabel htmlFor='code' color='gray.500'>
            Code
          </FormLabel>
          <Input
            type='text'
            id='code'
            name='code'
            ref={register({ validate: (value) => validateValueAsRequired(value, 'Code') })}
          />
          <FormErrorMessage>{errors.code && errors.code.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.title}>
          <FormLabel htmlFor='title' color='gray.500'>
            Intitulé
          </FormLabel>
          <Input
            type='text'
            id='title'
            name='title'
            ref={register({ validate: (value) => validateValueAsRequired(value, 'Intitulé') })}
          />
          <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='description' color='gray.500'>
            Description
          </FormLabel>
          <Textarea type='text' id='description' name='description' ref={register({ validate: () => true })} />
        </FormControl>
      </Stack>
    </BlockDrawer>
  );
}

GroupDrawer.propTypes = blockDrawerDefaultPropTypes;

export default GroupDrawer;
