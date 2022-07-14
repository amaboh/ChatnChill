const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User Get a new user fromm react client side
  socket.on("new-user-add", (newUserId) => {
    // if user is not add previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });

      console.log("New Uer Connected", activeUsers)
    }
    // Send data to react client 
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () =>{  
    activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id)
    console.log("User Disconnected", activeUsers);

    io.emit("get-users", activeUsers);
  })

});
