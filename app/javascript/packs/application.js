import ReactOnRails from 'react-on-rails';

import Hotels from '../components/Hotels/Hotels';
import Hotel from '../components/Hotels/Hotel';
import HotelNew from '../components/Hotels/HotelNew';
import HotelEdit from '../components/Hotels/HotelEdit';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Hotels,
  HotelNew,
  HotelEdit,
  Hotel
});
