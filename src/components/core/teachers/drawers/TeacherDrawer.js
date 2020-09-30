import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/core';

import { blockDrawerDefaultPropTypes } from '../../../../utils/default-prop-types';
import genderOptions from '../../../../utils/select_options/gender-options';

import BlockDrawer from '../../../helpers/block/BlockDrawer';
import RadioGroup from '../../../helpers/RadioGroup';
import Select from '../../../helpers/Select';

function TeacherDrawer({ shown, onClose, onSave, onChange }) {
  return (
    <BlockDrawer title='Nouvel enseignant' shown={shown} onClose={onClose} onSubmit={onSave}>
      <Stack>
        <Select
          required
          options={[
            { label: 'Interne', value: 'INTERN' },
            { label: 'Externe', value: 'EXTERN' }
          ]}
          name='type'
          label='Type'
          onChange={onChange}
        />

        <RadioGroup required options={genderOptions} name='gender' label='Sexe' onChange={onChange} />

        <FormControl isRequired>
          <FormLabel htmlFor='title' color='gray.500'>
            Nom
          </FormLabel>
          <Input type='text' id='lastName' name='lastName' onChange={(evt) => onChange(evt.target)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='title' color='gray.500'>
            Prénom
          </FormLabel>
          <Input type='text' id='firstName' name='firstName' onChange={(evt) => onChange(evt.target)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='title' color='gray.500'>
            Adresse email
          </FormLabel>
          <Input type='email' id='email' name='email' onChange={(evt) => onChange(evt.target)} />
        </FormControl>
      </Stack>
    </BlockDrawer>
  );
}

TeacherDrawer.propTypes = {
  ...blockDrawerDefaultPropTypes,
  onChange: PropTypes.func.isRequired
};

export default TeacherDrawer;
