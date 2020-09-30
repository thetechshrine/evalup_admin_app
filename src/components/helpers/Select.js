import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Select } from '@chakra-ui/core';

function AppSelect({ options = [], name, label, onChange, required = false }) {
  function handleChange({ target }) {
    onChange({ name, value: target.value });
  }

  function displayOptions() {
    return options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ));
  }

  const [alreadySentFirstItemValue, setAlreadySentFirstItemValue] = useState(false);
  useEffect(() => {
    if (options.length > 0 && !alreadySentFirstItemValue) {
      onChange({ name, value: options[0].value });
      setAlreadySentFirstItemValue(true);
    }
  }, [options]);

  return (
    <FormControl isRequired={required}>
      <FormLabel color='gray.500'>{label}</FormLabel>
      <Select name={name} onChange={handleChange}>
        {displayOptions()}
      </Select>
    </FormControl>
  );
}

AppSelect.propTypes = {
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

export default AppSelect;
