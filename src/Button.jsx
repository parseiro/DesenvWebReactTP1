import {useButton} from 'react-aria';
import React, {useRef} from 'react';

function Button(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  let { children, className } = props;

  return (
    <button {...buttonProps} className={className} ref={ref}>
      {children}
    </button>
  );
}

export default React.memo(Button);
