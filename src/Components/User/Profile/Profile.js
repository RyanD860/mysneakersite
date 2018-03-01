import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "./../../../ducks/reducer";
import { getPurchases } from "./../../../ducks/reducer";

class Profile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.getPurchases(this.props.user[0].id);
  }

  render() {
    return (
      <div>
        {this.props.user[0] ? (
          <div>
            <h1>{this.props.user[0].firstname}</h1>
            <h1>{this.props.user[0].lastname}</h1>
            <h1>GET PAST PURCHASES TO WORK</h1>
          </div>
        ) : (
          <h1>No User</h1>
        )}
        {console.log(this.props)}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPurchases })(Profile)
);
