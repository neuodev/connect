import http from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import path from "path";
import connectDB from "./config/db";
import fileUpload from "express-fileupload";
import "dotenv/config";

import {
  setUserStatus,
  getUserStatus,
  getUserById,
  updateUser,
  removeFriend,
} from "./controllers/user";

import {
  register,
  login,
  getUsers,
  addFriend,
  getFriends,
  sendMessage,
  getMessages,
} from "./controllers/user";

import {
  createGroup,
  getGoups,
  getGroupMessages,
  sendGroupMessage,
  removeMember,
} from "./controllers/group";

import uploadRouter from "./routes/upload";
import { environment } from "./utils/env";
import { Event } from "./types/events";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// upload files
app.use(fileUpload());
app.use("/", uploadRouter);

// connect to database
connectDB();
// serve files for production
if (environment.isProd()) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  // redirect if the user hit another api
  app.get("*", (_req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
  );
}

io.on("connection", (socket: Socket) => {
  if (environment.isDev()) console.log("Established new connection");
  socket.on("getUserById", async (userId) => {
    const res = await getUserById(userId);
    socket.emit("getUserByIdResponse", res);
  });

  socket.on("getUserStatus", async (userId) => {
    const status = await getUserStatus(userId);
    socket.emit("userStatus", status);
    console.log(status);
  });

  // set user to active as it login
  socket.on("setUserToActive", async (req) => {
    const res = await setUserStatus(req);
    console.log(res);
  });
  // update user
  socket.on("updateUser", async ({ userId, data }) => {
    const res = await updateUser({ userId, ...data });
    socket.emit("updateUserResponse", res);
  });

  // delete user from a group or delete the gorup if he is an admin
  socket.on("deleteGroup", async ({ userId, groupId }) => {
    await removeMember({ groupId, userId });
    const groups = await getGoups(userId);
    io.emit("getGroupsResponse", groups);
  });

  socket.on(
    "chatMessage",
    async ({ friendId, userId, text, room, groupId }) => {
      if (!groupId) {
        const response = await sendMessage({ friendId, userId, text });

        const messagesResponse = await getMessages({ userId, friendId });
        // console.log(messagesResponse);

        io.to(room).emit("message", messagesResponse);
      } else {
        // send send message to group chat
        const res = await sendGroupMessage({ groupId, userId, text });
        io.to(room).emit("message", res);
      }
    }
  );

  socket.on(Event.Register, async (data) => {
    const response = await register(data);
    socket.emit(Event.Register, response);
    const users = await getUsers();
    socket.emit(Event.GetUsers, users);
  });

  socket.on("login", async (data) => {
    const response = await login(data);
    socket.emit("loginResponse", response);
  });

  socket.on(Event.GetUsers, async () => {
    const data = await getUsers();
    socket.emit(Event.GetUsers, data);
  });

  socket.on("addFriend", async ({ friendId, userId }) => {
    const response = await addFriend({ friendId, userId });
    socket.emit("addFriendResponse", response);
    const friendsResponse = await getFriends(userId);
    io.emit("getFriendsResponse", friendsResponse);
  });

  socket.on("removeFriend", async ({ userId, friendId }) => {
    const res = await removeFriend({ userId, friendId });
    socket.emit("removeFriendResponse", res);
    const response = await getFriends(userId);
    socket.emit("getFriendsResponse", response);
  });

  // get all friends
  socket.on("getFriends", async (userId) => {
    const response = await getFriends(userId);
    socket.emit("getFriendsResponse", response);
  });

  // join user & friend a room
  socket.on("joinRoom", async ({ room, userId, friendId }) => {
    socket.join(room);
    // get messages assocated with this room
    const messagesResponse = await getMessages({ userId, friendId });
    io.to(room).emit("message", messagesResponse);
  });

  //*****groups******
  socket.on("createGroup", async (data) => {
    const response = await createGroup(data);
    socket.emit("createGroupResponse", response);
    const groups = await getGoups(data.admin);
    io.emit("getGroupsResponse", groups);
  });

  // get groups
  socket.on("getGroups", async (userId) => {
    const groups = await getGoups(userId);
    socket.emit("getGroupsResponse", groups);
  });

  // user join room gorup
  socket.on("joinRoomGroup", async ({ room, groupId }) => {
    socket.join(room);
    // get messages assocated with this room
    const messagesResponse = await getGroupMessages(groupId);
    io.to(room).emit("message", messagesResponse);
  });

  socket.on("disconnect", () => {
    //@set user state to inactive
    console.log("A user has Left the chat ");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server runing in ${environment.env} on port ${PORT}`.cyan);
});
