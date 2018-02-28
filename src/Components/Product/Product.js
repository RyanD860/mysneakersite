import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSneaker, getStock, addToCart } from "./../../ducks/reducer";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

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
    const styles = { customWidth: { width: 200 } };

    return (
      <div>
        {this.state.selectedImage ? (
          <img
            src={process.env.PUBLIC_URL + this.state.selectedImage}
            alt="Selected "
          />
        ) : (
          false
        )}

        <img
          src={process.env.PUBLIC_URL + this.props.selectedSneaker.mainimage}
          alt="Main "
          onClick={() =>
            this.changeSelectedImg(this.props.selectedSneaker.mainimage)
          }
        />
        <img
          src={process.env.PUBLIC_URL + this.props.selectedSneaker.secondimage}
          alt="Second "
          onClick={() =>
            this.changeSelectedImg(this.props.selectedSneaker.secondimage)
          }
        />
        <img
          src={process.env.PUBLIC_URL + this.props.selectedSneaker.thirdimage}
          alt="Third "
          onClick={() =>
            this.changeSelectedImg(this.props.selectedSneaker.thirdimage)
          }
        />
        <img
          src={process.env.PUBLIC_URL + this.props.selectedSneaker.fourthimage}
          alt="Fourth "
          onClick={() =>
            this.changeSelectedImg(this.props.selectedSneaker.fourthimage)
          }
        />
        <img
          src={process.env.PUBLIC_URL + this.props.selectedSneaker.fifthimage}
          alt="Fifth "
          onClick={() =>
            this.changeSelectedImg(this.props.selectedSneaker.fifthimage)
          }
        />
        <img
          src={process.env.PUBLIC_URL + this.props.selectedSneaker.sixthimage}
          alt="Sixth "
          onClick={() =>
            this.changeSelectedImg(this.props.selectedSneaker.sixthimage)
          }
        />
        <div>
          <p>{this.props.selectedSneaker.name}</p>
          <p>{this.props.selectedSneaker.description}</p>
        </div>
        {this.props.stock[0] ? (
          <div>
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              style={styles.customWidth}
              autoWidth={false}
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
        <button onClick={() => this.props.addToCart(this.state.value)}>
          ADD TO CART
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getSneaker, getStock, addToCart })(Product)
);
