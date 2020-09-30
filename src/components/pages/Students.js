import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/core';

import studentsActions from '../../store/actions/students';

import { NotificationContext } from '../providers/Notification';
import Block from '../helpers/Block';
import StudentDrawer from '../core/students/drawers/StudentDrawer';
import useDisclosure from '../hooks/useDisclosure';
import useFormChange from '../hooks/useFormChange';
import Student from '../core/students/Student';

function displayStudents(students = []) {
  return (
    <SimpleGrid columns={4} spacing={10}>
      {students.map((student) => (
        <Student key={student.id} student={student} />
      ))}
    </SimpleGrid>
  );
}

function Students() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { loading, students } = useSelector((state) => state.students);
  const { shown, open, close } = useDisclosure();
  const { formState, handleChange } = useFormChange();

  useEffect(() => {
    dispatch(studentsActions.getStudents());
  }, [dispatch]);

  function handleSaveStudent(evt) {
    evt.preventDefault();

    const { groupId, ...student } = formState;
    close();
    dispatch(
      studentsActions.createStudent({
        groupId,
        student,
        notification
      })
    );
  }

  return (
    <>
      <Block>
        <Block.Header title='Etudiants' openDrawerLabel='Créer' onOpenDrawer={open} />
        <Block.Main loading={!!loading} dataLength={students.length} emptyDataMessage='Aucun étudiant enregistré'>
          {displayStudents(students)}
        </Block.Main>
      </Block>

      <StudentDrawer shown={shown} onClose={close} onSave={handleSaveStudent} onChange={handleChange} />
    </>
  );
}

export default Students;
