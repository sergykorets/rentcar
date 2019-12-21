import React, {Fragment} from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { Tooltip, Modal, ModalHeader, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.state.loaded = true;
    // if (!this.state.admin) {
    //   ReactPixel.init('668734460178473');
    //   ReactGA.initialize('UA-116820611-2');
    //   ReactGA.ga('send', 'pageview', `/hotels`);
    //   ReactPixel.pageView();
    // }
  }

  render() {
    return (
      <Fragment>
        
        <section id="slider-area">
          <div className="single-slide-item overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <div className="book-a-car">
                    <form action="index.html">
                      <div className="pickup-location book-item">
                        <h4>PICK-UP LOCATION:</h4>
                        <select className="custom-select">
                          <option>Select</option>
                          <option value="1">Dhaka</option>
                          <option value="2">Comilla</option>
                          <option value="3">Barishal</option>
                          <option value="3">Rangpur</option>
                        </select>
                      </div>

                      <div className="pick-up-date book-item">
                        <h4>PICK-UP DATE:</h4>
                        <input id="startDate" placeholder="Pick Up Date" />

                        <div className="return-car">
                          <h4>Return DATE:</h4>
                          <input id="endDate" placeholder="Return Date" />
                        </div>
                      </div>

                      <div className="choose-car-type book-item">
                        <h4>CHOOSE CAR TYPE:</h4>
                        <select className="custom-select">
                          <option>Select</option>
                          <option value="1">BMW</option>
                          <option value="2">Audi</option>
                          <option value="3">Lexus</option>
                        </select>
                      </div>

                      <div className="book-button text-center">
                        <button className="book-now-btn">Book Now</button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-7 text-right">
                  <div className="display-table">
                    <div className="display-table-cell">
                      <div className="slider-right-text">
                        <h1>BOOK A CAR TODAY!</h1>
                        <p>FOR AS LOW AS $10 A DAY PLUS 15% DISCOUNT <br/> FOR OUR RETURNING CUSTOMERS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about-area" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title  text-center">
                  <h2>About us</h2>
                  <span className="title-line"><i className="fa fa-car"></i></span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="display-table">
                  <div className="display-table-cell">
                    <div className="about-content">
                      <p>Lorem simply dummy is a texted of the printing costed and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>

                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi aliquid debitis optio praesentium, voluptate repellat accusantium deserunt eius.</p>
                      <div className="about-btn">
                        <a href="#">Book a Car</a>
                        <a href="#">Contact Us</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="about-video">
                  <iframe src="https://player.vimeo.com/video/121982328?title=0&byline=0&portrait=0"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="partner-area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="partner-content-wrap">
                  <div className="single-partner">
                    <div className="display-table">
                      <div className="display-table-cell">
                        <img src="images/partner/partner-logo-1.png" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>

                  <div className="single-partner">
                    <div className="display-table">
                      <div className="display-table-cell">
                        <img src="images/partner/partner-logo-2.png" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>

                  <div className="single-partner">
                    <div className="display-table">
                      <div className="display-table-cell">
                        <img src="images/partner/partner-logo-3.png" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>

                  <div className="single-partner">
                    <div className="display-table">
                      <div className="display-table-cell">
                        <img src="images/partner/partner-logo-4.png" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>

                  <div className="single-partner">
                    <div className="display-table">
                      <div className="display-table-cell">
                        <img src="images/partner/partner-logo-5.png" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>

                  <div className="single-partner">
                    <div className="display-table">
                      <div className="display-table-cell">
                        <img src="images/partner/partner-logo-1.png" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>

                  <div className="single-partner">
                    <div className="display-table">
                      <div className="display-table-cell">
                        <img src="images/partner/partner-logo-4.png" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="service-area" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title  text-center">
                  <h2>Our Services</h2>
                  <span className="title-line"><i className="fa fa-car"></i></span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-lg-4 text-center">
                <div className="service-item">
                  <i className="fa fa-taxi"></i>
                  <h3>RENTAL CAR</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>
                </div>
              </div>

              <div className="col-lg-4 text-center">
                <div className="service-item">
                  <i className="fa fa-cog"></i>
                  <h3>CAR REPAIR</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>
                </div>
              </div>

              <div className="col-lg-4 text-center">
                <div className="service-item">
                  <i className="fa fa-map-marker"></i>
                  <h3>TAXI SERVICE</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>
                </div>
              </div>

              <div className="col-lg-4 text-center">
                <div className="service-item">
                  <i className="fa fa-life-ring"></i>
                  <h3>life insurance</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>
                </div>
              </div>

              <div className="col-lg-4 text-center">
                <div className="service-item">
                  <i className="fa fa-bath"></i>
                  <h3>car wash</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>
                </div>
              </div>

              <div className="col-lg-4 text-center">
                <div className="service-item">
                  <i className="fa fa-phone"></i>
                  <h3>call driver</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="funfact-area" className="overlay section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-11 col-md-12 m-auto">
                <div className="funfact-content-wrap">
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="single-funfact">
                        <div className="funfact-icon">
                          <i className="fa fa-smile-o"></i>
                        </div>
                        <div className="funfact-content">
                          <p><span className="counter">550</span>+</p>
                          <h4>HAPPY CLIENTS</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="single-funfact">
                        <div className="funfact-icon">
                          <i className="fa fa-car"></i>
                        </div>
                        <div className="funfact-content">
                          <p><span className="counter">250</span>+</p>
                          <h4>CARS IN STOCK</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="single-funfact">
                        <div className="funfact-icon">
                          <i className="fa fa-bank"></i>
                        </div>
                        <div className="funfact-content">
                          <p><span className="counter">50</span>+</p>
                          <h4>office in cities</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="choose-car" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title  text-center">
                  <h2>Choose your Car</h2>
                  <span className="title-line"><i className="fa fa-car"></i></span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="choose-content-wrap">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#popular_cars" role="tab" aria-selected="true">popular Cars</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" href="#newest_cars" role="tab" aria-selected="false">newest cars</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="contact-tab" data-toggle="tab" href="#office_map" role="tab" aria-selected="false">Our Office</a>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="popular_cars" role="tabpanel" aria-labelledby="home-tab">
                      <div className="popular-cars-wrap">
                        <div className="popucar-menu text-center">
                          <a href="#" data-filter="*" className="active">all</a>
                          <a href="#" data-filter=".con">Conver</a>
                          <a href="#" data-filter=".hat">Truck</a>
                          <a href="#" data-filter=".mpv">MPV</a>
                          <a href="#" data-filter=".sedan">Sedan</a>
                          <a href="#" data-filter=".suv">SUV</a>
                        </div>

                        <div className="row popular-car-gird">
                          <div className="col-lg-4 col-md-6 con suv mpv">
                            <div className="single-popular-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-1.jpg">
                                  <img src="images/car/car-1.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Dodge Ram 1500</a>
                                  <span className="price"><i className="fa fa-tag"></i> $55/day</span>
                                </h3>

                                <h5>HATCHBACK</h5>

                                <div className="p-car-feature">
                                  <a href="#">2017</a>
                                  <a href="#">manual</a>
                                  <a href="#">AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 hat sedan">
                            <div className="single-popular-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-2.jpg">
                                  <img src="images/car/car-2.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Dodge Ram 1500</a>
                                  <span className="price"><i className="fa fa-tag"></i> $55/day</span>
                                </h3>

                                <h5>HATCHBACK</h5>

                                <div className="p-car-feature">
                                  <a href="#">2017</a>
                                  <a href="#">manual</a>
                                  <a href="#">AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 suv con mpv">
                            <div className="single-popular-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-3.jpg">
                                  <img src="images/car/car-3.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Dodge Ram 1500</a>
                                  <span className="price"><i className="fa fa-tag"></i> $55/day</span>
                                </h3>

                                <h5>HATCHBACK</h5>

                                <div className="p-car-feature">
                                  <a href="#">2017</a>
                                  <a href="#">manual</a>
                                  <a href="#">AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 con hat">
                            <div className="single-popular-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-4.jpg">
                                  <img src="images/car/car-4.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Dodge Ram 1500</a>
                                  <span className="price"><i className="fa fa-tag"></i> $55/day</span>
                                </h3>

                                <h5>HATCHBACK</h5>

                                <div className="p-car-feature">
                                  <a href="#">2017</a>
                                  <a href="#">manual</a>
                                  <a href="#">AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 con sedan mpv">
                            <div className="single-popular-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-5.jpg">
                                  <img src="images/car/car-5.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Dodge Ram 1500</a>
                                  <span className="price"><i className="fa fa-tag"></i> $55/day</span>
                                </h3>

                                <h5>HATCHBACK</h5>

                                <div className="p-car-feature">
                                  <a href="#">2017</a>
                                  <a href="#">manual</a>
                                  <a href="#">AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 hat suv mpv">
                            <div className="single-popular-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-6.jpg">
                                  <img src="images/car/car-6.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Dodge Ram 1500</a>
                                  <span className="price"><i className="fa fa-tag"></i> $55/day</span>
                                </h3>

                                <h5>HATCHBACK</h5>

                                <div className="p-car-feature">
                                  <a href="#">2017</a>
                                  <a href="#">manual</a>
                                  <a href="#">AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="newest_cars" role="tabpanel" aria-labelledby="profile-tab">
                      <div className="popular-cars-wrap">
                        <div className="newcar-menu text-center">
                          <a href="#" data-filter="*" className="active">all</a>
                          <a href="#" data-filter=".toyota">toyota</a>
                          <a href="#" data-filter=".bmw">bmw</a>
                          <a href="#" data-filter=".audi">audi</a>
                          <a href="#" data-filter=".tata">Tata</a>
                        </div>


                        <div className="row newest-car-gird">
                          <div className="col-lg-4 col-md-6 tata audi">
                            <div className="single-new-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-6.jpg">
                                  <img src="images/car/car-6.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Toyota RAV4 EV</a>
                                  <span className="price"><i className="fa fa-tag"></i> $35/day</span>
                                </h3>

                                <h5>Toyota</h5>

                                <div className="p-car-feature">
                                  <a href="#">2018</a>
                                  <a href="#">Auto</a>
                                  <a href="#">Non AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 bmw tata toyota">
                            <div className="single-new-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-5.jpg">
                                  <img src="images/car/car-5.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Toyota RAV4 EV</a>
                                  <span className="price"><i className="fa fa-tag"></i> $35/day</span>
                                </h3>

                                <h5>Toyota</h5>

                                <div className="p-car-feature">
                                  <a href="#">2018</a>
                                  <a href="#">Auto</a>
                                  <a href="#">Non AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 bmw">
                            <div className="single-new-car">
                              <div className="p-car-thumbnails">
                                <a className="car-hover" href="images/car/car-4.jpg">
                                  <img src="images/car/car-4.jpg" alt="JSOFT"/>
                                </a>
                              </div>

                              <div className="p-car-content">
                                <h3>
                                  <a href="#">Toyota RAV4 EV</a>
                                  <span className="price"><i className="fa fa-tag"></i> $35/day</span>
                                </h3>

                                <h5>Toyota</h5>

                                <div className="p-car-feature">
                                  <a href="#">2018</a>
                                  <a href="#">Auto</a>
                                  <a href="#">Non AIR CONDITION</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="office_map" role="tabpanel" aria-labelledby="contact-tab">
                      <div className="map-area">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6538067244583!2d90.37092511435942!3d23.79533919297639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0cce3251ab1%3A0x7a2aa979862a9643!2sJSoft!5e0!3m2!1sen!2sbd!4v1516771096779"></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing-area" className="section-padding overlay">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title  text-center">
                  <h2>Only quality for clients</h2>
                  <span className="title-line"><i className="fa fa-car"></i></span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 text-center">
                <div className="single-pricing-table">
                  <h3>BUSINESS</h3>
                  <h2>$ 55.99</h2>
                  <h5>PER MONTH</h5>

                  <ul className="package-list">
                    <li>FREE VEHICLE DELIVERY</li>
                    <li>WEDDINGS CELEBRATIONS</li>
                    <li>FULL INSURANCE INCLUDED</li>
                    <li>TRANSPORT ABROAD</li>
                    <li>ALL INCLUSIVE MINI BAR</li>
                    <li>CHAUFFER INCLUDED IN PRICE</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 text-center">
                <div className="single-pricing-table">
                  <h3>Trial</h3>
                  <h2>Free</h2>
                  <h5>PER MONTH</h5>

                  <ul className="package-list">
                    <li>FREE VEHICLE DELIVERY</li>
                    <li>OTHER CELEBRATIONS</li>
                    <li>FULL INSURANCE</li>
                    <li>TRANSPORT ABROAD</li>
                    <li>MINI BAR</li>
                    <li>INCLUDED IN PRICE</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 text-center">
                <div className="single-pricing-table">
                  <h3>standard</h3>
                  <h2>$ 35.99</h2>
                  <h5>PER MONTH</h5>

                  <ul className="package-list">
                    <li>DELIVERY AT AIRPORT</li>
                    <li>WEDDINGS AND OTHER</li>
                    <li>FULL INCLUDED</li>
                    <li>TRANSPORT ABROAD</li>
                    <li>ALL MINI BAR</li>
                    <li>CHAUFFER PRICE</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonial-area" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title  text-center">
                  <h2>Testimonials</h2>
                  <span className="title-line"><i className="fa fa-car"></i></span>
                  <p>Lorem ipsum dolor sit amet elit.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8 col-md-12 m-auto">
                <div className="testimonial-content">
                  <div className="single-testimonial">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>
                    <h3>Vongchong Smith</h3>
                    <div className="client-logo">
                      <img src="images/client/client-pic-1.jpg" alt="JSOFT"/>
                    </div>
                  </div>

                  <div className="single-testimonial">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>
                    <h3>Amader Tuni</h3>
                    <div className="client-logo">
                      <img src="images/client/client-pic-3.jpg" alt="JSOFT"/>
                    </div>
                  </div>

                  <div className="single-testimonial">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>
                    <h3>Atex Tuntuni Smith</h3>
                    <div className="client-logo">
                      <img src="images/client/client-pic-2.jpg" alt="JSOFT"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tips-article-area" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title  text-center">
                  <h2>Tips and articles</h2>
                  <span className="title-line"><i className="fa fa-car"></i></span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <article className="single-article">
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="article-thumb">
                        <img src="images/article/arti-thumb-1.jpg" alt="JSOFT"/>
                      </div>
                    </div>

                    <div className="col-lg-7">
                      <div className="display-table">
                        <div className="display-table-cell">
                          <div className="article-body">
                            <h3><a href="article-details.html">Wliquam sit amet urna eullam</a></h3>
                            <div className="article-meta">
                              <a href="#" className="author">By :: <span>Admin</span></a>
                              <a href="#" className="commnet">Comments :: <span>10</span></a>
                            </div>

                            <div className="article-date">25 <span className="month">jan</span></div>

                            <p>Wlam aiber vestibulum fringilla oremedad ipsum dolor sit amet consectetur adipisicing elit sed doned eiusmod tempored incididunt ut labore et dolore magna aliquaa enimd ad minim veniad.</p>

                            <a href="article-details.html" className="readmore-btn">Read More <i className="fa fa-long-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-12">
                <article className="single-article middle">
                  <div className="row">

                    <div className="col-lg-5 d-xl-none">
                      <div className="article-thumb">
                        <img src="images/article/arti-thumb-2.jpg" alt="JSOFT"/>
                      </div>
                    </div>

                    <div className="col-lg-7">
                      <div className="display-table">
                        <div className="display-table-cell">
                          <div className="article-body">
                            <h3><a href="article-details.html">fringilla oremedad ipsum dolor sit</a></h3>
                            <div className="article-meta">
                              <a href="#" className="author">By :: <span>Admin</span></a>
                              <a href="#" className="commnet">Comments :: <span>10</span></a>
                            </div>

                            <div className="article-date">14<span className="month">feb</span></div>

                            <p>Wlam aiber vestibulum fringilla oremedad ipsum dolor sit amet consectetur adipisicing elit sed doned eiusmod tempored incididunt ut labore et dolore magna aliquaa enimd ad minim veniad.</p>

                            <a href="article-details.html" className="readmore-btn">Read More <i className="fa fa-long-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5 d-none d-xl-block">
                      <div className="article-thumb">
                        <img src="images/article/arti-thumb-2.jpg" alt="JSOFT"/>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-12">
                <article className="single-article">
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="article-thumb">
                        <img src="images/article/arti-thumb-3.jpg" alt="JSOFT"/>
                      </div>
                    </div>

                    <div className="col-lg-7">
                      <div className="display-table">
                        <div className="display-table-cell">
                          <div className="article-body">
                            <h3><a href="article-details.html">Tempored incididunt ut labore</a></h3>
                            <div className="article-meta">
                              <a href="#" className="author">By :: <span>Admin</span></a>
                              <a href="#" className="commnet">Comments :: <span>10</span></a>
                            </div>

                            <div className="article-date">17 <span className="month">feb</span></div>

                            <p>Wlam aiber vestibulum fringilla oremedad ipsum dolor sit amet consectetur adipisicing elit sed doned eiusmod tempored incididunt ut labore et dolore magna aliquaa enimd ad minim veniad.</p>

                            <a href="article-details.html" className="readmore-btn">Read More <i className="fa fa-long-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="footer-area">
          <div className="footer-widget-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="single-footer-widget">
                    <h2>About Us</h2>
                    <div className="widget-body">
                      <img src="images/logo.png" alt="JSOFT"/>
                        <p>Lorem ipsum dolored is a sit ameted consectetur adipisicing elit. Nobis magni assumenda distinctio debitis, eum fuga fugiat error reiciendis.</p>

                        <div className="newsletter-area">
                          <form action="index.html">
                            <input type="email" placeholder="Subscribe Our Newsletter" />
                              <button type="submit" className="newsletter-btn"><i className="fa fa-send"></i></button>
                          </form>
                        </div>

                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="single-footer-widget">
                    <h2>Recent Posts</h2>
                    <div className="widget-body">
                      <ul className="recent-post">
                        <li>
                          <a href="#">
                            Hello Bangladesh!
                            <i className="fa fa-long-arrow-right"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Lorem ipsum dolor sit amet
                            <i className="fa fa-long-arrow-right"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Hello Bangladesh!
                            <i className="fa fa-long-arrow-right"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            consectetur adipisicing elit?
                            <i className="fa fa-long-arrow-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="single-footer-widget">
                    <h2>get touch</h2>
                    <div className="widget-body">
                      <p>Lorem ipsum doloer sited amet, consectetur adipisicing elit. nibh auguea, scelerisque sed</p>

                      <ul className="get-touch">
                        <li><i className="fa fa-map-marker"></i> 800/8, Kazipara, Dhaka</li>
                        <li><i className="fa fa-mobile"></i> +880 01 86 25 72 43</li>
                        <li><i className="fa fa-envelope"></i> kazukamdu83@gmail.com</li>
                      </ul>
                      <a href="https://goo.gl/maps/b5mt45MCaPB2" className="map-show" target="_blank">Show Location</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <p>
                    Copyright &copy; 2019 All rights reserved
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="scroll-top">
          <img src="images/scroll-top.png" alt="JSOFT"/>
        </div>
      </Fragment>
    );
  }
}