import { useState } from 'react';

export default function () {
  const [assets, setAssets] = useState([]);

  function addAsset(asset) {
    setAssets([...assets, asset]);
  }

  function removeAsset(remoteId) {
    setAssets(assets.filter((asset) => asset.remoteId !== remoteId));
  }

  return { assets, addAsset, removeAsset };
}
