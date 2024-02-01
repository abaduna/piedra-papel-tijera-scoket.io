const http = require("http");
const fs = require("fs");

const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let game = {};
const ganar = (jugadorUno, idJugadoUno, jugadorDos, idJugadoDos) => {
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
};
const players = (jugadas) => {
  console.log(`jugadas`);
  console.log(jugadas);
  jugadorUno = jugadas[0].select;
  idJugadoUno = jugadas[0].navegadorId;
  console.log(`jugadorUno ${jugadorUno}`);

  if (jugadas[1]) {
    jugadorDos = jugadas[1].select;
    idJugadoDos = jugadas[1].navegadorId;
    console.log(`jugadorDos ${jugadorDos}`);
    ganar(jugadorUno, idJugadoUno, jugadorDos, idJugadoDos);
  }
};
const vaciar = () => {};
io.on("connection", (socket) => {
  console.log(`connection`);
  let room = 10; //sacarlo desde el front

  socket.on("play", (data) => {
    const room = data.room;

    console.log(`data`);
    console.log(data);

    console.log(game);
    // game[room] = jugadas.push(data);
    // console.log(game);
    // Verifica si la sala ya existe en el objeto 'game'
    if (!game[room]) {
      // Si no existe, crea un nuevo objeto con un array de jugadas
      game[room] = { jugadas: [] };
    }
    game[room].jugadas.push({
      select: data.select,
      navegadorId: data.navegadorId,
    });

    for (const juego in game) {
      console.log(game);
      console.log(`juego`);
      console.log(game[juego].jugadas);
      players(game[juego].jugadas);
      console.log(`game`);
      console.log(game);
      if (game[juego].jugadas[1]) {
        delete game[juego]
      }
    }

    let clientId = data.navegadorId;
  });
});

server.listen(3001);
