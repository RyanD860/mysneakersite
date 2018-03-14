import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { getSneakers } from "./../../ducks/reducer";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      filterSilo: "",
      filterColor: ""
    };
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleSilo = this.handleSilo.bind(this);
    this.undoFilters = this.undoFilters.bind(this);
  }

  componentDidMount() {
    this.props.getSneakers();
  }

  // Opens and Closes Drawer
  handleDrawer() {
    this.setState({ open: !this.state.open });
  }

  //Allows for filter of Silo
  handleSilo(str) {
    this.setState({ filterSilo: str });
  }

  // Allows for filter of Color
  handleColor(str) {
    this.setState({ filterColor: str });
  }

  // Removes filters
  undoFilters() {
    this.setState({ filterSilo: "", filterColor: "" });
  }

  render() {
    const styles = { customText: { fontSize: 24 } };
    let filterSilo = [];
    if (this.props.sneakers[0] && this.state.filterSilo !== "") {
      filterSilo = this.props.sneakers[0].filter(
        item => item.category === this.state.filterSilo
      );
    }

    let filterCol = [];
    if (this.props.sneakers[0] && this.state.filterColor !== "") {
      filterCol = this.props.sneakers[0].filter(
        item => item.color === this.state.filterColor
      );
    }

    let filterBoth = [];
    if (
      this.props.sneakers[0] &&
      this.state.filterSilo &&
      this.state.filterColor
    ) {
      filterBoth = this.props.sneakers[0]
        .filter(item => {
          return item.color === this.state.filterColor;
        })
        .filter(item => item.category === this.state.filterSilo);
    }

    let map = [];

    if (this.state.filterSilo === "" && this.state.filterColor !== "") {
      map = [];
      map = filterCol.map((item, i) => {
        return (
          <h1 key={i}>
            <Link to={`/sneaker/${item.productid}`}>
              <img
                src={process.env.PUBLIC_URL + item.mainimage}
                alt="sneaker"
                className="homeImg"
              />
            </Link>
          </h1>
        );
      });
    } else if (this.state.filterSilo !== "" && this.state.filterColor === "") {
      map = [];
      map = filterSilo.map((item, i) => {
        return (
          <h1 key={i}>
            <Link to={`/sneaker/${item.productid}`}>
              <img
                src={process.env.PUBLIC_URL + item.mainimage}
                alt="sneaker"
                className="homeImg"
              />
            </Link>
          </h1>
        );
      });
    }
    if (this.state.filterSilo !== "" && this.state.filterColor !== "") {
      map = [];
      map = filterBoth.map((item, i) => {
        return (
          <h1 key={i}>
            <Link to={`/sneaker/${item.productid}`}>
              <img
                src={process.env.PUBLIC_URL + item.mainimage}
                alt="sneaker"
                className="homeImg"
              />
            </Link>
          </h1>
        );
      });
    }

    return (
      <div className="home">
        <button label="Toggle Drawer" onClick={this.handleDrawer} id="filter">
          Filter
        </button>
        <Drawer open={this.state.open}>
          <MenuItem style={styles.customText} onClick={this.handleDrawer}>
            CLOSE
          </MenuItem>
          <MenuItem style={styles.customText} onClick={this.undoFilters}>
            UNDO
          </MenuItem>
          <br />
          <p style={styles.customText}>SILHOUETTE</p>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("One")}
          >
            Jordan 1
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("Three")}
          >
            Jordan 3
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("Four")}
          >
            Jordan 4
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("Six")}
          >
            Jordan 6
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("Eight")}
          >
            Jordan 8
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("Ten")}
          >
            Jordan 10
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("Eleven")}
          >
            Jordan 11
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleSilo("Twelve")}
          >
            Jordan 12
          </MenuItem>
          <br />
          <br />
          <p style={styles.customText}>COLOR</p>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleColor("White")}
          >
            White
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleColor("Black")}
          >
            Black
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleColor("Blue")}
          >
            Blue
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleColor("Red")}
          >
            Red
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleColor("Gold")}
          >
            Gold
          </MenuItem>
          <MenuItem
            style={styles.customText}
            onClick={() => this.handleColor("Tan")}
          >
            Tan
          </MenuItem>
        </Drawer>
        <div id="homeGrid">
          {this.props.sneakers[0] &&
          this.state.filterColor === "" &&
          this.state.filterSilo === ""
            ? this.props.sneakers[0].map((item, i) => {
                return (
                  <h1 key={i}>
                    <Link to={`/sneaker/${item.productid}`}>
                      <img
                        src={process.env.PUBLIC_URL + item.mainimage}
                        alt="sneaker"
                        className="homeImg"
                      />
                    </Link>
                  </h1>
                );
              })
            : map}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getSneakers })(Home));
