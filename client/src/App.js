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
  sightings: [],
genus: "",
species: "",
comname: "Alpine columbine",
s_flower: "Alpine columbine",
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
  this.insertSighting=this.insertSighting.bind(this);
  this.updateFlower=this.updateFlower.bind(this);
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
  //alert('A name was submitted: ' + this.state.genus + ' ' + this.state.species + '' + this.state.comname);
  this.updateFlower(this.state.genus, this.state.species, this.state.comname);
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
  //alert('A name was submitted: ' + this.state.s_flower + ' ' + this.state.s_person + '' + this.state.s_location + '' + this.state.s_date);
  //this.addUser();
  this.insertSighting(this.state.s_flower, this.state.s_person, this.state.s_location, this.state.s_date);
  event.preventDefault();
}

callAPI() {
  fetch("http://localhost:8000/flowers") //just changed this from /api/users
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
}


getFlowers(){
  axios.get("http://localhost:8000/flowers").then(res => {
      console.log("in axios get call");
      this.setState({
        flowers: res.data
      });
      console.log(res.data);  
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
    });

})
}

insertSighting(name, person, location, sighted){
const d = axios.post("http://localhost:8000/insertSightings", { name: name, person: person, location: location, sighted: sighted}).then(res => {
  console.log(res.data);

})

}

updateFlower(genus, species, comname){
  const d = axios.post("http://localhost:8000/updateFlowers", { genus: genus, species: species, comname: comname}).then(res => {
    console.log(res.data);
  
  })
  this.getFlowers();
}

//can reference each element by using [] notation on this.state.flowers - maybe use this to make buttons for each entry???
  render(){
    const data = this.state.flowers;
    const data2 = this.state.sightings;
    console.log("This is data two: "+ data2);

    const flowersq = data.map(names => {
      return(
        <tr onClick ={() => this.showSightings(names.COMNAME)}>
          <td>{names.GENUS}</td>
          <td>{names.SPECIES}</td>
          <td>{names.COMNAME}</td>
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
    <Col>
      <div className = "a"> Stop and Smell the Roses </div>
    </Col>
    <Row>
      <Col>
        <Table>
          <thead>
            <th>Genus ____________ Species__________Common Name</th>
          </thead>
          <tbody><tr>{flowersq}</tr></tbody>
        </Table>
      </Col>
      <Col>

        <form onSubmit={this.handleSubmit}>
          <Row class="w-25 p-3">
           
            <p className><b>Update Flower Information </b></p>
            <p><i>Choose the common name of the flower you wish to edit.</i></p>
        
            <Col>
              <label>   
                Common Name: 
                <select value={this.state.comname} onChange={this.handleChangeComname}>{data.map((x,y) => <option key={y.COMNAME}>{x.COMNAME}</option>)}</select>
                <p>
                  ____________________________________________________________________
                </p>
              </label>
            </Col>
            <Col>
            <p>
              <label>
                New genus:
                <input type="text" name="genus" value={this.state.genus} onChange={this.handleChangeGenus} />
              </label><p></p>
              </p>
            </Col>
            <Col>
              <label>
                New species:
                <input type="text" name="species" value={this.state.species} onChange={this.handleChangeSpecies} />
              </label>
            </Col>
          </Row>
            <input type="submit" value="Submit" />
            <p>
                  ____________________________________________________________________
                </p>
                <p>
                  ____________________________________________________________________
                </p>
        </form>
        <form onSubmit={this.handleSubmitSightings}>
          <Row>
            <p><b>Record a new flower sighting</b></p>
            <p><i>Input the information regarding your sighting.</i></p>
        
            <Col>
              <label>                Common Name of Flower sighted:  
                <select value={this.state.s_flower} onChange={this.handleChangeS_flower}>{data.map((x,y) => <option key={y.COMNAME}>{x.COMNAME}</option>)}</select>
              </label>
            </Col>
            <Col>
              <label>
                Flower Discoverer (Name):
                <input type="text" name="s_person" value={this.state.s_person} onChange={this.handleChangeS_person} />
              </label>
            </Col>
            <Col>
              <label>
                Location of flower:
                <input type="text" name="s_location" value={this.state.s_location} onChange={this.handleChangeS_location} />
              </label>
            </Col>
            <Col>
              <label>
                Date found:
                <input type="text" name="s_date" value={this.state.s_date} onChange={this.handleChangeS_date} />
              </label>
            </Col>
          </Row>
            <input type="submit" value="Submit" />
            <p>
                  ____________________________________________________________________
                </p>
                <p>
                  ____________________________________________________________________
                </p>
        </form>
        <Row><Col>

<Table>
    <thead>
      <th>Ten Most Recent Sightings</th>
    </thead>
    <tbody><tr>{sightingsq}</tr></tbody>
  </Table>
  </Col></Row>
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
