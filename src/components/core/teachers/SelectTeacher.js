import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import teachersActions from '../../../store/actions/teachers';

import Select from '../../helpers/Select';

function SelectTeacher({ onChange }) {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.teachers);
  useEffect(() => {
    dispatch(teachersActions.getTeachers());
  }, [dispatch]);

  function getOptions() {
    return teachers.map((teacher) => ({
      label: `${teacher.firstName} ${teacher.lastName}`,
      value: teacher.id
    }));
  }

  return <Select required options={getOptions()} name='teacherId' label='Enseignant assigné' onChange={onChange} />;
}

SelectTeacher.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SelectTeacher;
