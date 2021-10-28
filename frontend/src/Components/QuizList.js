import React, { useState, useContext, useEffect, Fragment } from "react";
import Quiz from "./Quiz";
import { Container, Row, Col, Button } from "react-bootstrap";
import QuizService from "../Services/QuizService";
import { AuthContext } from "../Services/AuthContent";
import { Link } from "react-router-dom";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    QuizService.getQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  return (
    <Fragment>
      <Container>
      <Col className="w-50">
          <h1>List of Existing Quizzes</h1>
          </Col>
          <br></br>
          {quizzes.map((quiz) => {
            return <Quiz key={quiz._id} quiz={quiz} user={user} />;
          })}
        <Row>
          <Col md={{ offset: 50 }}>
            {user.role === "edit" ? (
              <Link to="/add" className="">
                <Button>Create a New Quiz</Button>
              </Link>
            ) : null}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}