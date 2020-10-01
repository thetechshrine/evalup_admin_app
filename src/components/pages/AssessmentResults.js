import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import assessemtResultsActions from '../../store/actions/assessment-results';

import Block from '../helpers/Block';
import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import AssessmentResult from '../core/assessment_results/AssessmentResult';
import useDisclosure from '../hooks/useDisclosure';

function AssessmentResults() {
  const dispatch = useDispatch();
  const { assessmentResults, loading } = useSelector((state) => state.assessmentResults);
  const { shown, open, close } = useDisclosure();
  const { assessmentId } = useParams();
  const history = useHistory();

  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (assessmentId && !hasFetched) {
      dispatch(assessemtResultsActions.getAssessmentResults(assessmentId));
      setHasFetched(true);
    }
  }, [assessmentId]);

  const [assessementResultReportUrl, setAssessmentResultReportUrl] = useState(null);
  function handleOpenAssessemntResultReport({ url } = {}) {
    setAssessmentResultReportUrl(url);
    open();
  }

  function handleCloseAssessmentResultReport() {
    setAssessmentResultReportUrl(null);
    close();
  }

  function handleAssignNote({ assessmentResultId } = {}) {
    history.push(`/assessments/${assessmentId}/assign-note?assessmentResultId=${assessmentResultId}`);
  }

  function displayAssessmentResults() {
    return (
      <SimpleGrid columns={3} spacing={10}>
        {assessmentResults.map((assessmentResult) => (
          <AssessmentResult
            key={assessmentResult.id}
            assessmentResult={assessmentResult}
            onOpenReport={handleOpenAssessemntResultReport}
            onAssignNote={handleAssignNote}
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Block>
        <Block.Header title='Tous les rendus' showActionButton={false} />

        <Block.Main
          loading={loading}
          dataLength={assessmentResults.length}
          emptyDataMessage="Aucun rendu n'a été ajouté"
        >
          {displayAssessmentResults()}
        </Block.Main>
      </Block>

      <PDFViewerModal shown={shown} onClose={handleCloseAssessmentResultReport} url={assessementResultReportUrl} />
    </>
  );
}

export default AssessmentResults;
