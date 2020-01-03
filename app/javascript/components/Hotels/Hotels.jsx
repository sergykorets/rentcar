import React, {Fragment} from 'react';
import Masonry from 'react-masonry-css';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { Tooltip, Modal, ModalHeader, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      categories: this.props.categories
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

        <section id="choose-car" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title  text-center">
                  <h2>Наш автопарк</h2>
                  <span className="title-line"><i className="fa fa-car"></i></span>
                </div>
              </div>
            </div>

            <Masonry breakpointCols={{default: 4, 1100: 3, 700: 2, 500: 1}}>
              { this.state.categories.map((category, index) => {
                return (
                  <div className="category" key={index}>
                    <div className="single-popular-car">
                      <div className="p-car-thumbnails">
                        <a className="car-hover" href={`/categories/${category.slug}`}>
                          <img src={category.photo} alt="JSOFT"/>
                        </a>
                      </div>

                      <div className="p-car-content">
                        <h3>
                          <a href={`/categories/${category.slug}`}>{category.name}</a>
                        </h3>

                        <h5>{category.description}</h5>
                      </div>
                    </div>
                  </div>)})}
            </Masonry>
          </div>
        </section>

        {/*<section id="about-area" className="section-padding">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-lg-12">*/}
        {/*        <div className="section-title  text-center">*/}
        {/*          <h2>About us</h2>*/}
        {/*          <span className="title-line"><i className="fa fa-car"></i></span>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*    <div className="row">*/}
        {/*      <div className="col-lg-6">*/}
        {/*        <div className="display-table">*/}
        {/*          <div className="display-table-cell">*/}
        {/*            <div className="about-content">*/}
        {/*              <p>Lorem simply dummy is a texted of the printing costed and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>*/}

        {/*              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi aliquid debitis optio praesentium, voluptate repellat accusantium deserunt eius.</p>*/}
        {/*              <div className="about-btn">*/}
        {/*                <a href="#">Book a Car</a>*/}
        {/*                <a href="#">Contact Us</a>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-6">*/}
        {/*        <div className="about-video">*/}
        {/*          <iframe src="https://player.vimeo.com/video/121982328?title=0&byline=0&portrait=0"></iframe>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<div id="partner-area">*/}
        {/*  <div className="container-fluid">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-lg-12 text-center">*/}
        {/*        <div className="partner-content-wrap">*/}
        {/*          <div className="single-partner">*/}
        {/*            <div className="display-table">*/}
        {/*              <div className="display-table-cell">*/}
        {/*                <img src="images/partner/partner-logo-1.png" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-partner">*/}
        {/*            <div className="display-table">*/}
        {/*              <div className="display-table-cell">*/}
        {/*                <img src="images/partner/partner-logo-2.png" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-partner">*/}
        {/*            <div className="display-table">*/}
        {/*              <div className="display-table-cell">*/}
        {/*                <img src="images/partner/partner-logo-3.png" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-partner">*/}
        {/*            <div className="display-table">*/}
        {/*              <div className="display-table-cell">*/}
        {/*                <img src="images/partner/partner-logo-4.png" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-partner">*/}
        {/*            <div className="display-table">*/}
        {/*              <div className="display-table-cell">*/}
        {/*                <img src="images/partner/partner-logo-5.png" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-partner">*/}
        {/*            <div className="display-table">*/}
        {/*              <div className="display-table-cell">*/}
        {/*                <img src="images/partner/partner-logo-1.png" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-partner">*/}
        {/*            <div className="display-table">*/}
        {/*              <div className="display-table-cell">*/}
        {/*                <img src="images/partner/partner-logo-4.png" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<section id="service-area" className="section-padding">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-lg-12">*/}
        {/*        <div className="section-title  text-center">*/}
        {/*          <h2>Our Services</h2>*/}
        {/*          <span className="title-line"><i className="fa fa-car"></i></span>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}


        {/*    <div className="row">*/}
        {/*      <div className="col-lg-4 text-center">*/}
        {/*        <div className="service-item">*/}
        {/*          <i className="fa fa-taxi"></i>*/}
        {/*          <h3>RENTAL CAR</h3>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-4 text-center">*/}
        {/*        <div className="service-item">*/}
        {/*          <i className="fa fa-cog"></i>*/}
        {/*          <h3>CAR REPAIR</h3>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-4 text-center">*/}
        {/*        <div className="service-item">*/}
        {/*          <i className="fa fa-map-marker"></i>*/}
        {/*          <h3>TAXI SERVICE</h3>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-4 text-center">*/}
        {/*        <div className="service-item">*/}
        {/*          <i className="fa fa-life-ring"></i>*/}
        {/*          <h3>life insurance</h3>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-4 text-center">*/}
        {/*        <div className="service-item">*/}
        {/*          <i className="fa fa-bath"></i>*/}
        {/*          <h3>car wash</h3>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-4 text-center">*/}
        {/*        <div className="service-item">*/}
        {/*          <i className="fa fa-phone"></i>*/}
        {/*          <h3>call driver</h3>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit admollitia.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section id="funfact-area" className="overlay section-padding">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-lg-11 col-md-12 m-auto">*/}
        {/*        <div className="funfact-content-wrap">*/}
        {/*          <div className="row">*/}
        {/*            <div className="col-lg-4 col-md-6">*/}
        {/*              <div className="single-funfact">*/}
        {/*                <div className="funfact-icon">*/}
        {/*                  <i className="fa fa-smile-o"></i>*/}
        {/*                </div>*/}
        {/*                <div className="funfact-content">*/}
        {/*                  <p><span className="counter">550</span>+</p>*/}
        {/*                  <h4>HAPPY CLIENTS</h4>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*            <div className="col-lg-4 col-md-6">*/}
        {/*              <div className="single-funfact">*/}
        {/*                <div className="funfact-icon">*/}
        {/*                  <i className="fa fa-car"></i>*/}
        {/*                </div>*/}
        {/*                <div className="funfact-content">*/}
        {/*                  <p><span className="counter">250</span>+</p>*/}
        {/*                  <h4>CARS IN STOCK</h4>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*            <div className="col-lg-4 col-md-6">*/}
        {/*              <div className="single-funfact">*/}
        {/*                <div className="funfact-icon">*/}
        {/*                  <i className="fa fa-bank"></i>*/}
        {/*                </div>*/}
        {/*                <div className="funfact-content">*/}
        {/*                  <p><span className="counter">50</span>+</p>*/}
        {/*                  <h4>office in cities</h4>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section id="pricing-area" className="section-padding overlay">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-lg-12">*/}
        {/*        <div className="section-title  text-center">*/}
        {/*          <h2>Only quality for clients</h2>*/}
        {/*          <span className="title-line"><i className="fa fa-car"></i></span>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*    <div className="row">*/}
        {/*      <div className="col-lg-4 col-md-6 text-center">*/}
        {/*        <div className="single-pricing-table">*/}
        {/*          <h3>BUSINESS</h3>*/}
        {/*          <h2>$ 55.99</h2>*/}
        {/*          <h5>PER MONTH</h5>*/}

        {/*          <ul className="package-list">*/}
        {/*            <li>FREE VEHICLE DELIVERY</li>*/}
        {/*            <li>WEDDINGS CELEBRATIONS</li>*/}
        {/*            <li>FULL INSURANCE INCLUDED</li>*/}
        {/*            <li>TRANSPORT ABROAD</li>*/}
        {/*            <li>ALL INCLUSIVE MINI BAR</li>*/}
        {/*            <li>CHAUFFER INCLUDED IN PRICE</li>*/}
        {/*          </ul>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-4 col-md-6 text-center">*/}
        {/*        <div className="single-pricing-table">*/}
        {/*          <h3>Trial</h3>*/}
        {/*          <h2>Free</h2>*/}
        {/*          <h5>PER MONTH</h5>*/}

        {/*          <ul className="package-list">*/}
        {/*            <li>FREE VEHICLE DELIVERY</li>*/}
        {/*            <li>OTHER CELEBRATIONS</li>*/}
        {/*            <li>FULL INSURANCE</li>*/}
        {/*            <li>TRANSPORT ABROAD</li>*/}
        {/*            <li>MINI BAR</li>*/}
        {/*            <li>INCLUDED IN PRICE</li>*/}
        {/*          </ul>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-4 col-md-6 text-center">*/}
        {/*        <div className="single-pricing-table">*/}
        {/*          <h3>standard</h3>*/}
        {/*          <h2>$ 35.99</h2>*/}
        {/*          <h5>PER MONTH</h5>*/}

        {/*          <ul className="package-list">*/}
        {/*            <li>DELIVERY AT AIRPORT</li>*/}
        {/*            <li>WEDDINGS AND OTHER</li>*/}
        {/*            <li>FULL INCLUDED</li>*/}
        {/*            <li>TRANSPORT ABROAD</li>*/}
        {/*            <li>ALL MINI BAR</li>*/}
        {/*            <li>CHAUFFER PRICE</li>*/}
        {/*          </ul>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section id="testimonial-area" className="section-padding">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-lg-12">*/}
        {/*        <div className="section-title  text-center">*/}
        {/*          <h2>Testimonials</h2>*/}
        {/*          <span className="title-line"><i className="fa fa-car"></i></span>*/}
        {/*          <p>Lorem ipsum dolor sit amet elit.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*    <div className="row">*/}
        {/*      <div className="col-lg-8 col-md-12 m-auto">*/}
        {/*        <div className="testimonial-content">*/}
        {/*          <div className="single-testimonial">*/}
        {/*            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>*/}
        {/*            <h3>Vongchong Smith</h3>*/}
        {/*            <div className="client-logo">*/}
        {/*              <img src="images/client/client-pic-1.jpg" alt="JSOFT"/>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-testimonial">*/}
        {/*            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>*/}
        {/*            <h3>Amader Tuni</h3>*/}
        {/*            <div className="client-logo">*/}
        {/*              <img src="images/client/client-pic-3.jpg" alt="JSOFT"/>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className="single-testimonial">*/}
        {/*            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>*/}
        {/*            <h3>Atex Tuntuni Smith</h3>*/}
        {/*            <div className="client-logo">*/}
        {/*              <img src="images/client/client-pic-2.jpg" alt="JSOFT"/>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section id="tips-article-area" className="section-padding">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-lg-12">*/}
        {/*        <div className="section-title  text-center">*/}
        {/*          <h2>Tips and articles</h2>*/}
        {/*          <span className="title-line"><i className="fa fa-car"></i></span>*/}
        {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*    <div className="row">*/}
        {/*      <div className="col-lg-12">*/}
        {/*        <article className="single-article">*/}
        {/*          <div className="row">*/}
        {/*            <div className="col-lg-5">*/}
        {/*              <div className="article-thumb">*/}
        {/*                <img src="images/article/arti-thumb-1.jpg" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*            <div className="col-lg-7">*/}
        {/*              <div className="display-table">*/}
        {/*                <div className="display-table-cell">*/}
        {/*                  <div className="article-body">*/}
        {/*                    <h3><a href="article-details.html">Wliquam sit amet urna eullam</a></h3>*/}
        {/*                    <div className="article-meta">*/}
        {/*                      <a href="#" className="author">By :: <span>Admin</span></a>*/}
        {/*                      <a href="#" className="commnet">Comments :: <span>10</span></a>*/}
        {/*                    </div>*/}

        {/*                    <div className="article-date">25 <span className="month">jan</span></div>*/}

        {/*                    <p>Wlam aiber vestibulum fringilla oremedad ipsum dolor sit amet consectetur adipisicing elit sed doned eiusmod tempored incididunt ut labore et dolore magna aliquaa enimd ad minim veniad.</p>*/}

        {/*                    <a href="article-details.html" className="readmore-btn">Read More <i className="fa fa-long-arrow-right"></i></a>*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </article>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-12">*/}
        {/*        <article className="single-article middle">*/}
        {/*          <div className="row">*/}

        {/*            <div className="col-lg-5 d-xl-none">*/}
        {/*              <div className="article-thumb">*/}
        {/*                <img src="images/article/arti-thumb-2.jpg" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*            <div className="col-lg-7">*/}
        {/*              <div className="display-table">*/}
        {/*                <div className="display-table-cell">*/}
        {/*                  <div className="article-body">*/}
        {/*                    <h3><a href="article-details.html">fringilla oremedad ipsum dolor sit</a></h3>*/}
        {/*                    <div className="article-meta">*/}
        {/*                      <a href="#" className="author">By :: <span>Admin</span></a>*/}
        {/*                      <a href="#" className="commnet">Comments :: <span>10</span></a>*/}
        {/*                    </div>*/}

        {/*                    <div className="article-date">14<span className="month">feb</span></div>*/}

        {/*                    <p>Wlam aiber vestibulum fringilla oremedad ipsum dolor sit amet consectetur adipisicing elit sed doned eiusmod tempored incididunt ut labore et dolore magna aliquaa enimd ad minim veniad.</p>*/}

        {/*                    <a href="article-details.html" className="readmore-btn">Read More <i className="fa fa-long-arrow-right"></i></a>*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*            <div className="col-lg-5 d-none d-xl-block">*/}
        {/*              <div className="article-thumb">*/}
        {/*                <img src="images/article/arti-thumb-2.jpg" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </article>*/}
        {/*      </div>*/}

        {/*      <div className="col-lg-12">*/}
        {/*        <article className="single-article">*/}
        {/*          <div className="row">*/}
        {/*            <div className="col-lg-5">*/}
        {/*              <div className="article-thumb">*/}
        {/*                <img src="images/article/arti-thumb-3.jpg" alt="JSOFT"/>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*            <div className="col-lg-7">*/}
        {/*              <div className="display-table">*/}
        {/*                <div className="display-table-cell">*/}
        {/*                  <div className="article-body">*/}
        {/*                    <h3><a href="article-details.html">Tempored incididunt ut labore</a></h3>*/}
        {/*                    <div className="article-meta">*/}
        {/*                      <a href="#" className="author">By :: <span>Admin</span></a>*/}
        {/*                      <a href="#" className="commnet">Comments :: <span>10</span></a>*/}
        {/*                    </div>*/}

        {/*                    <div className="article-date">17 <span className="month">feb</span></div>*/}

        {/*                    <p>Wlam aiber vestibulum fringilla oremedad ipsum dolor sit amet consectetur adipisicing elit sed doned eiusmod tempored incididunt ut labore et dolore magna aliquaa enimd ad minim veniad.</p>*/}

        {/*                    <a href="article-details.html" className="readmore-btn">Read More <i className="fa fa-long-arrow-right"></i></a>*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </article>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </Fragment>
    );
  }
}