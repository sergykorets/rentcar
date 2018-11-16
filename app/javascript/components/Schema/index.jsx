import React, {Fragment} from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export default class Hotel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: this.props.admin
    };
  }

  componentDidMount() {
    if (!this.state.admin) {
      ReactPixel.init('668734460178473');
      ReactGA.initialize('UA-116820611-2');
      ReactGA.ga('send', 'pageview', `/schema`);
      ReactPixel.pageView();
    }
  }

  render() {
    return (
      <div className="container page-wraper">
        <div className='nearbys'>
          <img src="/images/schema.jpg" />
        </div>
      </div>
    );
  }
}
