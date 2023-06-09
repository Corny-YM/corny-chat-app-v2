import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';
import moment from 'moment/moment';

// CHECK & GET
export const getUser = (uid) => {
  const ref = collection(db, 'users');
  const q = query(ref, where('uid', '==', uid));
  return getDocs(q);
};

export const isCreatedRoomFriend = (member) => {
  const ref = collection(db, 'rooms');
  const q = query(
    ref,
    where('chatType', '==', 'friend'),
    where('members', 'array-contains', member),
  );
  return getDocs(q);
};

// CREATE
export const createNewUser = (displayName, email, password, photoURL, uid) => {
  return setDoc(doc(db, 'users', uid), {
    displayName: displayName,
    email: email,
    password: password,
    photoURL: photoURL,
    uid: uid,
    rooms: [],
  });
};

export const createNewRoom = (roomName, members, chatType, avatar = '') => {
  return addDoc(collection(db, 'rooms'), {
    roomName: roomName,
    chatAvatar: avatar,
    chatType: chatType,
    members: members, // array [{name, img, uid, isAdmin}]
    lastTimeOnline: serverTimestamp(),
    lastMessage: {},
    emoji: { id: '+1', skin: 1 },
  });
};

export const addNewMessage = (roomId, senderId, message) => {
  const ref = doc(db, 'messages', String(new Date().getTime()));
  return setDoc(ref, {
    roomId: roomId,
    senderId: senderId,
    chatContent: message,
    time: serverTimestamp(),
    type: 'message',
    fileName: '',
    reactions: [],
  });
};

export const addNewMessageFileMedia = (
  roomId,
  senderId,
  url,
  type,
  fileName,
) => {
  const ref = doc(db, 'messages', String(new Date().getTime()));
  return setDoc(ref, {
    roomId: roomId,
    senderId: senderId,
    chatContent: url,
    time: serverTimestamp(),
    type: type,
    fileName: fileName,
    reactions: [],
  });
};

// UPDATE
export const updateUserRooms = (uid, roomId) => {
  return updateDoc(doc(db, 'users', uid), {
    rooms: arrayUnion(roomId),
  });
};

export const updateLastMessage = (roomId, uid, content) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    lastMessage: {
      senderId: uid,
      content: content,
    },
  });
};

export const updateLastTimeOnline = (roomId) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    lastTimeOnline: serverTimestamp(),
  });
};

export const updateEmojiChat = (roomId, id, skin) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    emoji: {
      id: id,
      skin: skin,
    },
  });
};

export const updateMembersGroup = (roomId, members) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    members: members,
  });
};

export const updateGroupAvatar = (roomId, url) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    chatAvatar: url,
  });
};

export const updateGroupName = (roomId, name) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    roomName: name,
  });
};

export const updateAdmin = async (roomId, mem) => {
  const ref = doc(db, 'rooms', roomId);
  await updateDoc(ref, {
    members: arrayRemove({ ...mem }),
  });
  await updateDoc(ref, {
    members: arrayUnion({ ...mem, isAdmin: true }),
  });
};

export const updateUserPassword = async (uid, newPassword) => {
  const refUsers = doc(db, 'users', uid);
  return updateDoc(refUsers, {
    password: newPassword,
  });
};

// =====================REACTIONS=====================
export const addUserReaction = async (
  messageId,
  userId,
  iconId,
  prevIconId,
) => {
  const refMessage = doc(db, 'messages', messageId);
  await updateDoc(refMessage, {
    reactions: arrayRemove({
      userId: userId,
      iconId: prevIconId,
    }),
  });
  await updateDoc(refMessage, {
    reactions: arrayUnion({
      userId: userId,
      iconId: iconId,
    }),
  });
};
export const removeUserReaction = async (messageId, userId, iconId) => {
  const refMessage = doc(db, 'messages', messageId);
  await updateDoc(refMessage, {
    reactions: arrayRemove({
      userId: userId,
      iconId: iconId,
    }),
  });
};

// DELETE
export const deleteMessage = (messageId) => {
  const refMessage = doc(db, 'messages', String(messageId));
  return updateDoc(refMessage, {
    chatContent: '',
  });
};

// Remove a member out of group
export const removeUserRoomId = (uid, roomId) => {
  const refUser = doc(db, 'users', uid);
  return updateDoc(refUser, {
    rooms: arrayRemove(roomId),
  });
};
export const removeMember = (roomId, member) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    members: arrayRemove(member),
  });
};
export const removeCurrentMember = (roomId, currentUserInfo) => {
  const refRoom = doc(db, 'rooms', roomId);
  return updateDoc(refRoom, {
    members: arrayRemove(currentUserInfo),
  });
};
