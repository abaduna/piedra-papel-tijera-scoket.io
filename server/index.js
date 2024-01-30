const http = require("http");
const fs = require("fs");

const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
let jugadas = [];
let jugadorUno = null;
let jugadorDos = null;
let idJugadoUno = null;
let idJugadoDos = null;
const ganar = () => {
  if (jugadorUno === 1) {
    if (jugadorDos === 1) {
      console.log(`empate`);
      io.to(idJugadoUno).emit("mensajeServidor", "empate");
      io.to(idJugadoDos).emit("mensajeServidor", "empate");
    }
    if (jugadorDos === 2) {
      console.log(`gano juagador dos`);
      io.to(idJugadoUno).emit("mensajeServidor", "perdiste");
      io.to(idJugadoDos).emit("mensajeServidor", "ganaste");
    }
    if (jugadorDos === 3) {
      console.log(`gano juagador uno`);
      io.to(idJugadoUno).emit("mensajeServidor", "ganaste");
      io.to(idJugadoDos).emit("mensajeServidor", "perdiste");
    }
  }
  if (jugadorUno === 2) {
    if (jugadorDos === 1) {
      console.log(`gana jugador 1`);
      io.to(idJugadoUno).emit("mensajeServidor", "ganaste");
      io.to(idJugadoDos).emit("mensajeServidor", "perdiste");
    }
    if (jugadorDos === 2) {
      console.log(`empate`);
      io.to(idJugadoUno).emit("mensajeServidor", "empate");
      io.to(idJugadoDos).emit("mensajeServidor", "empate");
    }
    if (jugadorDos === 3) {
      console.log(`gano juagador dos`);
      io.to(idJugadoUno).emit("mensajeServidor", "perdiste");
      io.to(idJugadoDos).emit("mensajeServidor", "ganaste");
    }
  }
  if (jugadorUno === 3) {
    if (jugadorDos === 1) {
      console.log(`gana jugador 2`);
      io.to(idJugadoUno).emit("mensajeServidor", "perdiste");
      io.to(idJugadoDos).emit("mensajeServidor", "ganaste");
    }
    if (jugadorDos === 2) {
      console.log(`gana jugador 1`);
      io.to(idJugadoUno).emit("mensajeServidor", "ganaste");
      io.to(idJugadoDos).emit("mensajeServidor", "perdiste");
    }
    if (jugadorDos === 3) {
      console.log(`empate`);
      io.to(idJugadoUno).emit("mensajeServidor", "empate");
      io.to(idJugadoDos).emit("mensajeServidor", "empate");
    }
  }
  jugadas = [];
  io.to(room).emit("mensajeServidor", "Some message");

  // Clear room data after the game
  rooms[room] = null;
};
io.on("connection", (socket) => {
  console.log(`connection`);

  socket.on("joinRoom", (room) => {
    // Join the specified room
    socket.join(room);
    console.log(`Socket joined room: ${room}`);

    // Initialize room data if not exists
    if (!rooms[room]) {
      rooms[room] = {
        jugadas: [],
        players: {},
      };
    }

    // Add the player to the room
    rooms[room].players[socket.id] = true;

    socket.on("play", (data) => {
      console.log(`data`);
      console.log(data);

      // Store the play data in the room
      rooms[room].jugadas.push({
        select: data.select,
        navegadorId: data.navegadorId,
      });

      console.log(`jugadas`);
      console.log(rooms[room].jugadas);

      // Check if all players in the room have made their move
      const playerCount = Object.keys(rooms[room].players).length;
      if (rooms[room].jugadas.length === playerCount) {
        // Implement your game logic based on room data
        // ...

        // Example: Broadcasting messages to all clients in the room
        io.to(room).emit("mensajeServidor", "Some message");

        // Clear room data after the game
        rooms[room].jugadas = [];
      }
    });

    socket.on("disconnect", () => {
      // Remove the player from the room on disconnect
      delete rooms[room].players[socket.id];
    });
  });
});

server.listen(3001);
