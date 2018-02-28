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
    let filterSilo = [];
    if (this.props.sneakers[0]) {
      filterSilo = this.props.sneakers[0].filter(
        item => item.category === this.state.filterSilo
      );
    }

    let filterCol = [];
    if (this.props.sneakers[0]) {
      filterCol = this.props.sneakers[0].filter(
        item => item.color === this.state.filterColor
      );
    }

    let filterBoth = [];
    if (this.props.sneakers[0]) {
      filterBoth = this.props.sneakers[0].filter(item => {
        return (
          item.category === this.state.filterSilo &&
          item.color === this.state.filterColor
        );
      });
    }

    let map = [];

    if (this.state.filterSilo === "" && this.state.filterColor === "") {
      map = filterBoth.map((item, i) => {
        return (
          <h1 key={i}>
            <Link to={`/sneaker/${item.productid}`}>
              {console.log("filterboth")}
              <img
                src={process.env.PUBLIC_URL + item.mainimage}
                alt="sneaker"
              />
            </Link>
          </h1>
        );
      });
    } else if (this.state.filterSilo === "" && this.state.filterColor !== "") {
      map = filterCol.map((item, i) => {
        return (
          <h1 key={i}>
            <Link to={`/sneaker/${item.productid}`}>
              {console.log("filtercolor")}
              <img
                src={process.env.PUBLIC_URL + item.mainimage}
                alt="sneaker"
              />
            </Link>
          </h1>
        );
      });
    } else if (this.state.filterSilo !== "" && this.state.filterColor === "") {
      map = filterSilo.map((item, i) => {
        return (
          <h1 key={i}>
            <Link to={`/sneaker/${item.productid}`}>
              {console.log("filter silo")}
              <img
                src={process.env.PUBLIC_URL + item.mainimage}
                alt="sneaker"
              />
            </Link>
          </h1>
        );
      });
    }

    return (
      <div>
        <button label="Toggle Drawer" onClick={this.handleDrawer}>
          Filter
        </button>
        <Drawer open={this.state.open}>
          <MenuItem onClick={this.handleDrawer}>CLOSE</MenuItem>
          <MenuItem onClick={this.undoFilters}>UNDO</MenuItem>
          <br />
          <p>SILHOUETTE</p>
          <MenuItem onClick={() => this.handleSilo("One")}>Jordan 1</MenuItem>
          <MenuItem onClick={() => this.handleSilo("Three")}>Jordan 3</MenuItem>
          <MenuItem onClick={() => this.handleSilo("Four")}>Jordan 4</MenuItem>
          <MenuItem onClick={() => this.handleSilo("Six")}>Jordan 6</MenuItem>
          <MenuItem onClick={() => this.handleSilo("Eight")}>Jordan 8</MenuItem>
          <MenuItem onClick={() => this.handleSilo("Ten")}>Jordan 10</MenuItem>
          <MenuItem onClick={() => this.handleSilo("Eleven")}>
            Jordan 11
          </MenuItem>
          <MenuItem onClick={() => this.handleSilo("Twelve")}>
            Jordan 12
          </MenuItem>
          <br />
          <br />
          <p>COLOR</p>
          <MenuItem onClick={() => this.handleColor("White")}>White</MenuItem>
          <MenuItem onClick={() => this.handleColor("Black")}>Black</MenuItem>
          <MenuItem onClick={() => this.handleColor("Blue")}>Blue</MenuItem>
          <MenuItem onClick={() => this.handleColor("Red")}>Red</MenuItem>
          <MenuItem onClick={() => this.handleColor("Gold")}>Gold</MenuItem>
          <MenuItem onClick={() => this.handleColor("Tan")}>Tan</MenuItem>
        </Drawer>
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
                    />
                  </Link>
                </h1>
              );
            })
          : map}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getSneakers })(Home));
