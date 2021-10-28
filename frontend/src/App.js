import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import LogIn from "./Components/LogIn";
import QuizList from "./Components/QuizList";
import AddQuiz from "./Components/QuizCreate";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={LogIn} />
            <Route path="/Quiz" component={QuizList} />
            <Route path="/Add" component={AddQuiz} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;