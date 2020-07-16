import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';
import { setAlert, removeAlert } from '../redux/ActionCreater';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setAlert: (message, AlertType) => {
    dispatch(setAlert(message, AlertType));
  },
  removeAlert: () => {
    dispatch(removeAlert());
  },
});

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
    this.toggleShow = this.toggleShow.bind(this);
  }
  toggleShow() {
    this.setState({
      show: !this.state.show,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.toggleShow();
      this.props.removeAlert();
      console.log(this.props);
    }, 3000);
  }
  render() {
    return (
      <Toast
        className={this.props.cls}
        style={{ marginLeft: '42%' }}
        show={this.state.show}
        onClose={this.toggleShow}
      >
        <Toast.Header>
          <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
          <strong className='mr-auto'>{this.props.heading}</strong>
          <small>now</small>
        </Toast.Header>

        <h4>{this.props.message}</h4>
      </Toast>
    );
  }
}
export default connect(null, mapDispatchToProps)(Alert);