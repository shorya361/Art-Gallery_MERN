import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

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

  render() {
    return (
      <Toast
        className={this.props.cls}
        style={{
          margin: '0',
          zIndex: '1',
          // marginTop: '55px',
          marginRight: '0',
          width: this.props.ml,
          maxWidth: '100%',
        }}
        show={this.state.show}
        onClose={this.toggleShow}
      >
        <Toast.Header>
          <strong className='mr-auto'>{this.props.heading}</strong>
          <small>now</small>
        </Toast.Header>

        <h4>{this.props.message}</h4>
      </Toast>
    );
  }
}
export default Alert;
