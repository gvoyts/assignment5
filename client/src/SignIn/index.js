import React, { Component } from "react";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
            email: ''};
    
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeName(event) {
        this.setState({name: event.target.value});
      }

      handleChangeEmail(event) {
        this.setState({email: event.target.value});
      }

      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name + ' email: ' + this.state.email + 'pas: ' + this.state.password);
        this.addUser();
        event.preventDefault();
      }

      signIn() {
        try {
            //sign in
      console.log('Signed in');
    } catch (error) {
      console.error('Error:', error);
      }
    }

      addUser() {
        try {
        const res = fetch("http://localhost:8000/api/user/", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "name": this.state.name,
                "email" : this.state.email,
                "password" : this.state.password
              })
            });
            ///const json = res.json();
  console.log('Success:');
} catch (error) {
  console.error('Error:', error);
            //.then(res => res.text())
            //.then(res => this.setState({ apiResponse: res }));
    }
}
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <p>Sign in</p>
            <label>
              Email:
              <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail} />
            </label>
            <label>
              Password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleChangePassword} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
      
};

export default SignIn;