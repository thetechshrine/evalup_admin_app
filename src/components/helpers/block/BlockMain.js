import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Flex, Text } from '@chakra-ui/core';
import { GoInbox } from 'react-icons/go';

import { childrenPropType } from '../../../utils/default-prop-types';

function BlockMain({ loading, dataLength = 0, emptyDataMessage, children }) {
  return (
    <Box>
      {loading && <Skeleton height={100} />}
      {dataLength === 0 && !loading && (
        <Flex flexDirection='column' color='gray.400'>
          <Box as={GoInbox} size={48} alignSelf='center' />
          <Text fontSize='xl' textAlign='center'>
            {emptyDataMessage}
          </Text>
        </Flex>
      )}
      {children}
    </Box>
  );
}

BlockMain.propTypes = {
  loading: PropTypes.bool,
  dataLength: PropTypes.number,
  emptyDataMessage: PropTypes.string,
  children: childrenPropType
};

export default BlockMain;
