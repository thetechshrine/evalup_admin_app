import React from 'react';
import { Box, Stack, Heading, Text } from '@chakra-ui/core';
import { HiUserGroup } from 'react-icons/hi';

import getRandomThemeColor from '../../../utils/get-random-theme-color';
import { groupPropType } from '../../../utils/default-prop-types';

function Group({ group }) {
  return (
    <Box maxW='sm' borderWidth={1} borderRadius='lg' overflow='hidden' padding={6}>
      <Stack alignItems='center' spacing={4}>
        <Box as={HiUserGroup} size={72} color={getRandomThemeColor()} />
        <Stack alignItems='center' textAlign='center'>
          <Heading size='lg'>{group.code}</Heading>
          <Text fontSize='xl'>{group.title}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}

Group.propTypes = {
  group: groupPropType
};

export default Group;
