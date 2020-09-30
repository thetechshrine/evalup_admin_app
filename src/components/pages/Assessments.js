import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { GROUP_SELECTOR_EMPTY_FIRST_ITEM_ID } from '../../utils/consts';
import assessmentsActions from '../../store/actions/assessments';

import { NotificationContext } from '../providers/Notification';
import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import Block from '../helpers/Block';
import Assessment from '../core/assessments/Assessment';
import useDisclosure from '../hooks/useDisclosure';

function Assessments() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { assessments, loading } = useSelector((state) => state.assessments);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const history = useHistory();
  const { shown, open, close } = useDisclosure();

  function handleOpenDrawer() {
    if (!selectedGroup || selectedGroup.id === GROUP_SELECTOR_EMPTY_FIRST_ITEM_ID) {
      return notification.showInfoNotification('Message', 'Veuillez sélectionner une classe');
    }

    history.push(`/assessments/new?groupId=${selectedGroup.id}`);
  }

  function handleGroupChange(group) {
    setSelectedGroup(group);
    const groupId = group.id === GROUP_SELECTOR_EMPTY_FIRST_ITEM_ID ? '' : group.id;
    dispatch(assessmentsActions.getAssessments(groupId));
  }

  const [assessementSubjectUrl, setAssessmentSubjectUrl] = useState(null);
  function handleOpenAssessemntSubject({ url } = {}) {
    setAssessmentSubjectUrl(url);
    open();
  }

  function handleCloseAssessmentSubject() {
    setAssessmentSubjectUrl(null);
    close();
  }

  function displayAssessments() {
    return (
      <SimpleGrid spacing={10}>
        {assessments.map((assessment) => (
          <Assessment key={assessment.id} assessment={assessment} onOpenSubject={handleOpenAssessemntSubject} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Block>
        <Block.Header
          title='Evaluations'
          openDrawerLabel='Créer'
          onOpenDrawer={handleOpenDrawer}
          showGroupSelector
          onGroupChange={handleGroupChange}
          includeGroupSelectorFirstEmptyItem
        />

        <Block.Main
          loading={!!loading}
          dataLength={assessments.length}
          emptyDataMessage='Aucune évaluation enregistrée'
        >
          {displayAssessments(assessments)}
        </Block.Main>
      </Block>

      <PDFViewerModal shown={shown} onClose={handleCloseAssessmentSubject} url={assessementSubjectUrl} />
    </>
  );
}

export default Assessments;
