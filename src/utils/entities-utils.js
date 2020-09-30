function getFullName({ lastName, firstName } = {}) {
  return `${firstName} ${lastName}`;
}

export default {
  getFullName
};
