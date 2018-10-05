import ReactOnRails from 'react-on-rails';

import Hotels from '../components/Hotels';
import Hotel from '../components/Hotel';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Hotels,
  Hotel
});
