import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Cantarell|Fjalla+One"
          rel="stylesheet"
        />
        <Header />
        <MuiThemeProvider>{routes}</MuiThemeProvider>
        <Footer />
      </div>
    );
  }
}

export default App;
