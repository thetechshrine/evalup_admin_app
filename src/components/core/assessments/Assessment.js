import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Badge,
  Avatar,
  SimpleGrid,
  Button,
  Icon,
  Tooltip
} from '@chakra-ui/core';
import { ViewIcon } from '@chakra-ui/icons';
import { RiFileList2Fill, RiFileList3Fill } from 'react-icons/ri';

import { assessmentPropType } from '../../../utils/default-prop-types';
import assessmentEnums from '../../../utils/enums/assessment';
import assetEnums from '../../../utils/enums/asset';
import entitiesUtils from '../../../utils/entities-utils';

const assessmentStates = Object.freeze({
  PENDIND: 'PENDING',
  RUNNING: 'RUNNING',
  ENDED: 'ENDED'
});

function getAssessemntState(assessment) {
  const now = Date.now();
  const startDate = new Date(assessment.startDate).getTime();
  const endDate = new Date(assessment.endDate).getTime();

  if (now < startDate) return assessmentStates.PENDIND;
  if (now > endDate) return assessmentStates.ENDED;

  return assessmentStates.RUNNING;
}

function getIconColor(assessment) {
  const assessmentState = getAssessemntState(assessment);
  if (assessmentState === assessmentStates.RUNNING) return '#38A169';
  if (assessmentState === assessmentStates.PENDIND) return '#A0AEC0';

  return '#065666';
}

function getStateBadgeColorScheme(assessment) {
  const assessmentState = getAssessemntState(assessment);
  if (assessmentState === assessmentStates.RUNNING) return 'green';
  if (assessmentState === assessmentStates.PENDIND) return 'gray';

  return 'cyan';
}

function getStateBadgeLabel(assessment) {
  const assessmentState = getAssessemntState(assessment);
  if (assessmentState === assessmentStates.RUNNING) return 'En cours';
  if (assessmentState === assessmentStates.PENDIND) return 'En attente';

  return 'Terminée';
}

function getTypeBadgeColorScheme(assessment) {
  if (assessment.type === assessmentEnums.types.MAIN) return 'purple';

  return 'gray';
}

function getTypeBadgeLabel(assessment) {
  if (assessment.type === assessmentEnums.types.MAIN) return 'Examen';

  return 'Rattrapage';
}

function Assessment({ assessment, onOpenSubject, onOpenResults }) {
  function handleOpenSubject() {
    onOpenSubject({ url: entitiesUtils.getPrimaryAssetUrl(assessment) });
  }

  function handleOpenResults() {
    onOpenResults({ assessmentId: assessment.id });
  }

  return (
    <Stack spacing={0} direction='row' borderWidth={1} borderRadius='lg' overflow='hidden'>
      <Flex justifyContent='center' alignItems='center' padding={6}>
        <Box as={RiFileList2Fill} size={72} color={getIconColor(assessment)} />
      </Flex>
      <Box>
        <Divider orientation='vertical' />
      </Box>
      <Stack flex={1} spacing={0}>
        <Flex justifyContent='space-between' padding={3}>
          <Stack spacing={1}>
            <Heading fontSize='1.75rem'>{assessment.group.code}</Heading>
            <Text fontSize='xl'>{assessment.title}</Text>
            <Stack direction='row' fontSize='1rem'>
              <Text color='gray.500'>Ajoutée le</Text>
              <Text fontWeight='medium'>{new Date(assessment.createdAt).toLocaleDateString()}</Text>
              <Text color='gray.500'>à</Text>
              <Text fontWeight='medium'>{new Date(assessment.createdAt).toLocaleTimeString()}</Text>
            </Stack>
            <Stack direction='row' alignItems='center' paddingTop={4}>
              <Avatar size='sm' name={entitiesUtils.getFullName(assessment.teacher)} />
              <Stack spacing={0}>
                <Text fontWeight='medium'>{entitiesUtils.getFullName(assessment.teacher)}</Text>
                <Text>{assessment.teacher.account.email}</Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Badge fontSize='sm' colorScheme={getTypeBadgeColorScheme(assessment)}>
              {getTypeBadgeLabel(assessment)}
            </Badge>
            <Badge fontSize='sm' colorScheme={getStateBadgeColorScheme(assessment)}>
              {getStateBadgeLabel(assessment)}
            </Badge>
          </Stack>
        </Flex>

        <Divider />

        <SimpleGrid columns={2}>
          <Stack padding={3} spacing={1}>
            <Heading fontSize='1.3rem'>{new Date(assessment.startDate).toLocaleString()}</Heading>
            <Text color='gray.500'>Date de début</Text>
          </Stack>
          <Stack padding={3} spacing={1}>
            <Heading fontSize='1.3rem'>{new Date(assessment.endDate).toLocaleString()}</Heading>
            <Text color='gray.500'>Date de fin</Text>
          </Stack>
        </SimpleGrid>

        <Stack
          direction='row'
          paddingTop={2}
          paddingBottom={3}
          paddingLeft={3}
          paddingRight={3}
          justifyContent='flex-end'
        >
          <Tooltip
            label='Attention! Si vous avez un gestionnaire de téléchargement actif, cette action téléchargera le fichier'
            aria-label='A tooltip'
          >
            <Button leftIcon={<ViewIcon />} onClick={handleOpenSubject}>
              Voir le sujet
            </Button>
          </Tooltip>

          <Button
            leftIcon={<Icon as={RiFileList3Fill} />}
            colorScheme='purple'
            variant='outline'
            onClick={handleOpenResults}
          >
            Voir les rendus
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

Assessment.propTypes = {
  assessment: assessmentPropType,
  onOpenSubject: PropTypes.func.isRequired,
  onOpenResults: PropTypes.func.isRequired
};

export default Assessment;
