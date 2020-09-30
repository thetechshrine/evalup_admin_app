import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/core';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { validate as validateUUID, v1 as uuid } from 'uuid';

function AppBreadcrumb() {
  const history = useHistory();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  const updateBreadcrumbItems = useCallback(function (pathname) {
    function parsePathnameParts(pathnameParts = []) {
      if (pathnameParts.length === 2 && pathnameParts.includes('home')) return [''];

      return pathnameParts;
    }

    function getBreadcrumbItemHref(pathname, index) {
      if (index === 0) return '/home';

      return pathname
        .split('/')
        .slice(0, index + 1)
        .join('/');
    }

    function getBreadcrumbItemActive(pathname, index) {
      const pathnameParts = parsePathnameParts(pathname.split('/'));

      return pathnameParts.length - 1 === index;
    }

    function getBreadcrumbItemLabel(pathnamePart) {
      if (validateUUID(pathnamePart)) return 'Détails';
      if (pathnamePart === '') return 'Accueil';

      const pathnamePartsTranslations = {
        groups: 'Classes',
        courses: 'Cours',
        students: 'Etudiants',
        teachers: 'Enseignants',
        assessments: 'Evaluations',
        new: 'Création',
        'assessment-results': 'Rendus'
      };
      if (pathnamePartsTranslations[pathnamePart]) return pathnamePartsTranslations[pathnamePart];

      return pathnamePart;
    }

    function getBreadcrumbItem(pathname, pathnamePart, index) {
      const href = getBreadcrumbItemHref(pathname, index);
      const active = getBreadcrumbItemActive(pathname, index);
      const label = getBreadcrumbItemLabel(pathnamePart);

      return { href, active, label, key: uuid() };
    }

    const pathnameParts = parsePathnameParts(pathname.split('/'));
    const updatedBreadcrumbItems = pathnameParts.map((pathnamePart, index) => {
      return getBreadcrumbItem(pathname, pathnamePart, index);
    });
    setBreadcrumbItems(updatedBreadcrumbItems);
  }, []);

  useEffect(() => {
    const { pathname } = history.location;
    updateBreadcrumbItems(pathname);
  }, [history.location, updateBreadcrumbItems]);

  function displayBreadcrumbItems() {
    return breadcrumbItems.map((breadcrumbItem) => (
      <BreadcrumbItem key={breadcrumbItem.key} isCurrentPage={breadcrumbItem.active}>
        <BreadcrumbLink href={breadcrumbItem.href}>{breadcrumbItem.label}</BreadcrumbLink>
      </BreadcrumbItem>
    ));
  }

  return (
    <Breadcrumb
      spacing={4}
      alignItems='center'
      fontWeight='medium'
      marginBottom={4}
      separator={<ChevronRightIcon color='gray.500' />}
    >
      {displayBreadcrumbItems()}
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
