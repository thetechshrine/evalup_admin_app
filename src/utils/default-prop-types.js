import PropTypes from 'prop-types';

export const childrenPropType = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]);

export const blockDrawerDefaultPropTypes = {
  shown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

export const groupPropType = PropTypes.shape({
  id: PropTypes.string,
  code: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
});

export const groupsPropType = PropTypes.arrayOf(groupPropType);

export const coursePropType = PropTypes.shape({
  id: PropTypes.string,
  code: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  successNote: PropTypes.number,
  credits: PropTypes.number
});

export const coursesPropType = PropTypes.arrayOf(coursePropType);

export const accountPropType = PropTypes.shape({
  role: PropTypes.string,
  email: PropTypes.string
});

export const addressPropType = PropTypes.shape({
  streetNumber: PropTypes.number,
  streetName: PropTypes.string,
  city: PropTypes.string,
  zipCode: PropTypes.string,
  country: PropTypes.string
});

export const studentPropType = PropTypes.shape({
  id: PropTypes.string,
  gender: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  nationality: PropTypes.string,
  phone: PropTypes.string,
  birthDate: PropTypes.string,
  account: accountPropType,
  address: addressPropType,
  group: groupPropType
});

export const teacherPropType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  gender: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  account: accountPropType
});

export const assetPropType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  role: PropTypes.string,
  url: PropTypes.string,
  remoteId: PropTypes.string
});

export const assetsPropType = PropTypes.arrayOf(assetPropType);

export const assessmentPropType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  teacher: teacherPropType,
  course: coursePropType,
  group: groupPropType,
  assets: assetsPropType
});

export const assessmentResultPropType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  obtainedNote: PropTypes.number,
  obtainedCredits: PropTypes.number,
  assesment: assessmentPropType,
  assets: assetsPropType
});
