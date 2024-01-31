import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Container } from "react-bootstrap";
function Home() {
  return (
    <>
      <Container>
        <h1 className="Welcomen">Welcomen</h1>
        <div>
          <Link className="modosDeJuego" to="Sala">
            Multijugador
          </Link>
          <br />
          <Link className="modosDeJuego" to="Individual">
            Individual
          </Link>
        </div>
      </Container>
    </>
  );
}

export default Home;
