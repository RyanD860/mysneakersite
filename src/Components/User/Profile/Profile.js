import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "./../../../ducks/reducer";
import { getPurchases } from "./../../../ducks/reducer";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import axios from "axios";
import Moment from "react-moment";
import "./Profile.css";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      editable: false,
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      email: "",
      phone: ""
    };

    this.allowEdits = this.allowEdits.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlezipcodeChange = this.handlezipcodeChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
    this.props.getPurchases(this.props.match.params.id);
  }

  allowEdits() {
    this.setState({ editable: !this.state.editable });
  }
  handleFirstnameChange(val) {
    this.setState({ firstname: val });
  }
  handleLastNameChange(val) {
    this.setState({ lastname: val });
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

  editUser(firstname, lastname, address, city, state, zipcode, email, phone) {
    if (firstname === "") {
      firstname = this.props.user[0].firstname;
    }
    if (lastname === "") {
      lastname = this.props.user[0].lastname;
    }
    if (address === "") {
      address = this.props.user[0].address;
    }
    if (city === "") {
      city = this.props.user[0].city;
    }
    if (state === "") {
      state = this.props.user[0].state;
    }
    if (zipcode === "") {
      zipcode = this.props.user[0].zipcode;
    }
    if (email === "") {
      email = this.props.user[0].email;
    }
    if (phone === "") {
      phone = this.props.user[0].phone;
    }

    axios.put(`/api/editUser/${this.props.match.params.id}`, {
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      email: email,
      phone: phone
    });
    this.props.getUser(this.props.match.params.id);

    this.setState({ editable: false });
  }
  handleClick() {
    this.editUser(
      this.state.firstname,
      this.state.lastname,
      this.state.address,
      this.state.city,
      this.state.state,
      this.state.zipcode,
      this.state.email,
      this.state.phone
    );
    window.location.reload();
  }
  render() {
    const style = { marginLeft: 20 };

    return (
      <div id="profile">
        <div id="custinfo">
          <h2 style={{ fontSize: "26px", textDecoration: "underline" }}>
            User Profile
          </h2>
          {this.props.user[0] ? (
            <div id="customer">
              <h1>{this.props.user[0].firstname}</h1>
              <h1>{this.props.user[0].lastname}</h1>
            </div>
          ) : (
            <h2>No User</h2>
          )}
          {this.props.user[0] && !this.state.editable ? (
            <div id="userInfo">
              <h2 style={{ textDecoration: "underline" }}>
                Shipping Information
              </h2>
              <p>
                {" "}
                Name: {this.props.user[0].firstname}{" "}
                {this.props.user[0].lastname}{" "}
              </p>
              <p> Address: {this.props.user[0].address} </p>
              <p> City: {this.props.user[0].city} </p>
              <p> State: {this.props.user[0].state} </p>
              <p> Zipcode: {this.props.user[0].zipcode} </p>
              <p> E-mail: {this.props.user[0].email} </p>
              <p> Phone: {this.props.user[0].phone} </p>
            </div>
          ) : (
            false
          )}
          <button onClick={() => this.allowEdits()} className="editBtn">
            {" "}
            EDIT SHIPPING INFORMATION
          </button>
          {this.state.editable ? (
            <div>
              <Paper
                zDepth={2}
                id="edit"
                style={{ width: "75%", margin: "auto" }}
              >
                <TextField
                  defaultValue={this.props.user[0].firstname}
                  style={style}
                  underlineShow={true}
                  onChange={e => this.handleAddressChange(e.target.value)}
                />
                <TextField
                  defaultValue={this.props.user[0].lastname}
                  style={style}
                  underlineShow={true}
                  onChange={e => this.handleAddressChange(e.target.value)}
                />
                <TextField
                  defaultValue={this.props.user[0].address}
                  style={style}
                  hintText="Address"
                  underlineShow={false}
                  onChange={e => this.handleAddressChange(e.target.value)}
                />
                <Divider />
                <TextField
                  defaultValue={this.props.user[0].city}
                  hintText="City"
                  style={style}
                  underlineShow={false}
                  onChange={e => this.handleCityChange(e.target.value)}
                />
                <Divider />
                <TextField
                  defaultValue={this.props.user[0].state}
                  hintText="State"
                  style={style}
                  underlineShow={false}
                  onChange={e => this.handleStateChange(e.target.value)}
                />
                <Divider />
                <TextField
                  defaultValue={this.props.user[0].zipcode}
                  hintText="Zipcode"
                  style={style}
                  underlineShow={false}
                  onChange={e => this.handlezipcodeChange(e.target.value)}
                />
                <Divider />
                <TextField
                  defaultValue={this.props.user[0].email}
                  hintText="E-Mail"
                  style={style}
                  underlineShow={false}
                  onChange={e => this.handleEmailChange(e.target.value)}
                />
                <Divider />
                <TextField
                  defaultValue={this.props.user[0].phone}
                  hintText="Phone"
                  style={style}
                  underlineShow={false}
                  onChange={e => this.handlePhoneChange(e.target.value)}
                />
                <Divider />
              </Paper>
              <Link to={`/user/profile/${this.props.match.params.id}`}>
                <button onClick={() => this.handleClick()} className="editBtn">
                  ENTER
                </button>
              </Link>
            </div>
          ) : (
            false
          )}
        </div>
        <div id="purchases">
          {this.props.pastPurchases[0] ? (
            <h2 style={{ fontSize: "26px", textDecoration: "underline" }}>
              Past Purchases
            </h2>
          ) : (
            false
          )}
          {this.props.pastPurchases[0] ? (
            this.props.pastPurchases.map((item, i) => {
              return (
                <div key={i}>
                  <img
                    src={process.env.PUBLIC_URL + item.mainimage}
                    alt="Past item I've purchased"
                    className="pastPurImg"
                  />
                  <h2>{item.name}</h2>
                  <h4>Purchased on:</h4>
                  <Moment format="MM/DD/YYYY">{item.date}</Moment>
                </div>
              );
            })
          ) : (
            <h2
              style={{
                margin: "auto",
                paddingLeft: "5px",
                paddingRight: "5px"
              }}
            >
              You have made no purchases
            </h2>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPurchases })(Profile)
);
