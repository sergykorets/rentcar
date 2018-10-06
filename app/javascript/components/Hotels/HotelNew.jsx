import React from 'react';
import Form from './common/Form';

export default class HotelNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h2>Додати готель або кафе</h2>
        <Form />
      </div>
    );
  }
}
