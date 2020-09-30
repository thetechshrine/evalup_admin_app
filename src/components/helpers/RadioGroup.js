import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Radio, Stack, RadioGroup } from '@chakra-ui/core';

function AppRadioGroup({ options, name, label, onChange, required = false }) {
  const [value, setValue] = useState('');

  function handleChange(selectedValue) {
    setValue(selectedValue);
    onChange({ name, value: selectedValue });
  }

  function displayOptions() {
    return (
      <Stack direction='row'>
        {options.map((option, index) => (
          <Radio name={name} key={index} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Stack>
    );
  }

  return (
    <FormControl isRequired={required} isInvalid={value === ''}>
      <FormLabel color='gray.500'>{label}</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        {displayOptions()}
      </RadioGroup>
    </FormControl>
  );
}

AppRadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default AppRadioGroup;
