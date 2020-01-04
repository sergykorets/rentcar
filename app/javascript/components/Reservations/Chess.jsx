import React, {Fragment} from 'react';
import interactjs from 'interactjs'
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Timeline from 'react-calendar-timeline';
import DateTimePicker from 'react-datetime';

export default class Chess extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('uk');

    this.state = {
      reservations: this.props.reservations,
      cars: this.props.cars,
      editModal: false,
      createModal: false,
      selectedReservation: {},
      visibleTimeStart: moment().add(-1, 'day').valueOf(),
      visibleTimeEnd: moment().add(30, 'day').valueOf(),
      newReservation: {
        name: '',
        phone: '',
        email: '',
        description: '',
        startDate: null,
        endDate: null,
        carId: this.props.cars[0].id
      }
    }
  }

  convertedDates = (reservations) => {
    let convertedReservations = reservations.map((reservation) => {
      return Object.assign(reservation, {start_time: new Date(reservation.start_time)})
    })
    const convertedReservations2 = convertedReservations.map((reservation) => {
      return Object.assign(reservation, {end_time: new Date(reservation.end_time)})
    })
    return convertedReservations2
  }

  groupRenderer = ({ group }) => {
    return (
      <div className="custom-group">
        <a href={`/cars/${group.id}`} className="title">{group.title}</a>
      </div>
    )
  }

  handleModal = (modal, itemId) => {
    if (itemId) {
      $.ajax({
        url: `/cars/null/reservations/${itemId}`,
        type: 'GET'
      }).then((resp) =>
        this.setState({
          ...this.state,
          [modal]: !this.state[modal],
          selectedReservation: resp.reservation
        })
      )
    } else {
        this.setState({
          ...this.state,
          [modal]: !this.state[modal],
        })
    }
  }

  handleReservationChange = (field, value) => {
    this.setState({
      ...this.state,
      selectedReservation: {
        ...this.state.selectedReservation,
        [field]: value
      }
    })
  }

  handleSubmitEditReservation = () => {
    $.ajax({
      url: `/cars/${this.state.selectedReservation.carId}/reservations/${this.state.selectedReservation.id}.json`,
      type: 'PATCH',
      data: {
        from_chess: true,
        reservation: {
          car_id: this.state.selectedReservation.carId,
          name: this.state.selectedReservation.name,
          phone: this.state.selectedReservation.phone,
          email: this.state.selectedReservation.email,
          start_date: moment.isMoment(this.state.selectedReservation.startDate) ? this.state.selectedReservation.startDate.format('DD.MM.YYYY HH:mm') : this.state.selectedReservation.startDate,
          end_date: moment.isMoment(this.state.selectedReservation.endDate) ? this.state.selectedReservation.endDate.format('DD.MM.YYYY HH:mm') : this.state.selectedReservation.endDate,
          description: this.state.selectedReservation.description
        }
      }
    }).then((resp) => {
      if (resp.success) {
        NotificationManager.success('Бронювання оновлено');
        this.setState({reservations: resp.reservations, editModal: false})
      } else {
        NotificationManager.error(resp.error, 'Неможливо створити');
      }
    });
  }

  deleteReservation = (id) => {
    if (confirm('Видалити дане бронювання?')) {
      $.ajax({
        url: `/cars/${this.state.selectedReservation.carId}/reservations/${id}.json`,
        type: 'DELETE',
        data: {
          from_chess: true
        }
      }).then((resp) => {
        NotificationManager.success('Бронювання видалено');
        this.setState({reservations: resp.reservations, editModal: false})
      });
    }
  }

  handleNewReservationChange = (field, value) => {
    this.setState({
      ...this.state,
      newReservation: {
        ...this.state.newReservation,
        [field]: value
      }
    })
  }

  handleNewReservationStartDateChange = (date) => {
    this.setState({
      ...this.state,
      newReservation: {
        ...this.state.newReservation,
        startDate: date
      }
    })
  }

  handleNewReservationEndDateChange = (date) => {
    this.setState({
      ...this.state,
      newReservation: {
        ...this.state.newReservation,
        endDate: date
      }
    })
  }

  handleReservationStartDateChange = (date) => {
    this.setState({
      ...this.state,
      selectedReservation: {
        ...this.state.selectedReservation,
        startDate: date
      }
    })
  }

  handleReservationEndDateChange = (date) => {
    this.setState({
      ...this.state,
      selectedReservation: {
        ...this.state.selectedReservation,
        endDate: date
      }
    })
  }

  handleSubmitReservation = () => {
    $.ajax({
      url: `/cars/${this.state.newReservation.carId}/reservations.json`,
      type: 'POST',
      data: {
        from_chess: true,
        reservation: {
          name: this.state.newReservation.name,
          car_id: this.state.newReservation.carId,
          phone: this.state.newReservation.phone,
          email: this.state.newReservation.email,
          description: this.state.newReservation.description,
          start_date: this.state.newReservation.startDate.format('DD.MM.YYYY HH:mm'),
          end_date: this.state.newReservation.endDate.format('DD.MM.YYYY HH:mm')
        }
      }
    }).then((resp) => {
      if (resp.success) {
        NotificationManager.success('Бронювання створено');
        this.setState({
          ...this.state,
          reservations: resp.reservations,
          newReservation: {
            name: '',
            phone: '',
            email: '',
            description: '',
            startDate: null,
            endDate: null
          },
          createModal: false
        })
      } else {
        NotificationManager.error(resp.error, 'Неможливо створити');
      }
    });
  }

  onTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    this.setState({
      ...this.state,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd
    })
    if (moment(visibleTimeStart).format('DD-MM-YYYY') != moment(this.state.visibleTimeStart).format('DD-MM-YYYY')) {
      $.ajax({
        url: `/schemas.json?start_date=${moment(visibleTimeStart).format('DD-MM-YYYY')}&end_date=${moment(visibleTimeEnd).format('DD-MM-YYYY')}`,
        type: 'GET'
      }).then((resp) =>
        this.setState({
          ...this.state,
          reservations: resp.reservations
        })
      )
    }
  }

  render() {
    const items = this.convertedDates(this.state.reservations);
    return (
      <div className='container page-wraper'>
        <NotificationContainer/>
        <hr/>
        <button className='btn btn-info' onClick={() => this.handleModal('createModal')}><i className='fa fa-plus' /> Створити нове бронювання</button>
        <hr/>
        <Timeline
          onTimeChange={this.onTimeChange}
          groups={this.state.cars}
          items={items}
          defaultTimeStart={moment().add(-1, 'day')}
          defaultTimeEnd={moment().add(30, 'day')}
          visibleTimeStart={this.state.visibleTimeStart}
          visibleTimeEnd={this.state.visibleTimeEnd}
          sidebarContent={'Машини'}
          canMove={false}
          canResize={false}
          canChangeGroup={false}
          itemHeightRatio={0.8}
          dragSnap={1}
          groupRenderer={this.groupRenderer}
          minZoom={7 * 24 * 60 * 60 * 1000}
          maxZoom={30 * 86400 * 1000}
          onItemSelect={(itemId) => this.handleModal('editModal', itemId)}
        />
        { this.state.editModal &&
          <Modal isOpen={this.state.editModal} toggle={() => this.handleModal('editModal', '')}>
            <ModalHeader className='text-center' toggle={() => this.handleModal('editModal', '')}>
              <h5>Редагування бронювання</h5>
            </ModalHeader>
            <div className='reservation-form'>
              <div className='form-group'>
                <i className='fa fa-trash-o float-right' onClick={() => this.deleteReservation(this.state.selectedReservation.id)} />
                <label>Машина</label>
                <select className='form-control' value={this.state.selectedReservation.carId} onChange={(e) => this.handleReservationChange('carId', e.target.value)}>
                  { this.state.cars.map((item, i) =>
                      <option key={i} value={item.id}>{item.title}</option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label>Дати</label>
                <DateTimePicker
                    dateFormat="DD.MM.YYYY"
                    timeFormat="HH:mm"
                    value={this.state.selectedReservation.startDate}
                    onChange={this.handleReservationStartDateChange}
                    inputProps={{placeholder: 'Дата подачі'}}/>
                <br/>
                <DateTimePicker
                    dateFormat="DD.MM.YYYY"
                    timeFormat="HH:mm"
                    value={this.state.selectedReservation.endDate}
                    onChange={this.handleReservationEndDateChange}
                    inputProps={{placeholder: 'Дата повернення'}}/>
              </div>
              <div className='form-group'>
                <label>Ім'я</label>
                <input type='text' className='form-control' value={this.state.selectedReservation.name} onChange={(e) => this.handleReservationChange('name', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input type='email' className='form-control' value={this.state.selectedReservation.email} onChange={(e) => this.handleReservationChange('email', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Телефон</label>
                <input type='text' className='form-control' value={this.state.selectedReservation.phone} onChange={(e) => this.handleReservationChange('phone', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Додаткова інформація</label>
                <textarea type='text' className='form-control' value={this.state.selectedReservation.description} onChange={(e) => this.handleReservationChange('description', e.target.value)} />
              </div>
            </div>
            <ModalFooter>
              <button className='btn btn-block btn-outline-info reservation-btn' onClick={this.handleSubmitEditReservation}>Редагувати</button>
            </ModalFooter>
          </Modal>}
        { this.state.createModal &&
          <Modal isOpen={this.state.createModal} toggle={() => this.handleModal('createModal')}>
            <ModalHeader className='text-center' toggle={() => this.handleModal('createModal')}>
              <h4>Створення нового бронювання</h4>
            </ModalHeader>
            <div className='reservation-form'>
              <div className='form-group'>
                <label>Машина</label>
                <select className='form-control' value={this.state.newReservation.carId} onChange={(e) => this.handleNewReservationChange('carId', e.target.value)}>
                  { this.state.cars.map((item, i) =>
                    <option key={i} value={item.id}>{item.title}</option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label>Дати</label>
                <DateTimePicker
                    dateFormat="DD.MM.YYYY"
                    timeFormat="HH:mm"
                    value={this.state.newReservation.startDate}
                    onChange={this.handleNewReservationStartDateChange}
                    inputProps={{placeholder: 'Дата подачі'}}/>
                    <br/>
                <DateTimePicker
                    dateFormat="DD.MM.YYYY"
                    timeFormat="HH:mm"
                    value={this.state.newReservation.endDate}
                    onChange={this.handleNewReservationEndDateChange}
                    inputProps={{placeholder: 'Дата повернення'}}/>
              </div>
              <div className='form-group'>
                <label>Ім'я</label>
                <input type='text' className='form-control' value={this.state.newReservation.name} onChange={(e) => this.handleNewReservationChange('name', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input type='email' className='form-control' value={this.state.newReservation.email} onChange={(e) => this.handleNewReservationChange('email', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Телефон</label>
                <input type='text' className='form-control' value={this.state.newReservation.phone} onChange={(e) => this.handleNewReservationChange('phone', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Додаткова інформація</label>
                <textarea type='text' className='form-control' value={this.state.newReservation.description} onChange={(e) => this.handleNewReservationChange('description', e.target.value)} />
              </div>
            </div>
            <ModalFooter>
              <button className='btn btn-block btn-outline-info reservation-btn' onClick={this.handleSubmitReservation}>Створити</button>
            </ModalFooter>
          </Modal>}
      </div>
    );
  }
}
