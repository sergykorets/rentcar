import React, {Fragment} from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Rater from 'react-rating'

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotels: this.props.hotels
    };
  }

  render() {
    console.log(this.state.hotels)
    return (
      <div className="container">
        <div id='hotels_ul'>
          { this.state.hotels.map((hotel, index) => {
            return (
              <div className='hotel' key={index}>
                <div className="card">
                  <div className="card-img">
                    <a href={`/hotels/${hotel.id}`} className="image-popup fh5co-board-img"
                       title={hotel.name}><img src={hotel.avatar} alt={hotel.name}/></a>
                  </div>
                  <div className="card-body">
                    <div className='body-top'>
                      <span>{hotel.name}</span>
                      <span>{hotel.price}</span>
                    </div>
                    <div className='body-top'>
                      <Rater initialRating={parseFloat(hotel.googleRating)} emptySymbol="fa fa-star-o"
                           fullSymbol="fa fa-star" readonly className='hotel-stars'/>
                      <a className='3d-link' href={hotel.location} target="_blank">Показати на 3D карті</a>
                    </div>
                  </div>
                </div>
              </div>)})}
        </div>
      </div>
    );
  }
}
