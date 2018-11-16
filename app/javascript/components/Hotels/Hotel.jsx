import React, {Fragment} from 'react';
import Rater from 'react-rating'
import ImageGallery from 'react-image-gallery';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import Leaflet from 'leaflet';
import { Modal, ModalHeader, ModalFooter, ModalBody, Tooltip } from 'reactstrap';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class Hotel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: this.props.hotel,
      review: this.props.hotel.sessionComment,
      reviewRating: 0,
      nearbyHotels: this.props.nearbyHotels,
      logged: this.props.logged,
      admin: this.props.admin,
      suggestEmail: '',
      suggestBody: '',
      showSuggestForm: false,
      tooltips: {}
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
          NotificationManager.success('Відгук залишено')
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
          NotificationManager.success('Відгук видалено')
          window.location.reload()
        }
      });
    }
  }

  replayGif = () => {
    document.getElementById('adrenalin').src='/images/Adrenalin_UA.gif'
  }

  submitSuggest = () => {
    $.ajax({
      url: `/suggests.json`,
      type: 'POST',
      data: {
        hotel_id: this.state.hotel.id,
        suggest: {
          email: this.state.suggestEmail,
          body: this.state.suggestBody
        }
      }
    }).then((resp) => {
      if (resp.success) {
        NotificationManager.success('Дякуємо за допомогу ;)')
      } else {
        NotificationManager.error(resp.error, 'Неможливо надіслати')
      }
    });
  }

  handleModal = () => {
    this.setState({
      showSuggestForm: !this.state.showSuggestForm
    });
  }

  toggle = (index, field) => {
    this.setState({
      ...this.state,
      tooltips: {
        ...this.state.tooltips,
        [index]: {
          ...this.state.tooltips[index],
          [field]: this.state.tooltips[index] && !this.state.tooltips[index][field]
        }
      }
    });
  }

  toggleTooltip = (field) => {
    this.setState({
      ...this.state,
      tooltips: {
        ...this.state.tooltips,
        [field]: !this.state.tooltips[field]
      }
    });
  }

  render() {
    const images = this.state.hotel.photos.map((photo) => {
      return (
        { original: photo,
          thumbnail: photo})})
    return (
      <div className="container page-wraper">
        <NotificationContainer/>
        { images.length > 0 &&
          <Fragment>
            <ImageGallery items={images} additionalClass='custom-gallery' autoPlay />
          </Fragment>}
        <div className='info-block'>
          <div className='hotel-info'>
            <div className='hotel-header'>
              <h1 className='hotel-name'>{this.state.hotel.name}</h1>
              <span>{this.state.hotel.price} {this.state.hotel.price && 'UAH'}</span>
            </div>
            <div className='hotel-header activities'>
              <div className='hotel-icons'>
                <div id='sauna' className={`icon ${this.state.hotel.sauna && 'present'}`}>
                  <img src="/images/sauna.svg"/>
                  <p>Баня</p>
                </div>
                { !this.state.hotel.sauna &&
                  <Tooltip placement="bottom" isOpen={this.state.tooltips.sauna} target='sauna' toggle={() => this.toggleTooltip('sauna')}>
                    Немає
                  </Tooltip>}
                <div id='chan' className={`icon ${this.state.hotel.chan && 'present'}`}>
                  <img src="/images/chan.png"/>
                  <p>Чан</p>
                </div>
                { !this.state.hotel.chan &&
                  <Tooltip placement="bottom" isOpen={this.state.tooltips.chan} target='chan' toggle={() => this.toggleTooltip('chan')}>
                    Немає
                  </Tooltip>}
                <div id='disco' className={`icon ${this.state.hotel.disco && 'present'}`}>
                  <img src="/images/disco.svg"/>
                  <p>Диско</p>
                </div>
                { !this.state.hotel.disco &&
                  <Tooltip placement="bottom" isOpen={this.state.tooltips.disco} target='disco' toggle={() => this.toggleTooltip('disco')}>
                    Немає
                  </Tooltip>}
              </div>
              <Rater initialRating={parseFloat(this.state.hotel.googleRating)} emptySymbol="fa fa-star-o fa-2x"
                     fullSymbol="fa fa-star fa-2x" readonly className='hotel-stars'/>
            </div>
            <div className='hotel-description'>
              <span dangerouslySetInnerHTML={{__html: this.state.hotel.description}}></span>
            </div>
          </div>
          <div className='right'>
            <div className='actions-block'>
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
                { this.state.hotel.location &&
                  <a className='btn btn-dark' href={this.state.hotel.location} target="_blank">3D карта</a>}
                { this.state.hotel.editable &&
                  <a className='btn btn-info' href={`${this.state.hotel.slug}/edit`}>Редагувати</a>}
                { this.state.hotel.editable &&
                  <a className='btn btn-danger' href={`${this.state.hotel.slug}/rooms`}>Адміністрування</a>}
                <button className='btn btn-outline-warning suggest' onClick={this.handleModal}>Запропонувати зміни</button>
              </div>
            </div>
            { this.state.hotel.bookingLink &&
              <div className='actions-block booking'>
                <p>Забронювати на</p>
                <a target="_blank" href={this.state.hotel.bookingLink}>
                  <img src="/images/booking.jpg" />
                </a>
              </div>}
            <div className='partners'>
              <div className='partner'>
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDragobratUA%2F&tabs&width=250&height=70&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=783416265322787" width="250" height="130" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              </div>
              <div className='partner'>
                <a href="https://www.adrenalin-ua.com/snig" onMouseOver={this.replayGif} onMouseOut={this.replayGif} target="_blank">
                  <img id='adrenalin' src="/images/Adrenalin_UA.gif" />
                </a>
              </div>
            </div>
          </div>
        </div>
        { this.state.hotel.lat &&
          <div className="map">
            <Map id='mapid' center={[this.state.hotel.lat, this.state.hotel.lng]} zoom={17}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={[this.state.hotel.lat, this.state.hotel.lng]}>
              </Marker>
            </Map>
          </div>}
        <div className='nearbys'>
          <span><strong><b>Заклади в радіусі 100 метрів</b></strong></span>
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
                        <a href={`/hotels/${hotel.slug}`}><h1>{hotel.name}</h1></a>
                        <span>{hotel.price} {hotel.price && 'UAH'}</span>
                      </div>
                      <div className='body-bottom'>
                        <Rater initialRating={parseFloat(hotel.googleRating)} emptySymbol="fa fa-star-o"
                               fullSymbol="fa fa-star" readonly className='hotel-stars'/>
                        {hotel.location && <a className='3d-link' href={hotel.location} target="_blank">3D карта</a>}
                      </div>
                      <div className='body-bottom'>
                        <div className='icons'>
                          { hotel.sauna &&
                          <Fragment>
                            <img id={`Sauna-${index}`} src="/images/sauna.svg"/>
                            <Tooltip placement="bottom" isOpen={this.state.tooltips[index] && this.state.tooltips[index].sauna} target={`Sauna-${index}`} toggle={() => this.toggle(index, 'sauna')}>
                              Баня
                            </Tooltip>
                          </Fragment>}
                          { hotel.chan &&
                          <Fragment>
                            <img id={`Chan-${index}`} src="/images/chan.png"/>
                            <Tooltip placement="bottom" isOpen={this.state.tooltips[index] && this.state.tooltips[index].chan} target={`Chan-${index}`} toggle={() => this.toggle(index, 'chan')}>
                              Чан
                            </Tooltip>
                          </Fragment>}
                          { hotel.disco &&
                          <Fragment>
                            <img id={`Disco-${index}`} src="/images/disco.svg"/>
                            <Tooltip placement="bottom" isOpen={this.state.tooltips[index] && this.state.tooltips[index].disco} target={`Disco-${index}`} toggle={() => this.toggle(index, 'disco')}>
                              Дискотека
                            </Tooltip>
                          </Fragment>}
                        </div>
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
        { this.state.showSuggestForm &&
          <Modal isOpen={this.state.showSuggestForm} toggle={this.handleModal} size="lg">
            <h4 className='text-center'>Запропонуйте щось від себе</h4>
            <div className='form-group'>
              <label>Ваш Email (необов'язкове поле)</label>
              <input type="email" className='form-control' value={this.state.suggestEmail} onChange={(e) => this.handleInputChange('suggestEmail', e.target.value)}/>
            </div>
            <div className='form-group'>
              <label>Опис проблеми</label>
              <textarea className='form-control' value={this.state.suggestBody} placeholder="Опишіть тут проблему з якою Ви зіткнулися або запропонуйте свої зміни" onChange={(e) => this.handleInputChange('suggestBody', e.target.value)}/>
            </div>
            <div className='form-group'>
              <button disabled={this.state.suggestBody.length < 1} className='btn btn-block btn-danger' onClick={this.submitSuggest}>Надіслати</button>
            </div>
          </Modal>}
      </div>
    );
  }
}
