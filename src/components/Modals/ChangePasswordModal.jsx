import React, { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import { updatePassword, getAuth } from 'firebase/auth';
// import { auth } from '../../firebase/config';
import { updateUserPassword } from '../../firebase/services';

import ModalsTemplate from './ModalsTemplate';
import { closeModal } from '../../reducers/actions';

// ELGAMAL
import { handleEncodeElgamal } from '../../constants/encryption/ELGAMAL';

const ChangePasswordModal = () => {
  const [valueInput, setValueInput] = useState('');
  const dispatch = useDispatch();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChangePassword = async () => {
    const str = valueInput.trim();
    if (str == '') return;
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = valueInput.trim();

    await updatePassword(user, newPassword)
      .then(() => {
        const passwordEncoded = handleEncodeElgamal(str)
        // Update successful.
        updateUserPassword(user.uid, passwordEncoded)
      })
      .catch((error) => {
        alert("Because the requires-recent-login. Please logout % sign in again!")
        console.log(error);
      });

    // await updateGroupName(roomId, valueInput);
    dispatch(closeModal());
  };

  const handleKeyDown = (e) => {
    if (e.code == 'Enter') {
      handleChangePassword();
    }
  };

  return (
    <ModalsTemplate>
      <div className="w-full max-w-[320px] md:max-w-[500px] flex-center flex-col bg-lightMode dark:bg-darkMode rounded-lg px-3 py-5">
        <div className="pb-2 flex-center font-bold text-2xl mb-3">
          Change Your Password
        </div>
        <input
          ref={inputRef}
          required
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          className="input-styled-chat rounded-lg"
        />

        <div className="flex-center justify-end w-full mt-8">
          <div
            onClick={handleChangePassword}
            className="w-full modal-btn bg-emerald-600"
          >
            CHANGE...
          </div>
        </div>
      </div>
    </ModalsTemplate>
  );
};

export default ChangePasswordModal;
