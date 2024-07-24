import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import NoteList from './components/NoteList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/notes" component={NoteList} />
      </Switch>
    </Router>
  );
};

export default App;
