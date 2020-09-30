import React from 'react';
import { Box, Avatar, Stack, Flex, Divider, Heading, Text, Badge } from '@chakra-ui/core';
import { MdLocationOn, MdEmail, MdPhone, MdLanguage } from 'react-icons/md';
import { IoMdMale, IoMdFemale } from 'react-icons/io';

import { studentPropType } from '../../../utils/default-prop-types';
import countriesUtils from '../../../utils/countries-utils';

function getStudentGenderIcon(student) {
  if (student.gender === 'MALE') return IoMdMale;

  return IoMdFemale;
}

function getFullName(student) {
  return `${student.firstName} ${student.lastName}`;
}

function getFormattedAddress(student) {
  const { streetNumber, streetName, city, zipCode } = student.address;

  return `${streetNumber} ${streetName}, ${zipCode} ${city}`;
}

function getFormattedPhone(student) {
  return `+33 ${student.phone}`;
}

function Student({ student }) {
  return (
    <Box>
      <Stack alignItems='center' position='relative' maxW='sm' borderWidth={1} marginTop='64px' borderRadius='lg'>
        <Flex position='absolute' left='0' top='-64px' width='100%' justifyContent='center'>
          <Avatar size='2xl' name={getFullName(student)} />
        </Flex>
        <Stack padding={5} paddingTop='64px' textAlign='center'>
          <Text fontSize='2xl'>
            {getFullName(student)}
            <Badge ml='2' padding={1} rounded='lg'>
              <Box as={getStudentGenderIcon(student)} size={16} />
            </Badge>
          </Text>
          <Heading as='h2' size='lg'>
            {student.group.code}
          </Heading>
        </Stack>

        <Divider />

        <Stack padding={5} spacing={3}>
          <Stack direction='row'>
            <Box as={MdLocationOn} size={24} color='gray.400' />
            <Text>{getFormattedAddress(student)}</Text>
          </Stack>
          <Stack direction='row'>
            <Box as={MdEmail} size={24} color='gray.400' />
            <Text>{student.account.email}</Text>
          </Stack>
          <Stack direction='row'>
            <Box as={MdPhone} size={24} color='gray.400' />
            <Text>{getFormattedPhone(student)}</Text>
          </Stack>
          <Stack direction='row'>
            <Box as={MdLanguage} size={24} color='gray.400' />
            <Text>{countriesUtils.getCountryName(student.nationality)}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

Student.propTypes = {
  student: studentPropType
};

export default Student;
