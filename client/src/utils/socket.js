import { io } from 'socket.io-client';

const socket = io('https://connectchatapplication.herokuapp.com');

export default socket;
