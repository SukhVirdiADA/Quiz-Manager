import React, { useState, Fragment } from "react";
import { Row, Col, ListGroup, Button, Accordion, Card } from "react-bootstrap";

export default function Quiz(props) {
  const [id, setId] = useState("f6c9ad6c-eea0-4049-a7c5-56253bc3e9c0");

  return (
    <Fragment>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item action variant="secondary">
              {props.quiz.quizQuestion}
            </ListGroup.Item>
            <br />
          </ListGroup>
        </Col>
        {props.user.role === "edit" || props.user.role === "view" ? (
          <Col className="col-2">
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Correct Answer
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{props.quiz.correctAnswer}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        ) : null}
      </Row>
    </Fragment>
  );
}
