import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Landing from "./components/Landing"
import Login from "./components/Login"
import Createaccount from "./components/Createaccount"
import Notfound from "./components/Notfound"
import Cities from "./components/Cities"
import Landing2 from "./components/Landing2"
import Landing1 from "./components/Landing1"
import Header from "./components/Header"
import Footer from "./components/Footer"

class App extends Component {
  /* state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  }; */
  render() {
    return (
      <div className="app">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/1" component={Landing1} />
            <Route exact path="/2" component={Landing2} />
            <Route path="/login" component={Login} />
            <Route path="/createaccount" component={Createaccount} />
            <Route path="/cities/all" component={Cities} />
            <Route component={Notfound} />
          </Switch>

        </div>
        <Footer className="container" />
      </div>

    );
  }
}

export default App;
