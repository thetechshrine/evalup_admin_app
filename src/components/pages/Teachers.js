import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/core';

import teachersActions from '../../store/actions/teachers';

import { NotificationContext } from '../providers/Notification';
import Block from '../helpers/Block';
import useDisclosure from '../hooks/useDisclosure';
import useFormChange from '../hooks/useFormChange';
import Teacher from '../core/teachers/Teacher';
import TeacherDrawer from '../core/teachers/drawers/TeacherDrawer';

function displayTeachers(teachers = []) {
  return (
    <SimpleGrid columns={4} spacing={10}>
      {teachers.map((teacher) => (
        <Teacher key={teacher.id} teacher={teacher} />
      ))}
    </SimpleGrid>
  );
}

function Teachers() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { loading, teachers } = useSelector((state) => state.teachers);
  const { shown, open, close } = useDisclosure();
  const { formState, handleChange } = useFormChange();

  useEffect(() => {
    dispatch(teachersActions.getTeachers());
  }, [dispatch]);

  function handleSaveTeacher(evt) {
    evt.preventDefault();

    close();
    dispatch(
      teachersActions.createTeacher({
        teacher: formState,
        notification
      })
    );
  }

  return (
    <>
      <Block>
        <Block.Header title='Enseignants' openDrawerLabel='Créer' onOpenDrawer={open} />
        <Block.Main loading={loading} dataLength={teachers.length} emptyDataMessage='Aucun enseignant enregistré'>
          {displayTeachers(teachers)}
        </Block.Main>
      </Block>

      <TeacherDrawer shown={shown} onClose={close} onSave={handleSaveTeacher} onChange={handleChange} />
    </>
  );
}

export default Teachers;
