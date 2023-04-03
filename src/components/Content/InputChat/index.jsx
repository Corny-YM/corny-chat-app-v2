import React, { useContext, useState } from 'react';

import Actions from './Actions';
import Input from './Input';
import Emotion from './Sending/Emotion';
import SendMessage from './Sending/SendMessage';

import { InputChatContext } from '../../../context/InputChatProvider';
import { AuthContext } from '../../../context/AuthContext';
import {
  addNewMessage,
  updateLastMessage,
  updateLastTimeOnline,
} from '../../../firebase/services';

import { encodeAFFINE } from '../../../constants/encryption/AFFINE';
import { checkValidInput } from '../../../constants/encryption/checkValidInput';

const InputChat = ({ roomId, roomInfo }) => {
  const [valueInput, setValueInput] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { isTexting } = useContext(InputChatContext);

  const handleSendMessage = async (sendEmotion = '') => {
    let trimValInput = valueInput.trim();
    let isEmotedOnly = false;
    if (sendEmotion != '') {
      trimValInput = sendEmotion;
      isEmotedOnly = true;
    }
    if (trimValInput == '') {
      setValueInput('');
      return;
    }
    setValueInput('');

    console.log(checkValidInput(trimValInput));
    if(checkValidInput(trimValInput) && !isEmotedOnly) {
      trimValInput = encodeAFFINE(trimValInput)
    }

    // Create new message
    // roomId, currentUserUID, message
    await addNewMessage(roomId, currentUser.uid, trimValInput);

    // Update last message for that room
    await updateLastMessage(roomId, currentUser.uid, trimValInput);

    // Update last time online
    await updateLastTimeOnline(roomId);
  };

  return (
    <div className="flex items-center pt-3 gap-1 h-14">
      {/* Actions */}
      {!isTexting && <Actions roomId={roomId} />}

      {/* Input */}
      <Input
        stateInput={{ valueInput, setValueInput }}
        onSendMessage={handleSendMessage}
      />

      {/* Emotion */}
      <div className="flex-center mr-1">
        {!isTexting ? (
          <Emotion onSendMessage={handleSendMessage} emoji={roomInfo?.emoji} />
        ) : (
          <SendMessage onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
};

export default InputChat;
