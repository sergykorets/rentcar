import React, {Fragment} from 'react';
import BigCalendar from 'react-big-calendar'
//import сreateSlot from 'react-tackle-box/Slot'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment from 'moment'
import AirBnbPicker from "../common/AirBnbPicker";

export default class Ratrak extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('uk');

    this.state = {
      hotel: this.props.hotel,
      reservations: this.props.reservations,
      selectedMonth: new Date,
      ratrak: this.props.ratrak,
      selectedReservation: {},
      newReservation: {
        name: '',
        phone: '',
        deposit: '',
        description: '',
        places: this.props.ratrak.places,
        startDate: null,
        endDate: null,
        ratrakId: this.props.ratrak.id
      },
      editModal: false,
      createModal: false
    };
  }

  handleSelectReservation = (event, e) => {
    this.setState({
      selectedReservation: event,
      editModal: true
    })
  }

  handleModal = (modal) => {
    this.setState({[modal]: !this.state[modal]})
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

  handleNewReservationChange = (field, value) => {
    this.setState({
      ...this.state,
      newReservation: {
        ...this.state.newReservation,
        [field]: value
      }
    })
  }

  deleteReservation = () => {
    if (confirm('Видалити дане бронювання?')) {
      $.ajax({
        url: `/hotels/${this.state.hotel}/reservations/${this.state.selectedReservation.id}.json`,
        type: 'DELETE',
        data: {
          from_ratrak: true,
          date: this.state.selectedMonth
        }
      }).then((resp) => {
        NotificationManager.success('Бронювання видалено');
        this.setState({
          ...this.state,
          editModal: false,
          reservations: resp.reservations
        });
      })
    }
  }

  handleSubmitEditReservation = () => {
    $.ajax({
      url: `/hotels/${this.state.hotel}/reservations/${this.state.selectedReservation.id}.json`,
      type: 'PATCH',
      data: {
        from_ratrak: true,
        date: this.state.selectedMonth,
        reservation: {
          name: this.state.selectedReservation.name,
          phone: this.state.selectedReservation.phone,
          places: this.state.selectedReservation.places,
          description: this.state.selectedReservation.description,
          start_date: this.state.selectedReservation.startDate,
          end_date: this.state.selectedReservation.endDate
        }
      }
    }).then((resp) => {
      if (resp.success) {
        NotificationManager.success('Бронювання оновлено');
        this.setState({
          ...this.state,
          editModal: false,
          reservations: resp.reservations
        });
      } else {
        NotificationManager.error(resp.error, 'Неможливо створити бронювання');
      }
    });
  }

  handleDateChange = ({startDate, endDate}) => {
    this.setState({
      ...this.state,
      selectedReservation: {
        ...this.state.selectedReservation,
        startDate: startDate ? startDate.format('DD.MM.YYYY') : null,
        endDate: endDate ? endDate.format('DD.MM.YYYY') : null
      }
    })
  }

  handleNewReservationDateChange = ({startDate, endDate}) => {
    this.setState({
      ...this.state,
      newReservation: {
        ...this.state.newReservation,
        startDate: startDate ? startDate.format('DD.MM.YYYY') : null,
        endDate: endDate ? endDate.format('DD.MM.YYYY') : null
      }
    })
  }

  handleMonthChange = (date) => {
    $.ajax({
      url: `/hotels/${this.props.hotel}/ratrak.json`,
      type: 'GET',
      dataType: 'JSON',
      data: {
        id: this.state.ratrak.id,
        date: date
      },
      success: (resp) => {
        this.setState({
          ...this.state,
          reservations: resp.reservations,
          selectedMonth: date
        })
      }
    });
  }

  handleSubmitReservation = () => {
    $.ajax({
      url: `/hotels/${this.state.hotel}/reservations.json`,
      type: 'POST',
      data: {
        from_ratrak: true,
        date: this.state.selectedMonth,
        reservation: {
          hotel_id: this.state.hotel,
          ratrak_id: this.state.ratrak.id,
          name: this.state.newReservation.name,
          phone: this.state.newReservation.phone,
          places: this.state.newReservation.places,
          status: 'approved',
          description: this.state.newReservation.description,
          start_date: this.state.newReservation.startDate,
          end_date: this.state.newReservation.endDate
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
            places: this.state.ratrak.places,
            description: '',
            deposit: '',
            startDate: null,
            endDate: null,
            ratrakId: this.state.ratrak.id
          },
          createModal: false
        })
      } else {
        NotificationManager.error(resp.error, 'Неможливо створити');
      }
    });
  }

  convertedDates = () => {
    const dates = this.state.blockedDates.map((date) => {
      return moment(date)
    })
    return dates
  }

  render() {
    console.log(this.state)
    const localizer = BigCalendar.momentLocalizer(moment)
    return (
      <div className="container page-wraper">
        <NotificationContainer/>
        <h3 className='text-center'>Завантаженість ратраків</h3>
        <hr/>
        <div className='calendar-top'>
          <button className='btn btn-info' onClick={() => this.handleModal('createModal')}><i className='fa fa-plus' /> Створити нове бронювання</button>
        </div>
        <hr/>
        <div className='room-calendar'>
          {/*<сreateSlot waitForOutlet />*/}
          <BigCalendar
            views={['month']}
            onNavigate={this.handleMonthChange}
            localizer={localizer}
            events={this.state.reservations}
            selectable
            popup
            onSelectEvent={this.handleSelectReservation}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
        <hr/>
        { this.state.createModal &&
        <Modal isOpen={this.state.createModal} toggle={() => this.handleModal('createModal')}>
          <ModalHeader className='text-center' toggle={() => this.handleModal('createModal')}>
            <h4>Створення нового бронювання</h4>
          </ModalHeader>
          <div className='reservation-form'>
            <div className='form-group'>
              <label>Дати</label>
              <AirBnbPicker
                startPlaceholder={'Початок'}
                endPlaceholder={'Закінчення'}
                oneDay={true}
                initialVisibleMonth={() => moment(this.state.selectedMonth)}
                onPickerApply={this.handleNewReservationDateChange}
                startDate={this.state.newReservation.startDate}
                endDate={this.state.newReservation.endDate} />
            </div>
            <div className='form-group'>
              <label>Ім'я</label>
              <input type='text' className='form-control' value={this.state.newReservation.name} onChange={(e) => this.handleNewReservationChange('name', e.target.value)} />
            </div>
            <div className='form-group'>
              <label>Телефон</label>
              <input type='text' className='form-control' value={this.state.newReservation.phone} onChange={(e) => this.handleNewReservationChange('phone', e.target.value)} />
            </div>
            <div className='form-group'>
              <label>Кількість місць</label>
              <select className='form-control' value={this.state.newReservation.places} onChange={(e) => this.handleNewReservationChange('places', e.target.value)}>
                { [...Array(parseInt(this.props.ratrak.places, 10))].map((e,i) =>
                  <option key={i} value={i+1}>{i+1}</option>
                )}
              </select>
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
        { this.state.editModal &&
        <Modal isOpen={this.state.editModal} toggle={() => this.handleModal('editModal')}>
          <ModalHeader className='text-center' toggle={() => this.handleModal('editModal')}>
            <h4>Редагування бронювання</h4>
          </ModalHeader>
          <div className='reservation-form'>
            <div className='form-group'>
              <i className='fa fa-trash-o float-right' onClick={this.deleteReservation} />
              <label>Дати</label>
              <AirBnbPicker
                oneDay={true}
                onPickerApply={this.handleDateChange}
                startDate={moment(this.state.selectedReservation.start).format('DD.MM.YYYY')}
                endDate={moment(this.state.selectedReservation.end).format('DD.MM.YYYY')} />
            </div>
            <div className='form-group'>
              <label>Ім'я</label>
              <input type='text' className='form-control' value={this.state.selectedReservation.name} onChange={(e) => this.handleReservationChange('name', e.target.value)} />
            </div>
            <div className='form-group'>
              <label>Телефон</label>
              <input type='text' className='form-control' value={this.state.selectedReservation.phone} onChange={(e) => this.handleReservationChange('phone', e.target.value)} />
            </div>
            <div className='form-group'>
              <label>Кількість місць</label>
              <select className='form-control' value={this.state.selectedReservation.places} onChange={(e) => this.handleReservationChange('places', e.target.value)}>
                { [...Array(parseInt(this.props.ratrak.places, 10))].map((e,i) =>
                  <option key={i} value={i+1}>{i+1}</option>
                )}
              </select>
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
      </div>
    );
  }
}
