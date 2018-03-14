import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Header from "./Components/Header/Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  constructor() {
    super();

    this.state = {
      landing: false
    };
  }
  render() {
    return (
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Exo"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Righteous"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway"
          rel="stylesheet"
        />
        <Header />
        <MuiThemeProvider>{routes}</MuiThemeProvider>
      </div>
    );
  }
}

export default App;
