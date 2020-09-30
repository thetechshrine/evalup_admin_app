import React from 'react';
import { Stack } from '@chakra-ui/core';

import { childrenPropType } from '../../utils/default-prop-types';

import BlockHeader from './block/BlockHeader';
import BlockMain from './block/BlockMain';

function Block({ children }) {
  return <Stack spacing={8}>{children}</Stack>;
}

Block.propTypes = {
  children: childrenPropType
};

Block.Main = BlockMain;
Block.Header = BlockHeader;

export default Block;
