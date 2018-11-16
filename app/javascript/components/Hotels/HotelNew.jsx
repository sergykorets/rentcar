import React from 'react';
import Form from './common/Form';

export default class HotelNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container page-wraper">
        <h2>Додати заклад</h2>
        <Form />
      </div>
    );
  }
}
