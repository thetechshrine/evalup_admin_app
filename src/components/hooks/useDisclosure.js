import { useState } from 'react';

export default function () {
  const [shown, setShown] = useState(false);

  function open() {
    setShown(true);
  }

  function close() {
    setShown(false);
  }

  return {
    shown,
    open,
    close
  };
}
