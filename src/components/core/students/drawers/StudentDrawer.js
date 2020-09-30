import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/core';

import { blockDrawerDefaultPropTypes } from '../../../../utils/default-prop-types';
import countriesUtils from '../../../../utils/countries-utils';
import genderOptions from '../../../../utils/select_options/gender-options';

import BlockDrawer from '../../../helpers/block/BlockDrawer';
import RadioGroup from '../../../helpers/RadioGroup';
import DatePicker from '../../../helpers/DatePicker';
import Select from '../../../helpers/Select';
import AddressAutocomplete from '../../../helpers/AddressAutocomplete';
import SelectGroup from '../../groups/SelectGroup';

function initBirthDatePickerValue() {
  const date = new Date();
  date.setFullYear(1990);

  return date;
}

function StudentDrawer({ shown, onClose, onSave, onChange }) {
  function handleAddressChange(address = {}) {
    Object.keys(address).forEach((addressKey) => {
      onChange({ name: addressKey, value: address[addressKey] });
    });
  }

  return (
    <BlockDrawer title='Nouvel étudiant' shown={shown} onClose={onClose} onSubmit={onSave}>
      <Stack>
        <SelectGroup onChange={onChange} />

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

        <DatePicker
          required
          name='birthDate'
          defaultValue={initBirthDatePickerValue()}
          label='Date de naissance'
          onChange={onChange}
        />

        <Select
          required
          options={countriesUtils.getCountriesOptions()}
          name='nationality'
          label='Nationalité'
          onChange={onChange}
        />

        <AddressAutocomplete required={true} onAddressChange={handleAddressChange} />

        <FormControl isRequired>
          <FormLabel htmlFor='title' color='gray.500'>
            Adresse email
          </FormLabel>
          <Input type='email' id='email' name='email' onChange={(evt) => onChange(evt.target)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='title' color='gray.500'>
            Téléphone
          </FormLabel>
          <Input type='phone' id='phone' name='phone' onChange={(evt) => onChange(evt.target)} />
        </FormControl>
      </Stack>
    </BlockDrawer>
  );
}

StudentDrawer.propTypes = {
  ...blockDrawerDefaultPropTypes,
  onChange: PropTypes.func.isRequired
};

export default StudentDrawer;
