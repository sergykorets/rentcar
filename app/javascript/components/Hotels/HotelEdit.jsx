import React from 'react';
import Form from './common/Form';

export default class HotelEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: this.props.hotel
    };
  }

  render() {
    return (
      <div className="container">
        <h2>Редагувати</h2>
        <Form hotel={this.state.hotel} />
      </div>
    );
  }
}
