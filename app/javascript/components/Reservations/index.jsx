import React, {Fragment} from 'react';
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AirBnbPicker from "../common/AirBnbPicker";

export default class Reservations extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('uk');

    this.state = {
      hotelId: this.props.hotelId,
      floors: this.props.floors,
      rooms: this.props.rooms,
      startDate: moment(new Date),
      endDate: moment(new Date).add(1, 'days'),
      floor: 'all',
      name: '',
      phone: '',
      places: 1,
      description: '',
      deposit: '',
      createModal: false,
      editModal: false,
      selectedRoomId: ''
    }
  }

  handleDateChange = ({startDate, endDate}) => {
    $.ajax({
      url: `/hotels/${this.props.hotelId}/reservations/dates.json`,
      type: 'GET',
      data: {
        floor: this.state.floor,
        start_date: startDate ? startDate.format('DD.MM.YYYY') : null,
        end_date: endDate ? endDate.format('DD.MM.YYYY') : null
      },
      success: (resp) => {
        this.setState({startDate: startDate, endDate: endDate, rooms: resp.rooms})
      }
    });
  }

  handleInputChange = (field, value) => {
    this.setState({[field]: value})
  }

  handleModal = (modal, id) => {
    if (this.state.startDate && this.state.endDate) {
      this.setState({
        [modal]: !this.state[modal],
        selectedRoomId: id,
        places: id ? this.state.rooms[id].places : 1
      })
    } else {
      NotificationManager.error('Задайте дати заїзду і виїзду', 'Неможливо перейти до бронювань');
    }
  }

  handleFloorChange = (floor) => {
    $.ajax({
      url: `/hotels/${this.props.hotelId}/reservations/dates.json`,
      type: 'GET',
      data: {
        floor: floor,
        start_date: this.state.startDate.format('DD.MM.YYYY'),
        end_date: this.state.endDate.format('DD.MM.YYYY')
      },
      success: (resp) => {
        this.setState({floor: floor, rooms: resp.rooms})
      }
    });
  }

  handleSubmitReservation = () => {
    $.ajax({
      url: `/hotels/${this.state.hotelId}/reservations.json`,
      type: 'POST',
      data: {
        reservation: {
          hotel_id: this.state.hotelId,
          floor: this.state.floor,
          room_id: this.state.selectedRoomId,
          name: this.state.name,
          phone: this.state.phone,
          status: 'approved',
          description: this.state.description,
          deposit: this.state.deposit,
          places: this.state.places,
          start_date: this.state.startDate.format('DD.MM.YYYY'),
          end_date: this.state.endDate.format('DD.MM.YYYY')
        }
      }
    }).then((resp) => {
      if (resp.success) {
        NotificationManager.success('Бронювання створено');
        this.setState({rooms: resp.rooms, createModal: false, name: '', phone: '', places: 1, description: ''})
      } else {
        NotificationManager.error(resp.error, 'Неможливо створити');
      }
    });
  }

  roomColor = (id) => {
    const room = this.state.rooms[id]
    const reservations = Object.keys(room.reservations)
    if (reservations.length > 0) {
      const places = reservations.map((reservation, i) => room.reservations[reservation].places).reduce((a, b) => a + b, 0)
      if (places < room.places) {
        return 'yellow'
      } else {
        return 'red'
      }
    } else {
      return 'green'
    }
  }

  handleReservationChange = (id, field, value) => {
    this.setState({
      ...this.state,
      rooms: {
        ...this.state.rooms,
        [this.state.selectedRoomId]: {
          ...this.state.rooms[this.state.selectedRoomId],
          reservations: {
            ...this.state.rooms[this.state.selectedRoomId].reservations,
            [id]: {
              ...this.state.rooms[this.state.selectedRoomId].reservations[id],
              [field]: value
            }
          }
        }
      }
    })
  }

  handleSubmitEditReservation = () => {
    $.ajax({
      url: `/hotels/${this.state.hotelId}/rooms/${this.state.selectedRoomId}.json?floor=${this.state.floor}`,
      type: 'PATCH',
      data: {
        room: {
          reservations_attributes: this.state.rooms[this.state.selectedRoomId].reservations
        },
        start_date: this.state.startDate.format('DD.MM.YYYY'),
        end_date: this.state.endDate.format('DD.MM.YYYY')
      }
    }).then((resp) => {
      if (resp.success) {
        NotificationManager.success('Бронювання оновлено');
        this.setState({rooms: resp.rooms, editModal: false})
      } else {
        NotificationManager.error(resp.error, 'Неможливо створити');
      }
    });
  }

  deleteReservation = (id) => {
    if (confirm('Видалити дане бронювання?')) {
      $.ajax({
        url: `/hotels/${this.state.hotelId}/reservations/${id}.json`,
        type: 'DELETE',
        data: {
          floor: this.state.floor,
          start_date: this.state.startDate.format('DD.MM.YYYY'),
          end_date: this.state.endDate.format('DD.MM.YYYY')
        }
      }).then((resp) => {
        NotificationManager.success('Бронювання видалено');
        this.setState({rooms: resp.rooms, editModal: false})
      });
    }
  }

  render() {
    return (
      <div className="container reservations page-wraper">
        <NotificationContainer/>
        <h3 className='text-center'>Наявність вільних номерів</h3>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='form-group'>
              <label>Дати перебування</label>
              <AirBnbPicker
                onPickerApply={this.handleDateChange}
                startDate={this.state.startDate}
                endDate={this.state.endDate} />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label>Поверх</label>
              <select className='form-control' value={this.state.floor} onChange={(e) => this.handleFloorChange(e.target.value)}>
                <option value='all'>Всі поверхи</option>
                {[...Array(parseInt(this.state.floors, 10))].map((e,i) =>
                  <option key={i} value={i+1}>Поверх {i+1}</option>
                )}
              </select>
            </div>
          </div>
        </div>
        <hr/>
        <div className='row'>
          { Object.values(this.state.rooms).sort((a,b) => a.number - b.number).map((item) => {
            return (
              <div key={item.id} className='col-lg-6 mb-4'>
                <div className={'room ' + this.roomColor(item.id)}>
                  <h4 className='float-right'>
                    <strong>
                      { this.roomColor(item.id) === 'red' && 'Зайнятий'}
                      { this.roomColor(item.id) === 'yellow' && 'Частково зайнятий'}
                      { this.roomColor(item.id) === 'green' && 'Вільний'}
                    </strong>
                  </h4>
                  <h3><b>Номер {this.state.rooms[item.id].number}</b></h3>
                  <p>Кількість місць: {this.state.rooms[item.id].places}</p>
                  { this.roomColor(item.id) === 'yellow' && <p>Кількість заброньованих місць: {this.state.rooms[item.id].booked}</p>}
                  { this.roomColor(item.id) != 'red' &&
                    <button className='btn btn-dark' onClick={() => this.handleModal('createModal', item.id)}>Забронювати</button>}
                  { this.roomColor(item.id) != 'green' &&
                    <button className='btn btn-outline-info' onClick={() => this.handleModal('editModal', item.id)}>Редагувати бронь</button>}
                </div>
              </div>
            )})}
        </div>
        { this.state.createModal &&
          <Modal isOpen={this.state.createModal} toggle={() => this.handleModal('createModal', '')}>
            <ModalHeader className='text-center' toggle={() => this.handleModal('createModal', '')}>
              <Fragment>Створення бронювання (Номер {this.state.rooms[this.state.selectedRoomId].number})</Fragment><br/>
              <Fragment>{`від ${this.state.startDate.format('DD.MM.YYYY')} до ${this.state.endDate.format('DD.MM.YYYY')}`}</Fragment>
            </ModalHeader>
            <div className='reservation-form'>
              <div className='form-group'>
                <label>Ім'я</label>
                <input type='text' className='form-control' value={this.state.name} onChange={(e) => this.handleInputChange('name', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Телефон</label>
                <input type='text' className='form-control' value={this.state.phone} onChange={(e) => this.handleInputChange('phone', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Кількість місць</label>
                <select className='form-control' value={this.state.places} onChange={(e) => this.handleInputChange('places', e.target.value)}>
                  { [...Array(parseInt(this.state.rooms[this.state.selectedRoomId].places, 10))].map((e,i) =>
                    <option key={i} value={i+1}>{i+1}</option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label>Додаткова iнформацiя</label>
                <textarea type='text' className='form-control' value={this.state.description} onChange={(e) => this.handleInputChange('description', e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Завдаток</label>
                <input type='number' className='form-control' value={this.state.deposit} onChange={(e) => this.handleInputChange('deposit', e.target.value)} />
              </div>
            </div>
            <ModalFooter>
              <button className='btn btn-block btn-outline-info reservation-btn' onClick={this.handleSubmitReservation}>Створити</button>
            </ModalFooter>
          </Modal>}
        { this.state.editModal &&
          <Modal isOpen={this.state.editModal} toggle={() => this.handleModal('editModal', '')}>
            <ModalHeader className='text-center' toggle={() => this.handleModal('editModal', '')}>
              <Fragment>Номер {this.state.rooms[this.state.selectedRoomId].number}</Fragment><br/>
              <Fragment>Поточні бронювання {`від ${this.state.startDate.format('DD.MM.YYYY')} до ${this.state.endDate.format('DD.MM.YYYY')}`}</Fragment>
            </ModalHeader>
            { Object.keys(this.state.rooms[this.state.selectedRoomId].reservations).map((r, i) => {
              const reservation = this.state.rooms[this.state.selectedRoomId].reservations[r]
              return (
                <div className='reservation-form' key={i}>
                  <i className='fa fa-trash-o float-right' onClick={() => this.deleteReservation(r)} />
                  <div className='form-group'>
                    <label>Ім'я</label>
                    <input type='text' className='form-control' value={reservation.name} onChange={(e) => this.handleReservationChange(r, 'name', e.target.value)} />
                  </div>
                  <div className='form-group'>
                    <label>Телефон</label>
                    <input type='text' className='form-control' value={reservation.phone} onChange={(e) => this.handleReservationChange(r, 'phone', e.target.value)} />
                  </div>
                  <div className='form-group'>
                    <label>Кількість місць</label>
                    <select className='form-control' value={reservation.places} onChange={(e) => this.handleReservationChange(r, 'places', e.target.value)}>
                      { [...Array(parseInt(this.state.rooms[this.state.selectedRoomId].places, 10))].map((e,i) =>
                        <option key={i} value={i+1}>{i+1}</option>
                      )}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Додаткова iнформацiя</label>
                    <textarea type='text' className='form-control' value={reservation.description} onChange={(e) => this.handleReservationChange(r, 'description', e.target.value)} />
                  </div>
                  <div className='form-group'>
                    <label>Дати</label>
                    <AirBnbPicker
                      disabled={true}
                      startDate={reservation.startDate}
                      endDate={reservation.endDate} />
                  </div>
                </div>
              )})}
            <ModalFooter>
              <button className='btn btn-block btn-outline-info reservation-btn' onClick={this.handleSubmitEditReservation}>Редагувати</button>
            </ModalFooter>
          </Modal>}
      </div>
    );
  }
}
