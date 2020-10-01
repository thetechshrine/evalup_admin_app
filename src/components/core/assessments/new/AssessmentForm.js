import React from 'react';
import PropTypes from 'prop-types';
import { Stack, FormControl, FormLabel, SimpleGrid, Textarea, Button } from '@chakra-ui/core';

import assetEnums from '../../../../utils/enums/asset';
import assessmentEnums from '../../../../utils/enums/assessment';

import Form from '../../../helpers/Form';
import FileUploader from '../../../helpers/FileUploader';
import DateTimePicker from '../../../helpers/DateTimePicker';
import SelectCourse from '../../../core/courses/SelectCourse';
import SelectTeacher from '../../../core/teachers/SelectTeacher';
import Select from '../../../helpers/Select';

function getAssessmentTypeOptions() {
  return [
    { label: 'Examen', value: assessmentEnums.types.MAIN },
    { label: 'Rattrapage', value: assessmentEnums.types.CATCHING_UP }
  ];
}

function AssessmentForm({ groupId, addAsset, removeAsset, onChange, onSave, onCancel, onOpenAssetFile }) {
  function handleFileUploaded({ type, url, remoteId }) {
    addAsset({
      type,
      remoteId,
      name: 'Ennoncé',
      url,
      role: assetEnums.roles.PRIMARY
    });
  }

  return (
    <Form onSubmit={onSave}>
      <Stack py={5} width='30%'>
        <SelectCourse groupId={groupId} onChange={onChange} />
        <SelectTeacher onChange={onChange} />
        <Select required options={getAssessmentTypeOptions()} name='type' label='Type' onChange={onChange} />;
        <FormControl isRequired>
          <FormLabel color='gray.500'>Fichier du sujet</FormLabel>
          <FileUploader
            folder='assessments'
            onFileUploaded={handleFileUploaded}
            onFileDeleted={removeAsset}
            onOpenFile={onOpenAssetFile}
          />
        </FormControl>
        <SimpleGrid columns={2} spacing={4}>
          <DateTimePicker required name='startDate' label='Date de début' onChange={onChange} />
          <DateTimePicker required name='endDate' label='Date de fin' onChange={onChange} />
        </SimpleGrid>
        <FormControl>
          <FormLabel htmlFor='description' color='gray.500'>
            Notes complémentaires
          </FormLabel>
          <Textarea type='text' id='description' name='description' onChange={(evt) => onChange(evt.target)} />
        </FormControl>
        <Stack direction='row' justifyContent='flex-end' py={8}>
          <Button type='button' variant='outline' onClick={onCancel}>
            Annuler
          </Button>
          <Button colorScheme='blue' type='submit'>
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

AssessmentForm.propTypes = {
  groupId: PropTypes.string,
  addAsset: PropTypes.func.isRequired,
  removeAsset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOpenAssetFile: PropTypes.func.isRequired
};

export default AssessmentForm;
