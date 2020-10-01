import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Box, Heading, SimpleGrid, Text } from '@chakra-ui/core';

import getRandomThemeColor from '../../utils/get-random-theme-color';

import Icons from '../layout/sidebar_menu/Icons';

function generateHomeBlocks() {
  return [
    {
      title: 'Classes',
      description: "Gestion des classes; enregistrer les différents groupes d'étudiants de votre établissement",
      icon: Icons.GROUPS,
      color: getRandomThemeColor()
    },
    {
      title: 'Cours',
      description: "Gestion des cours; enregistrer les différents groupes d'étudiants de votre établissement",
      icon: Icons.COURSES,
      color: getRandomThemeColor()
    },
    {
      title: 'Etudiants',
      description: 'Gestion des comptes étudiants; enregistrer les étudiants pouvant avoir accès à la plateforme',
      icon: Icons.STUDENTS,
      color: getRandomThemeColor()
    },
    {
      title: 'Enseignants',
      description: 'Gestion des comptes enseigants; enregistrer les enseignants pouvant avoir accès à la plateforme',
      icon: Icons.TEACHERS,
      color: getRandomThemeColor()
    },
    {
      title: 'Evaluations',
      description:
        'Gestion des évaluations; planifier les évaluations pour chaque classe, consulter les rendus des étudiants ainsi que les notes attribuées par les enseigants',
      icon: Icons.ASSESSMENTS,
      color: getRandomThemeColor()
    }
  ];
}

function HomeBlock({ homeBlock }) {
  return (
    <Stack padding={6} alignItems='center' textAlign='center' borderWidth={1} borderRadius='lg' overflow='hidden'>
      <Box as={homeBlock.icon} size={72} color={homeBlock.color} />
      <Heading size='md' color={homeBlock.color}>
        {homeBlock.title}
      </Heading>
      <Text>{homeBlock.description}</Text>
    </Stack>
  );
}

HomeBlock.propTypes = {
  homeBlock: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.any,
    color: PropTypes.string
  })
};

function Home() {
  function displayHomeBlocks() {
    const homeBlocks = generateHomeBlocks();

    return homeBlocks.map((homeBlock, index) => <HomeBlock key={index} homeBlock={homeBlock} />);
  }

  return (
    <Stack>
      <Heading>Accueil</Heading>

      <SimpleGrid columns={4} spacing={10} pt={5}>
        {displayHomeBlocks()}
      </SimpleGrid>
    </Stack>
  );
}

export default Home;
