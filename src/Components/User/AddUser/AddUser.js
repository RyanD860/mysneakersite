import React, { Component } from "react";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Adduser.css";

class AddUser extends Component {
  constructor() {
    super();

    this.state = {
      address: "",
      city: "",
      state: "",
      zipcode: "",
      email: "",
      phone: ""
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlezipcodeChange = this.handlezipcodeChange.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
  }
  handleAddressChange(val) {
    this.setState({ address: val });
  }
  handleCityChange(val) {
    this.setState({ city: val });
  }
  handleStateChange(val) {
    this.setState({ state: val });
  }
  handlezipcodeChange(val) {
    this.setState({ zipcode: val });
  }
  handleEmailChange(val) {
    this.setState({ email: val });
  }
  handlePhoneChange(val) {
    this.setState({ phone: val });
  }

  addNewUser(address, city, state, zipcode, email, phone) {
    if (
      this.state.address &&
      this.state.city &&
      this.state.email &&
      this.state.phone &&
      this.state.state &&
      this.state.zipcode
    ) {
      axios.post(`/api/addUser/${this.props.match.params.id}`, {
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        email: email,
        phone: phone
      });
    }
  }

  render() {
    const style = { marginLeft: 20 };
    return (
      <div id="add">
        <h1>Please enter your shipping information for quick checkout!</h1>
        <Paper zDepth={2} id="editinfo">
          <TextField
            hintText="Address"
            style={style}
            underlineShow={false}
            onChange={e => this.handleAddressChange(e.target.value)}
          />
          <Divider />
          <TextField
            hintText="City"
            style={style}
            underlineShow={false}
            onChange={e => this.handleCityChange(e.target.value)}
          />
          <Divider />
          <TextField
            hintText="State"
            style={style}
            underlineShow={false}
            onChange={e => this.handleStateChange(e.target.value)}
          />
          <Divider />
          <TextField
            hintText="Zipcode"
            style={style}
            underlineShow={false}
            onChange={e => this.handlezipcodeChange(e.target.value)}
          />
          <Divider />
          <TextField
            hintText="E-mail"
            style={style}
            underlineShow={false}
            onChange={e => this.handleEmailChange(e.target.value)}
          />
          <Divider />
          <TextField
            hintText="Phone (ex: 1xxxxxxxxxx)"
            style={style}
            underlineShow={false}
            onChange={e => this.handlePhoneChange(e.target.value)}
          />
          <Divider />
        </Paper>
        <Link to={`/user/profile/${this.props.match.params.id}`}>
          <button
            onClick={() =>
              this.addNewUser(
                this.state.address,
                this.state.city,
                this.state.state,
                this.state.zipcode,
                this.state.email,
                this.state.phone
              )
            }
            className="editBtn"
            style={{ width: "15%", height: "5vh" }}
          >
            ENTER
          </button>
        </Link>
      </div>
    );
  }
}

export default AddUser;
