import React, { useState, useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import coursesActions from '../../store/actions/courses';

import { NotificationContext } from '../providers/Notification';
import Block from '../helpers/Block';
import CourseDrawer from '../core/courses/drawers/CourseDrawer';
import Course from '../core/courses/Course';
import useDisclosure from '../hooks/useDisclosure';

function displayCourses(courses = []) {
  return (
    <SimpleGrid>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </SimpleGrid>
  );
}

function Courses() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { courses, loading } = useSelector((state) => state.courses);
  const { shown, open, close } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState(null);

  function handleOpenDrawer() {
    if (!selectedGroup) return notification.showInfoNotification('Message', 'Veuillez sélectionner une classe');

    open();
  }

  function handleGroupChange(group) {
    setSelectedGroup(group);
    dispatch(coursesActions.getCourses(group.id));
  }

  function formatCourseData(course) {
    return Object.assign(course, {
      credits: Number(course.credits),
      successNote: Number(course.successNote)
    });
  }

  function handleSaveCourse(course) {
    close();
    dispatch(
      coursesActions.createCourse({
        groupId: selectedGroup.id,
        course: formatCourseData(course),
        notification
      })
    );
  }

  return (
    <>
      <Block>
        <Block.Header
          title='Cours'
          openDrawerLabel='Créer'
          onOpenDrawer={handleOpenDrawer}
          showGroupSelector
          onGroupChange={handleGroupChange}
        />
        {selectedGroup && (
          <Block.Main loading={loading} dataLength={courses.length} emptyDataMessage='Aucun cours enregistré'>
            {displayCourses(courses)}
          </Block.Main>
        )}
      </Block>

      <CourseDrawer shown={shown} onClose={close} onSave={handleSaveCourse} />
    </>
  );
}

export default Courses;
