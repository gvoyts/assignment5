import React, { Component } from 'react';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
//import FlowersTable from './FlowersTable';
import axios from "axios";
import ThemeSwitcher from "./ThemeSwitcher";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "",
  flowers: [], sightings: [] };
  this.showSightings=this.showSightings.bind(this);
  this.displaySightings=this.displaySightings.bind(this);

}

componentDidMount() {
}

callAPI() {
  fetch("http://localhost:8000/flowers") //just changed this from /api/users
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
}


getFlowers(){
  // fetch("http://localhost:8000/flowers") //just changed this from /api/users
  //       //.then(res => res.text())
  //       .then(res => this.setState({ flowers: res.data }));
  // console.log(this.state.flowers);
  axios.get("http://localhost:8000/flowers").then(res => {
      console.log("in axios get call");
      this.setState({
        flowers: res.data
      });
      console.log(res.data);
  //onsole.log(JSON.parse("this.state.flowers"));
  
    });
    }

componentWillMount() {
    this.callAPI();
    this.getFlowers();
    
    //console.log(this.state.flowers);
}

showSightings(name) {
  const d = axios.post("http://localhost:8000/sightings", { flower: name }).then(res => {
    console.log(res.data);
    this.setState({
      sightings: res.data
     // currName: res.data[0].NAME
    });

})
alert('A name ' + name + ' ' + d);

}

displaySightings(name) {
  console.log("displaying sightings function hit");
  console.log(name);
  axios.post("http://localhost:8000/sightings3", { flower: name }).then(res => {
    console.log(res.data);
    this.setState({
      sightings: res.data
    });
  });
  
}

//can reference each element by using [] notation on this.state.flowers - maybe use this to make buttons for each entry???
  render(){
    const data = this.state.flowers;
    const data2 = this.state.sightings;
    console.log("This is data two: "+ data2);

    const flowersq = data.map(names => {
      return(
        <tr onClick ={() => this.showSightings(names)}>
          <td>{names}</td>
        </tr>
      );
    });
    const sightingsq = data2.map(name => {
      console.log(name.NAME);
      return(
        <tr >
          <td>{name.NAME}</td>
          <td>{name.LOCATION}</td>
          <td>{name.PERSON}</td>
          <td>{name.SIGHTED}</td>
        </tr>
      );
    });
    return (
  <Container>
    <Row>
      <Col>
        <Table>
          <thead>
            <th>name</th>
          </thead>
          <tbody><tr>{flowersq}</tr></tbody>
        </Table>
      </Col>
      <Col>
      <Table>
          <thead>
            <th>sighted</th>
          </thead>
          <tbody><tr>{sightingsq}</tr></tbody>
        </Table>
        </Col>
    </Row>
  </Container>
    );
  }
}
//<ThemeSwitcher></ThemeSwitcher>
//<p className="App-intro">{this.state.apiResponse}</p>
//<p className="App-intro">{this.state.flowers}</p>
////<SignUp></SignUp>
      //<SignIn></SignIn>
export default App;
