import React from 'react'

export default () => {
  try {
    const display = JSON.parse(localStorage.getItem("displayRender"));
    const renders = React.useRef(0);

    return !display ?
      <></>:
      <div>
        { ++renders.current }
      </div>;
  } catch {
    return <></>;
  }
}
