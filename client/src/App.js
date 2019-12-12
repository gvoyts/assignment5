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
import Dropdown from "react-bootstrap/Dropdown";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "",

  flowers: [],
                  sightings: []
genus: "",
species: "",
comname: "",
s_flower: "",
s_person: "",
s_location: "",
s_date: ""};
  
  this.handleChangeGenus = this.handleChangeGenus.bind(this);
  this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
  this.handleChangeComname = this.handleChangeComname.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

  this.handleChangeS_flower = this.handleChangeS_flower.bind(this);
  this.handleChangeS_person = this.handleChangeS_person.bind(this);
  this.handleChangeS_location = this.handleChangeS_location.bind(this);
  this.handleChangeS_date = this.handleChangeS_date.bind(this);
  this.handleSubmitSightings = this.handleSubmitSightings.bind(this);
    
    this.showSightings=this.showSightings.bind(this);

}

componentDidMount() {
}

handleChangeGenus(event) {
  this.setState({genus: event.target.value});
}

handleChangeSpecies(event) {
  this.setState({species: event.target.value});
}
handleChangeComname(event) {
  this.setState({comname: event.target.value});
}

handleSubmit(event) {
  alert('A name was submitted: ' + this.state.genus + ' ' + this.state.species + '' + this.state.comname);
  //this.addUser();
  event.preventDefault();
}

handleChangeS_flower(event) {
  this.setState({s_flower: event.target.value});
}
handleChangeS_person(event) {
  this.setState({s_person: event.target.value});
}
handleChangeS_location(event) {
  this.setState({s_location: event.target.value});
}
handleChangeS_date(event) {
  this.setState({s_date: event.target.value});
}

handleSubmitSightings(event) {
  alert('A name was submitted: ' + this.state.s_flower + ' ' + this.state.s_person + '' + this.state.s_location + '' + this.state.s_date);
  //this.addUser();
  event.preventDefault();
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

        <form onSubmit={this.handleSubmit}>
          <Row>
            <p>update info</p>
            <Col>
              <label>   
                <select value={this.state.comname} onChange={this.handleChangeComname}>{data.map((x,y) => <option key={y}>{x}</option>)}</select>
              </label>
            </Col>
            <Col>
              <label>
                New genus:
                <input type="text" name="genus" value={this.state.genus} onChange={this.handleChangeGenus} />
              </label>
            </Col>
            <Col>
              <label>
                New species:
                <input type="text" name="species" value={this.state.species} onChange={this.handleChangeSpecies} />
              </label>
            </Col>
          </Row>
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={this.handleSubmitSightings}>
          <Row>
            <p>sightings</p>
            <Col>
              <label>   
                <select value={this.state.s_flower} onChange={this.handleChangeS_flower}>{data.map((x,y) => <option key={y}>{x}</option>)}</select>
              </label>
            </Col>
            <Col>
              <label>
                New person:
                <input type="text" name="s_person" value={this.state.s_person} onChange={this.handleChangeS_person} />
              </label>
            </Col>
            <Col>
              <label>
                New loc:
                <input type="text" name="s_location" value={this.state.s_location} onChange={this.handleChangeS_location} />
              </label>
            </Col>
            <Col>
              <label>
                New date:
                <input type="text" name="s_date" value={this.state.s_date} onChange={this.handleChangeS_date} />
              </label>
            </Col>
          </Row>
            <input type="submit" value="Submit" />
        </form>
      </Col>

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
