import ReactDOM from 'react-dom';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalVisibilityState, hideModal } from '@src/features';

export const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const modalVisibilityState = useSelector(selectModalVisibilityState);

  useEffect(() => {
    if (modalVisibilityState) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, [modalVisibilityState]);

  if (modalVisibilityState) {
    return ReactDOM.createPortal(
      <>
        <div
          onClick={() => dispatch(hideModal())}
          className='fixed top-0 left-0 w-full h-screen overflow-y-hidden bg-black opacity-40 cursor-pointer'
        ></div>
        <div className='fixed top-1/2 left-1/2 -translate-y-1/2	-translate-x-1/2 bg-white px-2 py-1  rounded-lg w-80'>
          {children}
        </div>
      </>,
      document.getElementById('modal-portal')
    );
  }

  return null;
};
