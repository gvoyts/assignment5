import React, { Component } from 'react';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
    fetch("http://localhost:8000/flowers") //just changed this from /api/users
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}


componentWillMount() {
    this.callAPI();
}

  render(){
  return (
    <div className="App">
      <p className="App-intro">{this.state.apiResponse}</p>
      <SignUp></SignUp>
      <SignIn></SignIn>
    </div>
  );
}
}

export default App;
