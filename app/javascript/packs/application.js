import ReactOnRails from 'react-on-rails';

import Cars from '../components/Cars/Cars';
import Car from '../components/Cars/Car';
import Chess from '../components/Reservations/Chess';
import Category from '../components/Category';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Cars,
  Car,
  Chess,
  Category
});
