import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import groupsActions from '../../../store/actions/groups';

import Select from '../../helpers/Select';

function SelectGroup({ onChange }) {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.groups);
  useEffect(() => {
    dispatch(groupsActions.getGroups());
  }, [dispatch]);

  function getOptions() {
    return groups.map((group) => ({
      label: group.code,
      value: group.id
    }));
  }

  return <Select required options={getOptions()} name='groupId' label='Classe' onChange={onChange} />;
}

SelectGroup.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SelectGroup;
