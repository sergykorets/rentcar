import React, {Fragment} from 'react';
import Rater from 'react-rating'
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import Leaflet from 'leaflet';
import ImageGallery from 'react-image-gallery';
import moment from 'moment'
import { Modal, ModalHeader, ModalFooter, ModalBody, Tooltip } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import DateTimePicker from 'react-datetime'

export default class Car extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('uk');

    this.state = {
      car: this.props.car,
      reservation: {
        name: '',
        email: '',
        phone: '',
        description: '',
        startDate: '',
        endDate: ''
      },
    };
  }

  componentDidMount() {
    if (!this.props.admin) {
      ReactGA.initialize('UA-116820611-3');
      ReactGA.pageview(window.location.pathname + window.location.search);
      ReactGA.ga('send', 'pageview', `/cars/${this.state.car.slug}`);
      ga('send', {'name': 'viewContent', 'productId': this.state.car.id, 'productName': this.state.car.name});
    }
  }

  handleNewReservationStartDateChange = (date) => {
    this.setState({
      ...this.state,
      reservation: {
        ...this.state.reservation,
        startDate: date
      }
    })
  }

  handleNewReservationEndDateChange = (date) => {
    this.setState({
      ...this.state,
      reservation: {
        ...this.state.reservation,
        endDate: date
      }
    })
  }

  handleNewReservationChange = (field, value) => {
    this.setState({
      ...this.state,
      reservation: {
        ...this.state.reservation,
        [field]: value
      }
    })
  }

  handleSubmitReservation = () => {
    $.ajax({
      url: `/cars/${this.state.car.id}/reservations.json`,
      type: 'POST',
      data: {
        reservation: {
          car_id: this.state.car.id,
          name: this.state.reservation.name,
          phone: this.state.reservation.phone,
          email: this.state.reservation.email,
          description: this.state.reservation.description,
          start_date: this.state.reservation.startDate && this.state.reservation.startDate.format('DD.MM.YYYY HH:mm'),
          end_date: this.state.reservation.endDate && this.state.reservation.endDate.format('DD.MM.YYYY HH:mm'),
        }
      }
    }).then((resp) => {
      if (resp.success) {
        if (!this.props.admin) {
          ga('send', {'name': 'purchase', 'productIds': this.state.car.id, 'revenue': 150})
          ga('require', 'ecommerce')
          ga('ecommerce:addTransaction', {'id': new Date().getTime(), 'revenue': 150, 'currency': 'UAH'})
          ga('ecommerce:addItem', {'id': this.state.car.id, 'name': this.state.car.name, 'quantity': 1, 'price': 150})
          ga('ecommerce:send')
        }
        this.setState({
          ...this.state,
          reservation: {
            name: '',
            phone: '',
            email: '',
            description: '',
            startDate: null,
            endDate: null
          }
        })
        NotificationManager.success("З вами невдовзі зв'яжуться", 'Машину заброньовано');
      } else {
        NotificationManager.error(resp.error, 'Неможливо забронювати машину');
      }
    });
  }

  render() {
    const images = this.state.car.photos.map((photo) => {return ({ original: photo, thumbnail: photo})})
    return (
      <Fragment>
        <NotificationContainer/>
        <section id="car-list-area" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="car-details-content">
                  <h2>{this.state.car.name} <span className="price">Rent: <b>$150</b></span></h2>
                  <ImageGallery items={images} additionalClass='custom-gallery' autoPlay={false} />

                  <div className="car-details-info">
                    <h4>Інформація про авто</h4>
                    <p>{this.state.car.description}</p>

                    <div className="technical-info">
                      <div className="row">
                        <div className="col-lg-6">
                          <h5 className="car-settings">Основні параметри</h5>
                          <div className="tech-info-table">
                            <table className="table table-bordered">
                              <tbody>
                                <tr>
                                  <th>Тип палива</th>
                                  <td>{this.state.car.fuel}</td>
                                </tr>
                                <tr>
                                  <th>Місця</th>
                                  <td>{this.state.car.places}</td>
                                </tr>
                                <tr>
                                  <th>КПП</th>
                                  <td>{this.state.car.gearbox}</td>
                                </tr>
                                <tr>
                                  <th>Колір</th>
                                  <td>{this.state.car.color}</td>
                                </tr>
                                <tr>
                                  <th>Тип кузова</th>
                                  <td>{this.state.car.body_type}</td>
                                </tr>
                                <tr>
                                  <th>Рік</th>
                                  <td>{this.state.car.year}</td>
                                </tr>
                                <tr>
                                  <th>Мотор</th>
                                  <td>{this.state.car.engine} л</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <h5 className="car-settings">Комплектація</h5>
                          <div className="tech-info-list">
                            <ul>
                              { this.state.car.abs && <li>ABS</li>}
                              { this.state.car.gps && <li>GPS</li>}
                              { this.state.car.wifi && <li>WiFi</li>}
                              { this.state.car.conditioner && <li>Кондиціонер</li>}
                              { this.state.car.bluetooth && <li>Bluetooth</li>}
                              { this.state.car.parktronic && <li>Парктронік</li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sidebar-content-wrap m-t-50">
                  <div className="single-sidebar review-area">
                    <h3>Зробити замовлення</h3>

                    <div className="sidebar-body review-form">
                      <div className="name-input">
                        <input type="text" placeholder="Ім'я" value={this.state.reservation.name} onChange={(e) => this.handleNewReservationChange('name', e.target.value)}/>
                      </div>
                      <div className="email-input">
                        <input type="email" placeholder="Email" value={this.state.reservation.email} onChange={(e) => this.handleNewReservationChange('email', e.target.value)}/>
                      </div>
                      <div className="phone-input">
                        <input type="phone" placeholder="Телефон" value={this.state.reservation.phone} onChange={(e) => this.handleNewReservationChange('phone', e.target.value)}/>
                      </div>
                      <div className="dates-input">
                          <DateTimePicker
                              dateFormat="DD.MM.YYYY"
                              timeFormat="HH:mm"
                              value={this.state.reservation.startDate}
                              onChange={this.handleNewReservationStartDateChange}
                              inputProps={{placeholder: 'Дата подачі'}}/>
                          <DateTimePicker
                              dateFormat="DD.MM.YYYY"
                              timeFormat="HH:mm"
                              value={this.state.reservation.endDate}
                              onChange={this.handleNewReservationEndDateChange}
                              className='end-date'
                              inputProps={{placeholder: 'Дата повернення'}}/>
                      </div>
                      <div className="message-input">
                            <textarea name="description" className='description' cols="30" rows="5" value={this.state.reservation.description} onChange={(e) => this.handleNewReservationChange('description', e.target.value)}
                                      placeholder="Додаткова інформація"></textarea>
                      </div>
                      <div className="input-submit">
                        <button onClick={this.handleSubmitReservation}>Замовити</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
