import React, {Fragment} from 'react';
import Rater from 'react-rating'
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import Masonry from 'react-mason';
import { Tooltip, Modal } from 'reactstrap';
import Leaflet from 'leaflet';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotels: this.props.hotels,
      nameSearch: '',
      ratingSearch: '',
      priceFrom: '',
      priceTo: '',
      sortType: '',
      sortOrder: '',
      moved: false,
      admin: this.props.admin,
      tooltips: {}
    };
  }

  componentDidMount() {
    if (!this.state.admin) {
      ReactPixel.init('668734460178473');
      ReactGA.initialize('UA-116820611-2');
      ReactGA.ga('send', 'pageview', `/hotels`);
      ReactPixel.pageView();
    }
  }

  _onMouseMove = () => {
    this.setState({moved: true})
  }

  handleSearch = (field, value) => {
    this.setState({[field]: value})
  }

  toggle = (index) => {
    this.setState({
      ...this.state,
      tooltips: {
        ...this.state.tooltips,
        [index]: !this.state.tooltips[index]
      }
    });
  }

  handleModal = () => {
    this.setState({
      showMap: !this.state.showMap
    });
  }

  render() {
    const hotels = this.state.hotels.filter(h => h.name.toLowerCase().includes(this.state.nameSearch.toLowerCase()))
      .filter(h => parseFloat(h.googleRating) >= parseFloat(this.state.ratingSearch ? this.state.ratingSearch : 0))
      .filter(h => parseFloat(h.price ? h.price : 999999) >= parseFloat(this.state.priceFrom ? this.state.priceFrom : 0))
      .filter(h => parseFloat(h.price ? h.price : 0) <= parseFloat(this.state.priceTo ? this.state.priceTo : 999999))
    return (
      <div className="container" onMouseMove={this._onMouseMove}>
        <div className="top-banners">
          <a id='left-ads' href="http://ratrak.org.ua/" target="_blank"><img src="/images/freeride.jpg" /></a>
          <a href="/skipass"><img src="/images/november_square.jpg" /></a>
        </div>
        {/*<div className='introduction'>*/}
          {/*/!*<p>Основою цього сайту є <strong><b>Google Maps API</b></strong>. Готелі, кафе, фото та відгуки до них автоматично оновлюються разом з тим, що є на Google картах. Місцезнаходження закладів*!/*/}
            {/*/!*можна подивитися на <strong><b>3D карті</b></strong>. До кожного готелю можна подивитися заклади, які знаходяться поблизу. Готелі, які присутні на <strong><b>Booking.com</b></strong> також показуються на цьому сайті. Якщо Ваш заклад відсутній на сайті,*!/*/}
            {/*/!*то Ви можете його створити в меню "Додати заклад" (потрібна реєстрація на сайті, яка займає 1 хвилину), або зв'язатися зі мною: sergykoretsfsp@gmail.com</p>*!/*/}
        {/*</div>*/}
        <hr/>
        <div className='form-group'>
          <div className='row'>
            <div className='col-lg-3 filters'>
              <input type='text' placeholder='Пошук по назві закладу' className='form-control' onChange={(e) => this.handleSearch('nameSearch', e.target.value)} value={this.state.nameSearch} />
            </div>
            <div className='col-lg-3 filters'>
              <select className='form-control' onChange={(e) => this.handleSearch('ratingSearch', e.target.value)} value={this.state.ratingSearch} >
                <option value={0}>Пошук по рейтингу</option>
                <option value={1}>Рейтинг вище 1</option>
                <option value={2}>Рейтинг вище 2</option>
                <option value={3}>Рейтинг вище 3</option>
                <option value={3.5}>Рейтинг вище 3.5</option>
                <option value={4}>Рейтинг вище 4</option>
                <option value={4.5}>Рейтинг вище 4.5</option>
              </select>
            </div>
            { !this.props.cafe &&
              <div className='col-lg-3'>
                <div className='row'>
                  <div className='col-lg-6 filters'>
                    <input type='number' placeholder='Ціна від' className='form-control' onChange={(e) => this.handleSearch('priceFrom', e.target.value)} value={this.state.priceFrom} />
                  </div>
                  <div className='col-lg-6 filters'>
                    <input type='number' placeholder='Ціна до' className='form-control' onChange={(e) => this.handleSearch('priceTo', e.target.value)} value={this.state.priceTo} />
                  </div>
                </div>
              </div>}
            <div className='col-lg-3'>
              <div className='row'>
                <div className='col-lg-6 filters'>
                  <select className='form-control' onChange={(e) => this.handleSearch('sortType', e.target.value)} value={this.state.sortType} >
                    <option value=''>Сортування</option>
                    { !this.props.cafe && <option value='price'>За ціною</option>}
                    <option value='googleRating'>За рейтингом</option>
                  </select>
                </div>
                <div className='col-lg-6 filters'>
                  <select className='form-control' onChange={(e) => this.handleSearch('sortOrder', e.target.value)} value={this.state.sortOrder} >
                    <option value=''>Порядок</option>
                    <option value='increasing'>Зростаючий</option>
                    <option value='decreasing'>Спадаючий</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className='map-row'>
          <div className='facebook'>
            <iframe src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.dragobrat.net&width=51&layout=box_count&action=like&size=small&show_faces=true&share=true&height=65&appId=783416265322787" width="100" height="65" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
          <button onClick={this.handleModal} className='btn-lg btn-info'>Відкрити карту ({hotels.length} {window.location.href.includes('restaurants') ? 'кафе' : 'готелів'})</button>
          <div className='facebook'>
            <iframe src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.dragobrat.net&width=51&layout=box_count&action=like&size=small&show_faces=true&share=true&height=65&appId=783416265322787" width="100" height="65" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        </div>
        <hr/>
        <Masonry>
          { hotels.sort((a, b) => (this.state.sortType && this.state.sortType === 'googleRating' ? (((this.state.sortType === 'googleRating' && this.state.sortOrder === 'increasing') ?
              parseFloat(a.googleRating) - parseFloat(b.googleRating) : (parseFloat(b.googleRating) - parseFloat(a.googleRating)))) : parseFloat(a.position) - parseFloat(b.position)))
            .sort((a, b) => (this.state.sortType && this.state.sortType === 'price' ? (((this.state.sortType === 'price' && this.state.sortOrder === 'increasing') ?
              (parseFloat(a.price) - parseFloat(b.price)) : (parseFloat(b.price) - parseFloat(a.price)))) : parseFloat(a.position) - parseFloat(b.position))).map((hotel, index) => {
              return (
                <div key={index} className="hotel">
                  <div className="card">
                    <div className="card-img">
                      { hotel.avatar &&
                      <a href={`/hotels/${hotel.slug}`} className="image-popup fh5co-board-img"
                         title={hotel.name}><img src={hotel.avatar || '/images/missing.jpg'} alt={hotel.name}/></a>}
                    </div>
                    <div className="card-body">
                      <div className='body-top'>
                        <a href={`/hotels/${hotel.slug}`}><h1>{hotel.name}</h1></a>
                        <span>
                          <span>{hotel.price} {hotel.price && 'UAH'}</span>
                          <i className="fa fa-info-circle" id={`TooltipExample${index}`}></i>
                        </span>
                        <Tooltip placement="bottom" isOpen={this.state.tooltips[index]} target={`TooltipExample${index}`} toggle={() => this.toggle(index)}>
                           Мінімальна ціна з людини за 1 ніч
                        </Tooltip>
                      </div>
                      <div className='body-bottom'>
                        <Rater initialRating={parseFloat(hotel.googleRating)} emptySymbol="fa fa-star-o"
                               fullSymbol="fa fa-star" readonly className='hotel-stars'/>
                        {hotel.location && <a className='3d-link' href={hotel.location} target="_blank">3D карта</a>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </Masonry>
        { this.state.showMap &&
          <Modal isOpen={this.state.showMap} toggle={this.handleModal} size="lg">
            <Map id='full-map' center={[48.247, 24.242]} zoom={16}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              { hotels.map((hotel, i) => {
                if (hotel.lat) {
                  return (
                    <Marker key={i} position={[hotel.lat, hotel.lng]}>
                      <Popup>
                        <a href={`/hotels/${hotel.slug}`}>{hotel.name}</a><br/>
                        {hotel.price && <Fragment><span>Ціна: {hotel.price} UAH</span><br/></Fragment>}
                        <span>Рейтинг: {hotel.googleRating}/5</span>
                      </Popup>
                    </Marker>
                  )}})}
            </Map>
          </Modal>}
      </div>
    );
  }
}
