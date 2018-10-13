import React, {Fragment} from 'react';
import Rater from 'react-rating'
import ImageGallery from 'react-image-gallery';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export default class Hotel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: this.props.hotel,
      review: this.props.hotel.sessionComment,
      reviewRating: 0,
      nearbyHotels: this.props.nearbyHotels,
      logged: this.props.logged,
      admin: this.props.admin
    };
  }

  componentDidMount() {
    if (!this.state.admin) {
      ReactGA.initialize('UA-116820611-2');
      ReactGA.pageview(window.location.pathname + window.location.search);
      ReactGA.ga('send', 'pageview', `/hotels/${this.state.hotel.slug}`);
      ga('send', {'name': 'viewContent', 'productId': this.state.hotel.id, 'productName': this.state.hotel.name});
      ReactPixel.track( 'ViewContent', { content_ids: [this.state.hotel.id], content_name: this.state.hotel.name, content_type: 'Hotel' } )
    }
  }

  handleInputChange = (field, value) => {
    this.setState({[field]: value})
  }

  submitReview = () => {
    $.ajax({
      url: `/hotels/${this.state.hotel.slug}/reviews.json`,
      type: 'POST',
      data: {
        review: {
          rating: this.state.reviewRating,
          comment: this.state.review
        }
      },
      success: (resp) => {
        if (resp.success) {
          window.location.href = this.state.hotel.slug
        } else {
          window.location.href = resp.signInPath
        }
      }
    });
  }

  deleteReview = (id) => {
    if(confirm('Видалити відгук?')) {
      $.ajax({
        url: `/hotels/${this.state.hotel.slug}/reviews/${id}.json`,
        type: 'DELETE',
        success: (resp) => {
          window.location.reload()
        }
      });
    }
  }

  render() {
    const images = this.state.hotel.photos.map((photo) => {
      return (
        { original: photo,
          thumbnail: photo})})
    return (
      <div className="container">
        { images.length > 0 &&
          <Fragment>
            <ImageGallery items={images} additionalClass='custom-gallery' />
          </Fragment>}
        <div className='info-block'>
          <div className='hotel-info'>
            <div className='hotel-header'>
              <h2>{this.state.hotel.name}</h2>
              <span>{this.state.hotel.price} {this.state.hotel.price && 'UAH'}</span>
            </div>
            <div className='hotel-description'>
              <span dangerouslySetInnerHTML={{__html: this.state.hotel.description}}></span>
            </div>
          </div>
          <div className='right'>
            <div className='actions-block'>
              <Rater initialRating={parseFloat(this.state.hotel.googleRating)} emptySymbol="fa fa-star-o fa-2x"
                     fullSymbol="fa fa-star fa-2x" readonly className='hotel-stars'/>
              <div className='phones'>
                { this.state.hotel.phones.map((phone, i) => {
                  return (
                    <a href={`tel:${phone}`} className='phone' key={i}>
                      {phone}
                    </a>
                  )})}
              </div>
              <div className='hotel-buttons text-center'>
                { this.state.hotel.site &&
                  <a className='btn btn-default' href={this.state.hotel.site} target="_blank">Офіційний сайт</a>}
                <a className='btn btn-dark' href={this.state.hotel.location} target="_blank">3D карта</a>
                { this.state.hotel.editable &&
                  <a className='btn btn-info' href={`${this.state.hotel.slug}/edit`}>Редагувати</a>}
              </div>
            </div>
            { this.state.hotel.bookingLink &&
              <div className='actions-block booking'>
                <p>Забронювати на</p>
                <a target="_blank" href={this.state.hotel.bookingLink}>
                  <img src="/images/booking.jpg" />
                </a>
              </div>}
          </div>
        </div>
        <div className='nearbys'>
          <span><strong><b>Заклади поблизу</b></strong></span>
          <p><small>paдiyc 100 м</small></p>
          <div id='hotels_ul'>
            { this.state.nearbyHotels.map((hotel, index) => {
              return (
                <div className='hotel' key={index}>
                  <div className="card">
                    <div className="card-img">
                      { hotel.avatar &&
                      <a href={`/hotels/${hotel.slug}`} className="image-popup fh5co-board-img"
                         title={hotel.name}><img src={hotel.avatar} alt={hotel.name}/></a>}
                    </div>
                    <div className="card-body">
                      <div className='body-top'>
                        <a href={`/hotels/${hotel.slug}`}><span>{hotel.name}</span></a>
                        <span>{hotel.price} {hotel.price && 'UAH'}</span>
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
        <div className='reviews-wrap'>
          <div className='review-form'>
            <textarea type='text' rows='3' placeholder={this.state.logged ? 'Напишіть відгук про готель тут' : 'Щоб залишити відгук, потрібно зайти на сайт під своїм логіном або зареєструватися'}
                      onChange={(e) => this.handleInputChange('review', e.target.value)} value={this.state.review} className='form-control'/>
            <div className='review-actions'>
              <button className='btn btn-dark' onClick={this.submitReview} disabled={this.state.reviewRating == 0}>Залишити відгук</button>
              <Rater start={0} stop={5} step={1} onClick={(rate) => this.handleInputChange('reviewRating', rate)} emptySymbol="fa fa-star-o fa-2x"
                     fullSymbol="fa fa-star fa-2x" className='hotel-stars' initialRating={this.state.reviewRating}/>
            </div>
          </div>
          <div className='reviews'>
            { this.state.hotel.googleReviews.map((review, i) => {
              return (
                <Fragment key={i}>
                  <hr/>
                  <div className='review'>
                    <div className={ review.id ? 'round-image-200' : 'review-avatar-div' }><img className='review-avatar' src={review.avatar} alt={review.author} /></div>
                    <div className='review-content'>
                      <div className='content-top'>
                        <div className='left'>
                          <span className='author'>{review.author}</span>
                          <span className='date'>{review.created}</span>
                        </div>
                        <div className='right'>
                          <Rater initialRating={parseInt(review.rating, 10)} emptySymbol="fa fa-star-o"
                                 fullSymbol="fa fa-star" readonly className='hotel-stars'/>
                          { review.destroyable && <i className='fa fa-trash-o' onClick={() => this.deleteReview(review.id)}/>}
                        </div>
                      </div>
                      <div className='review-body'>
                        {review.text}
                      </div>
                    </div>
                  </div>
                </Fragment>
              )})}
          </div>
        </div>
      </div>
    );
  }
}
