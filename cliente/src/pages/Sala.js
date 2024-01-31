import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sala() {
    const linkStyle = {
        textDecoration: "none",
        color: "black",
        padding: "10px",
        margin: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "block",
        textAlign: "center",
        height: "25vh"
      };
  return (
    <>
      <h1  style={{ textAlign: "center" }} >Sala de juegos</h1>
      <Row>
        <Col>
          <Link to="/room/1" style={linkStyle}>Sala numero 1</Link>
        </Col>
        <Col>
          <Link to="/room/2" style={linkStyle}>Sala numero 2</Link>
        </Col>
        <Col>
          <Link to="/room/3" style={linkStyle}>Sala numero 3</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/room/4" style={linkStyle}>Sala numero 4</Link>
        </Col>
        <Col>
          <Link to="/room/5" style={linkStyle}>Sala numero 5</Link>
        </Col>
        <Col>
          <Link to="/room/6" style={linkStyle}>Sala numero 6</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/room/7" style={linkStyle}>Sala numero 7</Link>
        </Col>
        <Col>
          <Link to="/room/8" style={linkStyle}>Sala numero 8</Link>
        </Col>
        <Col>
          <Link to="/room/9" style={linkStyle}>Sala numero 9</Link>
        </Col>
      </Row>
    </>
  );
}

export default Sala;
