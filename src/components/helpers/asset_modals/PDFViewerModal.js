import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Fade,
  Modal,
  ModalOverlay,
  SlideFade,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/core';
import styled from 'styled-components';

import PDFView from '../PDFViewer';

function PDFViewerModal({ className, shown, onClose, url }) {
  const cancelRef = useRef();

  return (
    <Fade timeout={300} in={shown}>
      {(styles) => (
        <Modal leastDestructiveRef={cancelRef} onClose={onClose} isOpen={true} isCentered size='full'>
          <ModalOverlay style={styles}>
            <SlideFade timeout={150} in={shown} unmountOnExit={false}>
              {(styles) => (
                <ModalContent style={styles} className={className}>
                  <ModalHeader></ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <PDFView url={url} />
                  </ModalBody>
                </ModalContent>
              )}
            </SlideFade>
          </ModalOverlay>
        </Modal>
      )}
    </Fade>
  );
}

PDFViewerModal.propTypes = {
  className: PropTypes.string,
  shown: PropTypes.bool,
  onClose: PropTypes.func,
  url: PropTypes.string
};

export default styled(PDFViewerModal)`
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0 10rem;
  box-shadow: none;
`;
