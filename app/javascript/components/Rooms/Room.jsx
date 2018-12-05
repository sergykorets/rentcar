import React, {Fragment} from 'react';
import BigCalendar from 'react-big-calendar'
import createSlot from 'react-tackle-box/Slot'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment from 'moment'
import AirBnbPicker from "../common/AirBnbPicker";

export default class Room extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('uk');

    this.state = {
      hotelId: this.props.hotelId,
      room: this.props.room,
      rooms: this.props.rooms,
      selectedMonth: new Date,
      selectedReservation: {},
      newReservation: {
        name: '',
        phone: '',
        places: this.props.room.places,
        startDate: null,
        endDate: null,
        roomId: Object.keys(this.props.rooms)[0]
      },
      editModal: false,
      createModal: false,
      blockedDates: []
    };
  }

  handleSelectReservation = (event, e) => {
    $.ajax({
      url: `/hotels/${this.state.hotelId}/booked_dates.json?date=${this.state.selectedMonth}&room_id=${this.state.room.id}&reservation_id=${event.id}`,
      type: 'GET'
    }).then((resp) =>
      this.setState({
        blockedDates: resp.blockedDates,
        selectedReservation: event,
        editModal: true
      })
    )
  }

  handleModal = (modal) => {
    if (modal === 'createModal') {
      $.ajax({
        url: `/hotels/${this.state.hotelId}/booked_dates.json?date=${this.state.selectedMonth}&room_id=${this.state.room.id}`,
        type: 'GET'
      }).then((resp) =>
        this.setState({
          ...this.state,
          blockedDates: resp.blockedDates,
          [modal]: !this.state[modal],
        })
      )
    } else {
      this.setState({[modal]: !this.state[modal]})
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
        url: `/hotels/${this.state.hotelId}/reservations/${this.state.selectedReservation.id}.json`,
        type: 'DELETE',
        data: {
          from_calendar: true,
          date: this.state.selectedMonth
        }
      }).then((resp) => {
        NotificationManager.success('Бронювання видалено');
        this.setState({
          ...this.state,
          editModal: false,
          room: {
            ...this.state.room,
            reservations: resp.reservations
          }
        });
      })
    }
  }

  handleSubmitEditReservation = () => {
    $.ajax({
      url: `/hotels/${this.state.hotelId}/reservations/${this.state.selectedReservation.id}.json`,
      type: 'PATCH',
      data: {
        date: this.state.selectedMonth,
        reservation: {
          name: this.state.selectedReservation.title,
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
          room: {
            ...this.state.room,
            reservations: resp.reservations
          }
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

  handleRoomChange = (id) => {
    $.ajax({
      url: `/hotels/${this.props.hotelId}/rooms/calendar.json`,
      type: 'GET',
      dataType: 'JSON',
      data: {
        id: id,
        date: this.state.selectedMonth
      },
      success: (resp) => {
        this.setState({
          ...this.state,
          room: resp.room
        })
      }
    });
  }

  handleMonthChange = (date) => {
    $.ajax({
      url: `/hotels/${this.props.hotelId}/rooms/calendar.json`,
      type: 'GET',
      dataType: 'JSON',
      data: {
        id: this.state.room.id,
        date: date
      },
      success: (resp) => {
        this.setState({
          ...this.state,
          room: resp.room,
          selectedMonth: date
        })
      }
    });
  }

  handleSubmitReservation = () => {
    $.ajax({
      url: `/hotels/${this.state.hotelId}/reservations.json`,
      type: 'POST',
      data: {
        from_calendar: true,
        date: this.state.selectedMonth,
        reservation: {
          hotel_id: this.state.hotelId,
          room_id: this.state.room.id,
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
          room: {
            ...this.state.room,
            reservations: resp.reservations
          },
          newReservation: {
            name: '',
            phone: '',
            places: this.props.room.places,
            startDate: null,
            endDate: null,
            roomId: Object.keys(this.state.rooms)[0]
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

  getBlockedDates = (date) => {
    $.ajax({
      url: `/hotels/${this.state.hotelId}/booked_dates.json?date=${date.format('YYYY-MM-DD')}&room_id=${this.state.room.id}&reservation_id=${this.state.editModal ? this.state.selectedReservation.id : ''}`,
      type: 'GET'
    }).then((resp) => this.setState({ blockedDates: resp.blockedDates }))
  }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment)
    const BAD_DATES = this.convertedDates()
    const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;
    return (
      <div className="container page-wraper">
        <NotificationContainer/>
        <h3 className='text-center'>Розклад поселення (Номер {this.state.room.number})</h3>
         <hr/>
        <div className='calendar-top'>
          <select className='form-control' value={this.state.room.id} onChange={(e) => this.handleRoomChange(e.target.value)}>
            { Object.keys(this.state.rooms).map((id, i) =>
              <option key={i} value={id}>Поверх {this.state.rooms[id].floor} | Номер {this.state.rooms[id].number} | Місць: {this.state.rooms[id].places} { this.state.rooms[id].bigBed && '| Двоспальне ліжко'}</option>
            )}
          </select>
          <button className='btn btn-info' onClick={() => this.handleModal('createModal')}><i className='fa fa-plus' /> Створити нове бронювання</button>
        </div>
        <hr/>
        <div className='room-calendar'>
          <createSlot waitForOutlet />
          <BigCalendar
            views={['month']}
            onNavigate={this.handleMonthChange}
            localizer={localizer}
            events={this.state.room.reservations}
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
                  initialVisibleMonth={() => moment(this.state.selectedMonth)}
                  onPickerApply={this.handleNewReservationDateChange}
                  startDate={this.state.newReservation.startDate}
                  endDate={this.state.newReservation.endDate}
                  getBlockedDates={this.getBlockedDates}
                  isDayBlocked={isDayBlocked}/>
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
                  { [...Array(parseInt(this.state.room.places, 10))].map((e,i) =>
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
                  onPickerApply={this.handleDateChange}
                  startDate={moment(this.state.selectedReservation.start).format('DD.MM.YYYY')}
                  endDate={moment(this.state.selectedReservation.end).format('DD.MM.YYYY')}
                  getBlockedDates={this.getBlockedDates}
                  isDayBlocked={isDayBlocked}/>
              </div>
              <div className='form-group'>
                <label>Ім'я</label>
                <input type='text' className='form-control' value={this.state.selectedReservation.title} onChange={(e) => this.handleReservationChange('title', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Телефон</label>
                <input type='text' className='form-control' value={this.state.selectedReservation.phone} onChange={(e) => this.handleReservationChange('phone', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Кількість місць</label>
                <select className='form-control' value={this.state.selectedReservation.places} onChange={(e) => this.handleReservationChange('places', e.target.value)}>
                  { [...Array(parseInt(this.state.room.places, 10))].map((e,i) =>
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
