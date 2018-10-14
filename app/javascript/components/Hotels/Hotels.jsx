import React from 'react';
import Rater from 'react-rating'
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotels: this.props.hotels,
      nameSearch: '',
      ratingSearch: '',
      maxPrice: '',
      admin: this.props.admin
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

  handleSearch = (field, value) => {
    this.setState({[field]: value})
  }

  render() {
    return (
      <div className="container">
        <div className='introduction'>
          <p>Основою цього сайту є <strong><b>Google Maps API</b></strong>. Готелі, кафе, фото та відгуки до них автоматично оновлюються разом з тим, що є на Google картах. Місцезнаходження закладів
            можна подивитися на <strong><b>3D карті</b></strong>. Готелі, які присутні на <strong><b>Booking.com</b></strong> також показуються на цьому сайті. Якщо Ваш заклад відсутній на сайті,
            то Ви можете його створити в меню "Додати заклад" (потрібна реєстрація на сайті, яка займає 1 хвилину), або зв'язатися зі мною
            (email для зв'язку знаходиться знизу). Також вітаються ідеї щодо покращення сайту.</p>
          <div className='facebook'>
            <iframe src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.dragobrat.net&width=51&layout=box_count&action=like&size=small&show_faces=true&share=true&height=65&appId=783416265322787" width="51" height="65" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-lg-4'>
              <input type='text' placeholder='Пошук по назві закладу' className='form-control' onChange={(e) => this.handleSearch('nameSearch', e.target.value)} value={this.state.nameSearch} />
            </div>
            <div className='col-lg-4 filters'>
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
              <div className='col-lg-4'>
                <select className='form-control' onChange={(e) => this.handleSearch('maxPrice', e.target.value)} value={this.state.maxPrice}>
                  <option value={999999}>Пошук по ціні за 1 ніч з людини</option>
                  <option value={100}>Менше 100 грн</option>
                  <option value={200}>Менше 200 грн</option>
                  <option value={300}>Менше 300 грн</option>
                  <option value={400}>Менше 400 грн</option>
                  <option value={500}>Менше 500 грн</option>
                  <option value={600}>Менше 600 грн</option>
                </select>
              </div>}
          </div>
        </div>
        <hr/>
        <div id='hotels_ul'>
          { this.state.hotels.filter(h => h.name.toLowerCase().includes(this.state.nameSearch.toLowerCase()))
              .filter(h => parseFloat(h.googleRating) >= parseFloat(this.state.ratingSearch ? this.state.ratingSearch : 0))
                .filter(h => parseFloat(h.price ? h.price : 0) <= parseFloat(this.state.maxPrice ? this.state.maxPrice : 999999)).map((hotel, index) => {
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
    );
  }
}
