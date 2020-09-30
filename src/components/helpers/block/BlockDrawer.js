import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  Button
} from '@chakra-ui/core';

import { blockDrawerDefaultPropTypes, childrenPropType } from '../../../utils/default-prop-types';

import Form from '../Form';

function BlockDrawer({ title, shown, onClose, onSubmit, children }) {
  // function handleSave() {
  //   onClose();
  //   onSave();
  // }

  return (
    <Drawer isOpen={shown} placement='right' onClose={onClose} size='md'>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>
            <Form noValidate onSubmit={onSubmit}>
              {children}

              <Flex justifyContent='flex-end' marginY={8}>
                <Button type='button' variant='outline' mr={3} onClick={onClose}>
                  Annuler
                </Button>
                <Button colorScheme='blue' type='submit'>
                  Enregistrer
                </Button>
              </Flex>
            </Form>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

BlockDrawer.propTypes = {
  title: PropTypes.string.isRequired,
  ...blockDrawerDefaultPropTypes,
  children: childrenPropType
};

export default BlockDrawer;
