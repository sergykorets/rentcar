import React, {Fragment} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ReactLoading from 'react-loading';

import FileDrop from './FileDrop';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: this.props.hotel || {
        name: '',
        description: '',
        phones: [
          {phone: ''}
        ],
        googlePhotos: [],
        photos: [],
        photosForUpload: [],
        price: '',
        site: '',
        mainPhotoId: '',
        mainPhotoType: '',
        hotelType: 'lodging'
      },
      validators: {
        file: false
      },
      photoLoading: false
    };
  }

  handleInputChange = (field, value) => {
    this.setState({
      hotel: {
        ...this.state.hotel,
        [field]: value
      }
    })
  }

  handleEditorChange = (content) => {
    this.setState({
      hotel: {
        ...this.state.hotel,
        description: content
      }
    })
  }

  handlePhoneChange = (i, value) => {
    const phones = this.state.hotel.phones;
    phones[i].phone = value;
    this.setState({
      hotel: {
        ...this.state.hotel,
        phones: phones
      }
    })
  }

  addPhone = () => {
    this.setState({
      hotel: {
        ...this.state.hotel,
        phones: [...this.state.hotel.phones, {phone: ''}]
      }
    })
  }

  deleteItem = (item, i) => {
    //debugger
    if (this.state.hotel[item][i].id) {
      const items = this.state.hotel[item];
      items[i] = {id: items[i].id, _destroy: '1'};
      this.setState({
        hotel: {
          ...this.state.hotel,
          [item]: items
        }
      })
    } else {
      var array = [...this.state.hotel[item]]
      var index = array.indexOf(this.state.hotel[item][i])
      array.splice(index, 1)
      this.setState({
        hotel: {
          ...this.state.hotel,
          [item]: array
        }
      });
    }
  }

  handleSubmit = () => {
    const type = this.state.hotel.id ? 'PATCH' : 'POST'
    const url = this.state.hotel.id ? `/hotels/${this.state.hotel.id}.json` : '/hotels.json'
    $.ajax({
      url: url,
      type: type,
      data: {
        hotel: {
          id: this.state.hotel.id,
          name: this.state.hotel.name,
          description: this.state.hotel.description,
          site: this.state.hotel.site,
          hotel_type: this.state.hotel.hotelType,
          price: this.state.hotel.price,
          main_photo_id: this.state.hotel.mainPhotoId,
          main_photo_type: this.state.hotel.mainPhotoType,
          phones_attributes: this.state.hotel.phones,
          google_photos_attributes: this.state.hotel.googlePhotos,
          photos_attributes: this.state.hotel.photos
        }
      },
      success: (resp) => {
        if (resp.success) {
          window.location.href = `/hotels/${resp.hotel.id}`
        } else {
          window.location.reload()
        }
      }
    });
  }

  onDrop = (name, file) => {
    if (file.length > 0) {
      this.setState({
        validators: {
          ...this.state.validators,
          file: true
        },
        hotel: {
          ...this.state.hotel,
          photosForUpload: file
        }
      });
    }
  }

  isValid = () => {
    return this.state.validators.file
  }

  handleSubmitPhotos = () => {
    this.setState({photoLoading: true})
    const files = this.state.hotel.photosForUpload
    if(this.isValid()){
      var formData = new FormData();
      files.map((file) => {
        formData.append('hotel[photos_attributes][photo][picture]', file, file.name);
        $.ajax({
          url: `/hotels/${this.state.hotel.id}.json`,
          type: 'PATCH',
          data: formData,
          dataType: 'json',
          cache: false,
          processData: false,
          contentType: false,
          success: (resp) => {
            window.location.reload()
          }})
      });
    }
  }

  handleMainPhoto = (type, value) => {
    this.setState({
      hotel: {
        ...this.state.hotel,
        mainPhotoId: value,
        mainPhotoType: type
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className='hotel-form'>
        <div className='form-group'>
          <label>Тип</label>
          <div className='custom-checkbox'>
            <div className='custom-checkbox'>
              <input type='radio' id="lodging" onChange={(e) => this.handleInputChange('hotelType', 'lodging')} checked={this.state.hotel.hotelType === 'lodging'} />
              <label htmlFor="lodging">Готель</label>
            </div>
            <div className='custom-checkbox'>
              <input type='radio' id="restaurant" onChange={(e) => this.handleInputChange('hotelType', 'restaurant')} checked={this.state.hotel.hotelType === 'restaurant'} />
              <label htmlFor="restaurant">Кафе</label>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label>Назва</label>
          <input type='text' placeholder='Напишіть назву Вашого закладу' className='form-control' onChange={(e) => this.handleInputChange('name', e.target.value)} value={this.state.hotel.name} />
        </div>
        <div className='form-group'>
          <label>Опис</label>
          <Editor
            apiKey="yfe3680kik77oexnpok1ucmxm93eni5nxnalbvn6qz1kf9la"
            init={{ plugins: "textcolor colorpicker", toolbar: "forecolor backcolor" }}
            initialValue={this.state.hotel.description}
            onEditorChange={this.handleEditorChange}
          />
        </div>
        <div className='form-group'>
          <label>Номери телефонів</label>
          { this.state.hotel.phones.map((phone, i) => {
            if (!phone._destroy) {
              return (
                <div className='phone-form' key={i}>
                  <input type='text' placeholder='380 XX XXX XX XX' className='form-control' onChange={(e) =>this.handlePhoneChange(i, e.target.value)} value={this.state.hotel.phones[i].phone} />
                  <i className='fa fa-trash-o fa-2x float-right' onClick={() => this.deleteItem('phones', i)} />
                </div>
              )}})}
        </div>
        <div className='form-group'>
          <i className='fa fa-plus btn btn-info' onClick={this.addPhone}> Додати телефон</i>
        </div>
        <div className='form-group'>
          <label>Мінімальна ціна за одну ніч з однієї людини (ГРН)</label>
          <input type='number' placeholder='200' className='form-control' onChange={(e) => this.handleInputChange('price', e.target.value)} value={this.state.hotel.price} />
        </div>
        <div className='form-group'>
          <label>Офіційний веб-сайт</label>
          <input type='text' placeholder='http://myhotel.com' className='form-control' onChange={(e) => this.handleInputChange('site', e.target.value)} value={this.state.hotel.site} />
        </div>
        { this.state.hotel.id &&
          <div className='form-group'>
            <label>Фото</label>
            <FileDrop
              onDrop={this.onDrop}
              acceptedFiles='image/*'
              maxSize={4000000}
              file={this.state.hotel.photos[0]}
              name='file'
            />
            <hr/>
            { this.state.hotel.photosForUpload.length > 0 &&
              <Fragment>
                { this.state.photoLoading ?
                  <div className='loader-wrap'>
                    <ReactLoading type='spin' color='green' height={200} width={200} />
                  </div>
                  :
                  <Fragment>
                    <div id='hotels_ul'>
                      { this.state.hotel.photosForUpload.filter(p => !p._destroy).map((item, i) => {
                        return (
                          <div className='hotel' key={i}>
                            <div className="card">
                              <div className="card-img">
                                <img src={item.preview} alt={this.state.hotel.name}/>
                              </div>
                              <div className="card-body">
                                <div className='custom-checkbox'>
                                </div>
                                <i className='fa fa-trash-o' onClick={() => this.deleteItem('photosForUpload', i)} />
                              </div>
                            </div>
                          </div>
                        )})}
                    </div>
                    <div className='form-group photo-save'>
                      <button className='btn btn-dark' onClick={this.handleSubmitPhotos}>Зберегти фото</button>
                    </div>
                  </Fragment>}
                <hr/>
              </Fragment>}
            { this.state.hotel.photos.length > 0 &&
              <Fragment>
                <div id='hotels_ul'>
                  { this.state.hotel.photos.filter(p => !p._destroy).map((item, i) => {
                    return (
                      <div className='hotel' key={i}>
                        <div className="card">
                          <div className="card-img">
                            <img src={item.photo} alt={this.state.hotel.name}/>
                          </div>
                          <div className="card-body">
                            <div className='custom-checkbox'>
                              <input
                                type='checkbox'
                                id="mainPhotoId"
                                onChange={() => this.handleMainPhoto('Photos', item.id)}
                                checked={this.state.hotel.mainPhotoType === 'Photos' && this.state.hotel.mainPhotoId === item.id} />
                              <label htmlFor="mainPhotoId">Головне фото</label>
                            </div>
                            <i className='fa fa-trash-o' onClick={() => this.deleteItem('photos', i)} />
                          </div>
                        </div>
                      </div>
                    )})}
                </div>
                <hr/>
              </Fragment>}
            { this.state.hotel.googlePhotos.length > 0 &&
              <div id='hotels_ul'>
                { this.state.hotel.googlePhotos.filter(p => !p._destroy).map((item, i) => {
                  return (
                    <div className='hotel' key={i}>
                      <div className="card">
                        <div className="card-img">
                          <img src={item.photo} alt={this.state.hotel.name}/>
                        </div>
                        <div className="card-body">
                          <div className='custom-checkbox'>
                            <input
                              type='checkbox'
                              id="mainGooglePhotoId"
                              onChange={() => this.handleMainPhoto('GooglePhotos', item.id)}
                              checked={this.state.hotel.mainPhotoType === 'GooglePhotos' && this.state.hotel.mainPhotoId === item.id} />
                            <label htmlFor="mainGooglePhotoId">Головне фото</label>
                          </div>
                          <i className='fa fa-trash-o' onClick={() => this.deleteItem('googlePhotos', i)} />
                        </div>
                      </div>
                    </div>
                  )})}
              </div>}
          </div>}
        <div className='form-group'>
          <button className='btn btn-dark' onClick={this.handleSubmit}>Зберегти</button>
        </div>
      </div>
    );
  }
}
