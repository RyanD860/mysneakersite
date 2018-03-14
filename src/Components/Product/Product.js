import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSneaker, getStock, addToCart } from "./../../ducks/reducer";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import "./Product.css";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: "",
      value: 1
    };
    this.changeSelectedImg = this.changeSelectedImg.bind(this);
  }
  componentDidMount() {
    this.props.getSneaker(this.props.match.params.id);
    this.props.getStock(this.props.match.params.id);
  }

  changeSelectedImg(val) {
    this.setState({ selectedImage: val });
  }
  handleChange = (event, index, value) => this.setState({ value });
  render() {
    const styles = { customWidth: { autoWidth: true } };

    return (
      <div className="product">
        <div className="pictures">
          {this.state.selectedImage ? (
            <img
              src={process.env.PUBLIC_URL + this.state.selectedImage}
              alt="Selected"
              className="selected"
            />
          ) : (
            <img
              src={
                process.env.PUBLIC_URL + this.props.selectedSneaker.mainimage
              }
              alt="Selected"
              className="selected"
            />
          )}
          <div className="small">
            <img
              className="smallpic"
              src={
                process.env.PUBLIC_URL + this.props.selectedSneaker.mainimage
              }
              alt="Main "
              onClick={() =>
                this.changeSelectedImg(this.props.selectedSneaker.mainimage)
              }
            />
            <img
              className="smallpic"
              src={
                process.env.PUBLIC_URL + this.props.selectedSneaker.secondimage
              }
              alt="Second "
              onClick={() =>
                this.changeSelectedImg(this.props.selectedSneaker.secondimage)
              }
            />
            <img
              className="smallpic"
              src={
                process.env.PUBLIC_URL + this.props.selectedSneaker.thirdimage
              }
              alt="Third "
              onClick={() =>
                this.changeSelectedImg(this.props.selectedSneaker.thirdimage)
              }
            />
            <img
              className="smallpic"
              src={
                process.env.PUBLIC_URL + this.props.selectedSneaker.fourthimage
              }
              alt="Fourth "
              onClick={() =>
                this.changeSelectedImg(this.props.selectedSneaker.fourthimage)
              }
            />
            <img
              className="smallpic"
              src={
                process.env.PUBLIC_URL + this.props.selectedSneaker.fifthimage
              }
              alt="Fifth "
              onClick={() =>
                this.changeSelectedImg(this.props.selectedSneaker.fifthimage)
              }
            />
            <img
              className="smallpic"
              src={
                process.env.PUBLIC_URL + this.props.selectedSneaker.sixthimage
              }
              alt="Sixth "
              onClick={() =>
                this.changeSelectedImg(this.props.selectedSneaker.sixthimage)
              }
            />
          </div>
        </div>

        <div className="info">
          <div className="inform">
            <h1 className="Ptitle">{this.props.selectedSneaker.name}</h1>
            <p id="description">{this.props.selectedSneaker.description}</p>
          </div>
          {this.props.stock[0] ? (
            <div>
              <DropDownMenu
                value={this.state.value}
                onChange={this.handleChange}
                style={styles.customWidth}
                autoWidth={false}
                className="menu"
              >
                {this.props.stock.map((item, i) => {
                  return (
                    <MenuItem
                      key={i}
                      value={item.sku}
                      primaryText={item.size}
                      disabled={item.stock === 0}
                    />
                  );
                })}
              </DropDownMenu>
            </div>
          ) : (
            false
          )}
          <button
            className="cartBtn"
            onClick={() => this.props.addToCart(this.state.value)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getSneaker, getStock, addToCart })(Product)
);
