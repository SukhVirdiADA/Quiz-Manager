import React, { useState, useRef, useEffect, Fragment } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Message from "./Message";
import QuizService from "../Services/QuizService";
import { Redirect, Link} from "react-router-dom";

export default function QuizCreate(props) {
  const [quiz, setQuiz] = useState({
    quizQuestion: "",
    answers: [],
    quizTitle: "",
    correctAnswer: null,
  });
  const [message, setMessage] = useState(null);
  let timer = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    setQuiz({ ...quiz, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setQuiz({
      quizQuestion: "",
      answers: [],
      quizTitle: "",
      correctAnswer: null,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    QuizService.addQuiz(quiz).then((data) => {
      console.log(quiz);
      const msg = data;
      setMessage(msg);
      clearForm();
      if (!message) {
        timer = setTimeout(() => {}, 2000);
      }
    });
  };

  return (
    <Fragment>
      <Container>
        <Col>
          <h1>Create a New Quiz</h1>
        </Col>
        <Row>
          <Col>
              <Form.Label column="lg">
                Quiz Title
              </Form.Label>
              <Col s={10}>
                <Form.Control
                  type="text"
                  name="quizTitle"
                  placeholder="Quiz Title"
                  onChange={onChange}
                />
              </Col>
            <Form onSubmit={onSubmit}>
                <Form.Label column="lg">
                  Question
                </Form.Label>
                <Col s={10}>
                  <Form.Control
                    type="text"
                    name="quizQuestion"
                    placeholder="Question"
                    onChange={onChange}
                  />
                </Col>
                <Form.Label column="lg">
                  Answer A
                </Form.Label>
                <Col s={15}>
                  <Form.Control
                    type="text"
                    name="answers"
                    placeholder="Answer A"
                    onChange={onChange}
                  />
                </Col>
                <Form.Label column="lg">
                  Answer B
                </Form.Label>
                <Col s={15}>
                  <Form.Control              
                    type="text"
                    name="answers"
                    placeholder="Answer B"
                    onChange={onChange}
                  />
                </Col>
                <Form.Label column="lg">
                  Answer C
                </Form.Label>
                <Col s={15}>
                  <Form.Control
                    type="text"
                    name="answers"
                    placeholder="Answer C"
                    onChange={onChange}
                  />
                </Col>
                <Form.Label column="lg">
                  Answer D
                </Form.Label>
                <Col s={15}>
                  <Form.Control
                    type="text"
                    name="answers"
                    placeholder="Answer D"
                    onChange={onChange}
                  />
                </Col>
              <Form.Group controlId="correctAnswer">
                <Form.Label column="lg">
                  Correct Answer
                  </Form.Label>
                  <Col s={15}>
                <Form.Control
                  as="select"
                  name="correctAnswer"
                  placeholder = "Correct Answer"
                  onChange={onChange}
                >
                  <option value=""></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col className="col=1">
                <Link to="/quiz">
                <Button className="btn-secondary">Back</Button>
                </Link>
                </Col>
                <Button type="submit">Save Quiz</Button>
              </Form.Group>
              {message ? (
                <div>
                  {" "}
                  <Redirect to="/Quiz" />
                  <Message message={message} />{" "}
                </div>
              ) : null}
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
