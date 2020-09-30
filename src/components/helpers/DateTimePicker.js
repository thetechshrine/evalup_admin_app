import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Box } from '@chakra-ui/core';
import ReactDateTimePicker from 'react-datetime-picker';

function DateTimePicker({ required = false, defaultValue = new Date(), name, label, onChange }) {
  const [value, setValue] = useState(null);

  function handleChange(date) {
    setValue(date);
    onChange({ name, value: date });
  }

  return (
    <FormControl isRequired={required} isInvalid={value === null}>
      <FormLabel htmlFor='title' color='gray.500'>
        {label}
      </FormLabel>
      <Box
        py={2}
        px={4}
        rounded='md'
        borderWidth='1px'
        _hover={{ borderColor: '#cbd5e0' }}
        _focus={{
          zIndex: '1',
          boxShadow: '0 0 0 1px #3182ce',
          borderColor: '#3182ce'
        }}
      >
        <ReactDateTimePicker
          value={value || defaultValue}
          onChange={handleChange}
          locale='fr-Fr'
          clearIcon={null}
          calendarIcon={null}
          calendarClassName='date-time-picker-calendar'
        />
      </Box>
    </FormControl>
  );
}

DateTimePicker.propTypes = {
  required: PropTypes.bool,
  defaultValue: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DateTimePicker;
