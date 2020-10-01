import assetEnums from './enums/asset';

function getFullName({ lastName, firstName } = {}) {
  return `${firstName} ${lastName}`;
}

function getPrimaryAssetUrl({ assets = [] } = {}) {
  return assets.find((asset) => asset.role === assetEnums.roles.PRIMARY).url;
}

export default {
  getFullName,
  getPrimaryAssetUrl
};
