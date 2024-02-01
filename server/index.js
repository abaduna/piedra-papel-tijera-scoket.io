const http = require("http");
const fs = require("fs");

const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Usamos un objeto para almacenar los datos de cada sala
let rooms = {};

const ganar = (room) => {
  console.log(`room`);
  console.log(room);
  // Accedemos a los datos de la sala usando la variable room
  let jugadas = room.jugadas;
  console.log(`jugadas ${jugadas}`);
  let jugadorUno = room.jugadorUno;
  console.log(`jugadorUno ${jugadorUno}`);
  let jugadorDos = room.jugadorDos;
  console.log(`jugadorDos ${jugadorDos}`);
  let idJugadoUno = room.idJugadoUno;
  console.log(`idJugadoUno ${idJugadoUno}`);
  let idJugadoDos = room.idJugadoDos;

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
  // Limpiamos los datos de la sala después de la partida
  console.log(`rooms[room]`);
  console.log(rooms[room]);
  rooms[room] = {
    jugadas: [],
    jugadorUno: null,
    jugadorDos: null,
    idJugadoUno: null,
    idJugadoDos: null,
  };
};

io.on("connection", async (socket) => {
  console.log(`connection ${socket.id}`);
  socket.on("create", function (room) {
    // Unimos el socket a la sala
    socket.join(room);
    console.log(`room`);
    console.log(room);
    rooms[room] = {
      jugadas: [],
      jugadorUno: null,
      jugadorDos: null,
      idJugadoUno: null,
      idJugadoDos: null,
    };
    socket.on("play", (data) => {
      console.log(`play`);
      console.log(`data`);
      console.log(data);
      // Añadimos la jugada al array de jugadas de la sala
      rooms[room].jugadas.push(data);

      console.log(`jugadas`);
      console.log(rooms[room].jugadas);
      // Asignamos los valores de los jugadores y los identificadores según el orden de las jugadas
      rooms[room].jugadorUno = rooms[room].jugadas[0].select;
      rooms[room].idJugadoUno = rooms[room].jugadas[0].navegadorId;
      console.log(`jugadorUno ${rooms[room].jugadorUno}`);
      console.log(`rooms`);
      console.log(rooms);
      if (rooms[room].jugadas[1]) {
        rooms[room].jugadorDos = rooms[room].jugadas[1].select;
        rooms[room].idJugadoDos = rooms[room].jugadas[1].navegadorId;
        console.log(`jugadorDos ${rooms[room].jugadorDos}`);
        console.log(`rooms`);
        console.log(rooms);
        ganar(rooms[room]);
        console.log(`rooms`);
        console.log(rooms);
      }
      
    });

    
  });
});

server.listen(3001);
