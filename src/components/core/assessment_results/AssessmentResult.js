import React from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar, Stack, Flex, Text, Badge, Tooltip, Button, SimpleGrid, Divider, Heading } from '@chakra-ui/core';
import { ViewIcon } from '@chakra-ui/icons';
import { IoMdMale, IoMdFemale } from 'react-icons/io';

import assessmentResultEnums from '../../../utils/enums/assessment-result';
import { assessmentResultPropType } from '../../../utils/default-prop-types';
import entitiesUtils from '../../../utils/entities-utils';

function getStudentGenderIcon(student) {
  if (student.gender === 'MALE') return IoMdMale;

  return IoMdFemale;
}

function getStatusBadgeColorScheme(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if (assessmentResult.status === statuses.CREATED) return 'gray';
  if (assessmentResult.status === statuses.NOTED) return 'cyan';

  return 'green';
}

function getStatusBadgeLabel(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if (assessmentResult.status === statuses.CREATED) return 'En attente de correction';
  if (assessmentResult.status === statuses.NOTED) return 'En attente de publication';

  return 'Publié';
}

function getNumberValue2PaddedFromStartWithZero(numberValue) {
  return String(numberValue).padStart(2, '0');
}

function getObtainedNoteLabel(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if (assessmentResult.status === statuses.CREATED) return '--';

  return getNumberValue2PaddedFromStartWithZero(assessmentResult.obtainedNote);
}

function getObtainedCreditsLabel(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if (assessmentResult.status === statuses.CREATED) return '--';

  return getNumberValue2PaddedFromStartWithZero(assessmentResult.obtainedCredits);
}

function AssessmentResult({ assessmentResult, onOpenReport }) {
  function handleOpenReport() {
    onOpenReport({ url: entitiesUtils.getPrimaryAssetUrl(assessmentResult) });
  }

  return (
    <Box>
      <Stack alignItems='center' position='relative' borderWidth={1} marginTop='64px' borderRadius='lg'>
        <Flex position='absolute' left='0' top='-64px' width='100%' justifyContent='center'>
          <Avatar size='2xl' name={entitiesUtils.getFullName(assessmentResult.student)} />
        </Flex>
        <Stack padding={5} paddingTop='64px' textAlign='center'>
          <Text fontSize='2xl'>
            {entitiesUtils.getFullName(assessmentResult.student)}
            <Badge ml='2' padding={1} rounded='lg'>
              <Box as={getStudentGenderIcon(assessmentResult.student)} size={16} />
            </Badge>
          </Text>
          <Stack direction='row' justifyContent='center' fontSize='1rem'>
            <Text color='gray.500'>Ajouté le</Text>
            <Text fontWeight='medium'>{new Date(assessmentResult.createdAt).toLocaleDateString()}</Text>
            <Text color='gray.500'>à</Text>
            <Text fontWeight='medium'>{new Date(assessmentResult.createdAt).toLocaleTimeString()}</Text>
          </Stack>
          <Stack direction='row' justifyContent='center' fontSize='1rem'>
            <Text color='gray.500'>Dernière mise à jour le</Text>
            <Text fontWeight='medium'>{new Date(assessmentResult.updatedAt).toLocaleDateString()}</Text>
            <Text color='gray.500'>à</Text>
            <Text fontWeight='medium'>{new Date(assessmentResult.updatedAt).toLocaleTimeString()}</Text>
          </Stack>
          <Box pt={2}>
            <Badge fontSize='md' colorScheme={getStatusBadgeColorScheme(assessmentResult)}>
              {getStatusBadgeLabel(assessmentResult)}
            </Badge>
          </Box>
        </Stack>

        <Divider />

        <SimpleGrid width='100%' columns={2}>
          <Stack padding={3} spacing={1} alignItems='center'>
            <Heading fontSize='1.3rem'>{getObtainedNoteLabel(assessmentResult)} / 20</Heading>
            <Text color='gray.500'>Note</Text>
          </Stack>
          <Stack padding={3} spacing={1} alignItems='center'>
            <Heading fontSize='1.3rem'>
              {getObtainedCreditsLabel(assessmentResult)} /{' '}
              {getNumberValue2PaddedFromStartWithZero(assessmentResult.assessment.course.credits)}
            </Heading>
            <Text color='gray.500'>Crédits</Text>
          </Stack>
        </SimpleGrid>

        {assessmentResult.comments && (
          <>
            <Divider />
            <Stack p={3}>
              <Text fontWeight='medium' color='gray.500' fontSize='1.05rem'>
                Commentaires
              </Text>
              <Text>{assessmentResult.comments}</Text>
            </Stack>
          </>
        )}

        <Stack
          w='100%'
          direction='row'
          paddingTop={6}
          paddingBottom={3}
          paddingLeft={3}
          paddingRight={3}
          justifyContent='flex-end'
        >
          <Tooltip
            label='Attention! Si vous avez un gestionnaire de téléchargement actif, cette action téléchargera le fichier'
            aria-label='A tooltip'
          >
            <Button variant='outline' leftIcon={<ViewIcon />} onClick={handleOpenReport}>
              Voir le rapport
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
}

AssessmentResult.propTypes = {
  assessmentResult: assessmentResultPropType,
  onOpenReport: PropTypes.func.isRequired
};

export default AssessmentResult;
