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
let idJugadoUno = null
let idJugadoDos = null
const ganar = () => {
  if (jugadorUno === 1) {
    if (jugadorDos === 1) {
      console.log(`empate`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "empate"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "empate"
      );
    }
    if (jugadorDos === 2) {
      console.log(`gano juagador dos`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "perdiste"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "ganaste"
      );
    }
    if (jugadorDos === 3) {
      console.log(`gano juagador uno`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "ganaste"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "perdiste"
      );
    }
  }
  if (jugadorUno === 2) {
    if (jugadorDos === 1) {
      console.log(`gana jugador 1`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "ganaste"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "perdiste"
      );
    }
    if (jugadorDos === 2) {
      console.log(`empate`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "empate"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "empate"
      );
    }
    if (jugadorDos === 3) {
      console.log(`gano juagador dos`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "perdiste"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "ganaste"
      );
    }
  }
  if (jugadorUno === 3) {
    if (jugadorDos === 1) {
      console.log(`gana jugador 2`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "perdiste"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "ganaste"
      );
    }
    if (jugadorDos === 2) {
      console.log(`gana jugador 1`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "ganaste"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "perdiste"
      );
    }
    if (jugadorDos === 3) {
      console.log(`empate`);
      io.to(idJugadoUno).emit(
        "mensajeServidor",
        "empate"
      );
      io.to(idJugadoDos).emit(
        "mensajeServidor",
        "empate"
      );
    }
  }
  jugadas = [];
};
io.on("connection", (socket) => {
  console.log(`connection`);
  socket.on("create", function(room) {
    socket.join(room);
    socket.on("play", (data) => {
    console.log(`data`);
    console.log(data);
    jugadas.push(data);
    console.log(`jugadas`);
    console.log(jugadas);
    jugadorUno = jugadas[0].select;
    idJugadoUno = jugadas[0].navegadorId
    console.log(`jugadorUno ${jugadorUno}`);

    if (jugadas[1]) {
      jugadorDos = jugadas[1].select;
      idJugadoDos = jugadas[1].navegadorId
      console.log(`jugadorDos ${jugadorDos}`);
      ganar();
    }
    let clientId = data.navegadorId;
    
  });
  })
  
});

server.listen(3001);
