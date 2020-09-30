import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Input } from '@chakra-ui/core';
import { v1 as uuid } from 'uuid';

import loadScript from '../../utils/load-script';

function handleScriptLoad(autoCompleteRef, onPlaceChange) {
  const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
    componentRestrictions: { country: 'fr' }
  });
  autocomplete.setFields(['address_components', 'formatted_address']);
  autocomplete.addListener('place_changed', () => {
    onPlaceChange(autocomplete.getPlace());
  });
}

function extractAddressObject(place) {
  const address = {};
  const addressComponents = place.address_components || [];
  const componentsDescriptor = {
    street_number: {
      addressComponentField: 'long_name',
      addressField: 'streetNumber',
      parseMethod: (value) => Number(value)
    },
    route: {
      addressComponentField: 'long_name',
      addressField: 'streetName',
      parseMethod: (value) => value
    },
    locality: {
      addressComponentField: 'long_name',
      addressField: 'city',
      parseMethod: (value) => value
    },
    country: {
      addressComponentField: 'long_name',
      addressField: 'country',
      parseMethod: (value) => value
    },
    postal_code: {
      addressComponentField: 'long_name',
      addressField: 'zipCode',
      parseMethod: (value) => value
    }
  };

  addressComponents.forEach((addressComponent) => {
    for (const property in componentsDescriptor) {
      if (addressComponent.types.includes(property)) {
        const addressField = componentsDescriptor[property].addressField;
        const addressComponentField = componentsDescriptor[property].addressComponentField;
        const parseMethod = componentsDescriptor[property].parseMethod;

        address[addressField] = parseMethod(addressComponent[addressComponentField]);
        break;
      }
    }
  });

  return address;
}

const autocompleteId = uuid();

function AddressAutocomplete({ required = false, label = 'Adresse', onAddressChange }) {
  const autocompleteRef = useRef();

  function handlePlaceChange(place) {
    const extractedAddress = extractAddressObject(place);
    onAddressChange(extractedAddress);
  }

  useEffect(() => {
    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        () => handleScriptLoad(autocompleteRef, handlePlaceChange)
      );
    } else {
      handleScriptLoad(autocompleteRef, handlePlaceChange);
    }
  }, []);

  return (
    <FormControl isRequired={required}>
      <FormLabel htmlFor={autocompleteId} color='gray.500'>
        {label}
      </FormLabel>
      <Input id={autocompleteId} ref={autocompleteRef} placeholder='' />
    </FormControl>
  );
}

AddressAutocomplete.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  onAddressChange: PropTypes.func.isRequired
};

export default AddressAutocomplete;
