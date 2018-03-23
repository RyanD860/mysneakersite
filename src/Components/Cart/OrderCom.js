import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
class OrderCom extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.handleOpen();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <Link to={`/user/profile/${this.props.user[0].authid}`}>
        <FlatButton
          label="Go to Profile"
          primary={true}
          onClick={this.handleClose}
        />
      </Link>,
      <Link to={"/home"}>
        <FlatButton
          label="Go to Shop"
          primary={true}
          onClick={this.handleClose}
        />
      </Link>
    ];

    return (
      <div>
        <RaisedButton label="Alert" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Your order has been accepted!
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(OrderCom));
