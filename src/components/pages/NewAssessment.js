import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Heading } from '@chakra-ui/core';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import assetEnums from '../../utils/enums/asset';
import assessmentsActions from '../../store/actions/assessments';

import { NotificationContext } from '../providers/Notification';
import AssessmentForm from '../core/assessments/new/AssessmentForm';
import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import useFormChange from '../hooks/useFormChange';
import useAssets from '../hooks/useAssets';
import useDisclosure from '../hooks/useDisclosure';

function NewAssessment() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { formState, handleChange } = useFormChange();
  const { assets, addAsset, removeAsset } = useAssets();
  const history = useHistory();
  const { shown, open, close } = useDisclosure();

  const [groupId, setGroupId] = useState(null);
  useEffect(() => {
    const searchParams = queryString.parse(window.location.search);
    setGroupId(searchParams.groupId);
  }, []);

  function formatAssessment(assessment) {
    return Object.assign(assessment, {
      startDate: assessment.startDate?.toString(),
      endDate: assessment.endDate?.toString(),
      assets
    });
  }

  function handleSaveAssessment(evt) {
    evt.preventDefault();

    const { courseId, teacherId, ...assessment } = formState;
    dispatch(
      assessmentsActions.createAssessment({
        groupId,
        courseId,
        teacherId,
        assessment: formatAssessment(assessment),
        notification,
        history
      })
    );
  }

  function handleCancel() {
    history.goBack();
  }

  const [assetFile, setAssetFile] = useState({});
  function handleOpenAssetFile({ type, url }) {
    setAssetFile({ type, url });
    open();
  }

  function handleCloseAssetFile() {
    setAssetFile({});
    close();
  }

  return (
    <>
      <Stack>
        <Heading>Nouvelle évaluation</Heading>

        <AssessmentForm
          groupId={groupId}
          addAsset={addAsset}
          removeAsset={removeAsset}
          onChange={handleChange}
          onSave={handleSaveAssessment}
          onCancel={handleCancel}
          onOpenAssetFile={handleOpenAssetFile}
        />
      </Stack>

      <PDFViewerModal
        shown={shown && assetFile.type === assetEnums.types.PDF}
        onClose={handleCloseAssetFile}
        url={assetFile.url}
      />
    </>
  );
}

export default NewAssessment;
