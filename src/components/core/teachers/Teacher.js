import React from 'react';
import { Box, Avatar, Stack, Flex, Text, Badge, Divider } from '@chakra-ui/core';
import { MdEmail } from 'react-icons/md';
import { IoMdMale, IoMdFemale } from 'react-icons/io';

import { teacherPropType } from '../../../utils/default-prop-types';

function getFullName(teacher) {
  return `${teacher.firstName} ${teacher.lastName}`;
}

function getGenderIcon(teacher) {
  if (teacher.gender === 'MALE') return IoMdMale;

  return IoMdFemale;
}

function getTypeBadgeLabel(teacher) {
  if (teacher.type === 'INTERN') return 'Interne';

  return 'Externe';
}

function getTypeBadgeColor(teacher) {
  if (teacher.type === 'INTERN') return 'purple';

  return 'gray';
}

function Teacher({ teacher }) {
  return (
    <Box>
      <Stack alignItems='center' position='relative' maxW='sm' borderWidth={1} marginTop='64px' borderRadius='lg'>
        <Flex position='absolute' left='0' top='-64px' width='100%' justifyContent='center'>
          <Avatar size='2xl' name={getFullName(teacher)} />
        </Flex>
        <Stack padding={5} paddingTop='64px' textAlign='center'>
          <Text fontSize='2xl'>
            {getFullName(teacher)}
            <Badge ml='2' padding={1} rounded='lg'>
              <Box as={getGenderIcon(teacher)} size={16} />
            </Badge>
          </Text>
          <Text>
            <Badge colorScheme={getTypeBadgeColor(teacher)} fontSize='md'>
              {getTypeBadgeLabel(teacher)}
            </Badge>
          </Text>
        </Stack>

        <Divider />

        <Stack padding={5} spacing={3}>
          <Stack direction='row'>
            <Box as={MdEmail} size={24} color='gray.400' />
            <Text>{teacher.account.email}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

Teacher.propTypes = {
  teacher: teacherPropType
};

export default Teacher;
