import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Heading, Text, Divider, SimpleGrid } from '@chakra-ui/core';
import { ImBook } from 'react-icons/im';

import getRandomThemeColor from '../../../utils/get-random-theme-color';
import { coursePropType } from '../../../utils/default-prop-types';

function CourseNumberBox({ value, label }) {
  return (
    <Stack spacing={0} padding={4} textAlign='center'>
      <Text fontSize='1.4rem' fontWeight='700'>
        {value}
      </Text>
      <Text color='gray.500'>{label}</Text>
    </Stack>
  );
}

CourseNumberBox.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string
};

function Course({ course }) {
  return (
    <Box maxW='sm' borderWidth={1} borderRadius='lg' overflow='hidden'>
      <Stack alignItems='center' spacing={4} padding={6}>
        <Box as={ImBook} size={72} color={getRandomThemeColor()} />
        <Stack alignItems='center' textAlign='center'>
          <Heading size='lg'>{course.code}</Heading>
          <Text fontSize='xl'>{course.title}</Text>
        </Stack>
      </Stack>

      <Divider />

      <SimpleGrid columns={2} position='relative'>
        <CourseNumberBox value={course.credits} label='Crédits' />
        <Divider orientation='vertical' position='absolute' left='50%' top='0' bottom='0' />
        <CourseNumberBox value={course.successNote} label='Note de passage' />
      </SimpleGrid>
    </Box>
  );
}

Course.propTypes = {
  course: coursePropType
};

export default Course;
