import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
function App() {
  const socket = io("http://localhost:3001");
  const [select, setSelct] = useState(null);
  const [id, setId] = useState(null);
  const [resultado, setResultado] = useState(null);

  let data = {
    select,
    navegadorId: id,
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`conection ${socket.id}`);
      setId(socket.id);
    });
    socket.on("mensajeServidor", (data) => {
      console.log("Mensaje del servidor:", data);
      setResultado(data);
    });
  }, []);

  const elejir = () => {
    console.log(data);
    socket.emit("play", data);
    console.log(`id ${data.customId}`);
  };
  return (
    <div>
      <h2 className="App">resultado {resultado}</h2>
      <h2 className="App">{select}</h2>
      <div>
        <Row>
          <Col md={4}>
            <div className="d-grid gap-2">
              <Button className=" btn-primary" onClick={() => setSelct(1)}>
                (1)piedra
              </Button>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-grid gap-2">
              <Button  variant="warning"  onClick={() => setSelct(2)}> (2)papel</Button>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-grid gap-2">
              <Button  variant="success"  onClick={() => setSelct(3)}> (3)tijera</Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="d-grid gap-2 mt-2">
        <Button variant="info"  onClick={elejir}>Elejir numero</Button>
      </div>
    </div>
  );
}

export default App;
