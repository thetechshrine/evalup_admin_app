import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import coursesActions from '../../../store/actions/courses';

import Select from '../../helpers/Select';

function SelectCourse({ groupId, onChange }) {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  useEffect(() => {
    if (groupId && groupId !== currentGroupId) {
      dispatch(coursesActions.getCourses(groupId));
      setCurrentGroupId(groupId);
    }
  }, [dispatch, groupId]);

  function getOptions() {
    return courses.map((course) => ({
      label: course.title,
      value: course.id
    }));
  }

  return <Select required options={getOptions()} name='courseId' label='Cours' onChange={onChange} />;
}

SelectCourse.propTypes = {
  groupId: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SelectCourse;
