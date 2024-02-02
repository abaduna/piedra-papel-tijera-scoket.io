import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
const Individual = () => {
  const [selecPlay1, setSelecPlay1] = useState(null);
  const [selecPlay2, setSelecPlay2] = useState(null);
  const [resultPlay1, setResultPlay1] = useState(null);
  const [resultPlay2, setResultPlay2] = useState(null);
  let play2 = 1;
  const wiind = () => {
    if (selecPlay1 === 1) {
      if (play2 === 1) {
        console.log(`empate`);
        setResultPlay1("empate");
        setResultPlay2("empate");
      }
      if (play2 === 2) {
        console.log(`gano juagador dos`);
        setResultPlay1("perdiste");
        setResultPlay2("ganaste");
      }
      if (play2 === 3) {
        console.log(`gano juagador uno`);
        setResultPlay1("ganaste");
        setResultPlay2("perdiste");
      }
    }
    if (selecPlay1 === 2) {
      if (play2 === 1) {
        console.log(`gana jugador 1`);
        setResultPlay1("ganaste");
        setResultPlay2("perdiste");
      }
      if (play2 === 2) {
        console.log(`empate`);
        setResultPlay1("empate");
        setResultPlay2("empate");
      }
      if (play2 === 3) {
        console.log(`gano juagador dos`);
        setResultPlay1("perdiste");
        setResultPlay2("ganaste");
      }
    }
    if (selecPlay1 === 3) {
      if (play2 === 1) {
        console.log(`gana jugador 2`);
        setResultPlay1("perdiste");
        setResultPlay2("ganaste");
      }
      if (play2 === 2) {
        console.log(`gana jugador 1`);
        setResultPlay1("ganaste");
        setResultPlay2("perdiste");
      }
      if (play2 === 3) {
        console.log(`empate`);
        setResultPlay1("empate");
        setResultPlay2("empate");
      }
    }
    setSelecPlay1(null);
    setSelecPlay2(null);
    setTimeout(() => {
      setResultPlay1(null);
    }, 3000);
  };
  const play = () => {
    console.log(`click play`);
    let numeroAleatorio = Math.random();
    numeroAleatorio *= 3;
    play2 = Math.floor(numeroAleatorio);
    play2 += 1;

    console.log(play2);
    setSelecPlay2(play2);

    console.log(selecPlay2);
    console.log(selecPlay1);
    wiind();
  };
  return (
    <>
      <Row>
        <Col md={12}>
          <Alert variant="info">{resultPlay1}</Alert>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <div className="d-grid gap-2">
            <Button className=" btn-primary" onClick={() => setSelecPlay1(1)}>
              (1)piedra
            </Button>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-grid gap-2">
            <Button variant="warning" onClick={() => setSelecPlay1(2)}>
              {" "}
              (2)papel
            </Button>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-grid gap-2">
            <Button variant="success" onClick={() => setSelecPlay1(3)}>
              {" "}
              (3)tijera
            </Button>
          </div>
        </Col>
      </Row>
      <div className="d-grid gap-2 mt-2">
        <Button variant="info" onClick={() => play()}>
          Play
        </Button>
      </div>
    </>
  );
};
export default Individual;
