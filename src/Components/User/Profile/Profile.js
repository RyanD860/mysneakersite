import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "./../../../ducks/reducer";

class Profile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {this.props.user[0] ? (
          <div>
            <h1>{this.props.user[0].firstname}</h1>
            <h1>{this.props.user[0].lastname}</h1>
          </div>
        ) : (
          <h1>No User</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Profile));
