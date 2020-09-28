import React from 'react';
import PropTypes from 'prop-types';
import {
  Fade,
  ScaleFade,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  Button
} from '@chakra-ui/core';

function Dialog({ shown = false, onClose, onSuccess, title, message }) {
  const cancelButtonRef = React.useRef();

  function handleSuccess() {
    onClose();
    onSuccess();
  }

  return (
    <Fade timeout={300} in={shown}>
      {(styles) => (
        <AlertDialog leastDestructiveRef={cancelButtonRef} onClose={onClose} isOpen={true}>
          <AlertDialogOverlay style={styles}>
            <ScaleFade timeout={150} in={shown} unmountOnExit={false}>
              {(styles) => (
                <AlertDialogContent {...styles}>
                  <AlertDialogHeader>{title}</AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>{message}</AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelButtonRef} onClick={onClose}>
                      Annuler
                    </Button>
                    <Button colorScheme='blue' ml={3} onClick={handleSuccess}>
                      Confirmer
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </ScaleFade>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Fade>
  );
}

Dialog.propTypes = {
  shown: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string
};

export default Dialog;
