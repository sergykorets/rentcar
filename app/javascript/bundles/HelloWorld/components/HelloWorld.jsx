import React, {Fragment} from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Fragment>
      <header id="home" className="sections">
        <div className="container">

            <div className="homepage-style">

              <div className="top-arrow hidden-xs text-center"><img src="/images/top-arrow.png" alt="" /></div>
              <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="unique-apps">
                  <h2>UNIQUE-TECH<br/>APP DEVELOPMENT </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
                  </p>

                  <div className="home-btn"><button className="btn btn-primary">View More <span><i className="fa fa-paper-plane"></i></span></button></div>
                </div>
              </div>

              <div className="col-md-6 col-sm-6 col-xs-12">
                <img src="/images/monitor.png" alt="" />
              </div>
            </div>
          </div>
        </div>

      </header>

        <section id="our-portfolio" class="sections">
          <div class="container">


              <div class="heading">
                <div class="title text-center arrow-right">
                  <h4 class="">WHAT WE DO </h4>
                  <img class="hidden-xs" src="/images/right-arrow.png" alt="" />

                </div>
              </div>

              <div class="portfolio-wrap">

                <div class="portfolio">
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <img src="/images/monitor.png" alt="" />
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <div class="portfolio-item">
                        <h4>WEB DESIGN</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. laboru
                        </p>
                        <button class="btn pt-btn btn-primary">View More</button>
                      </div>
                    </div>
                  </div>
                </div>



                <div class="portfolio">
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <div class="portfolio-item">
                        <h4>SEARCH ENGINE OPTIMIZATION</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. laboru
                        </p>
                        <button class="btn pt-btn btn-primary">View More</button>
                      </div>
                    </div>

                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <img class="portfolio-img img-responsive" src="/images/monitor.png" alt="" />
                    </div>
                  </div>
                </div>



                <div class="portfolio">
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <img class="portfolio-img img-responsive" src="/images/monitor.png" alt="" />
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <div class="portfolio-item">
                        <h4>AFFILIATE MARKETING</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. laboru
                        </p>
                        <button class="btn pt-btn btn-primary">View More</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </section>

      <section id="our-feature" className="sections">
        <div className="container">
          <div className="heading">
            <div className="title text-center arrow-left">
              <img className="hidden-xs" src="/images/left-arrow.png" alt="" />

              <h4 className="">Our Features</h4>
            </div>
          </div>

          <div className="feature-wrapper">
            <div className="row">

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content active">
                  <h4><i className="fa fa-database"></i><span>Visual Composer</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Responsive</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="features-content">
                  <h4><i className="fa fa-database"></i><span>Retina Ready</span></h4>
                  <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla</p>
                </div>
              </div>
            </div>
          </div>


        </div>


      </section>

        <section id="our-package" class="sections lightbg">
          <div class="container">

            <div class="heading">
              <div class="title text-center arrow-left">
                <img class="hidden-xs" src="/images/left-arrow.png" alt="" />

                <h4 class="">Our Packages</h4>
              </div>
            </div>




              <div class="main-package text-center">
                <div class="row">
                <div class="col-md-4 col-sm-12 col-xs-12">
                  <div class="package-item basic">

                    <h5>Basic</h5>

                    <ul>
                      <li>5 web sites</li>
                      <li>5 e-mails</li>
                      <li>5 MySQL databases</li>
                      <li>5 MySQL databases</li>
                      <li>10 GB storage</li>
                    </ul>

                    <div class="package-bottom-area">
                      <h3>$5/<span>mo.</span></h3>
                    </div>

                    <div class="pkg-btn"><a href="" class="btn btn-primary">ORDER NOW</a></div>

                  </div>


                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <div class="package-item standard">

                    <h5>Standard</h5>

                    <ul>
                      <li>5 web sites</li>
                      <li>5 e-mails</li>
                      <li>5 MySQL databases</li>
                      <li>5 MySQL databases</li>
                      <li>10 GB storage</li>
                    </ul>

                    <div class="package-bottom-area">
                      <h3>$12<span>/mo.</span></h3>
                    </div>

                    <div class="pkg-btn"><a href="" class="btn btn-primary">ORDER NOW</a></div>

                  </div>


                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <div class="package-item premium">

                    <h5>Premium</h5>

                    <ul>
                      <li>5 web sites</li>
                      <li>5 e-mails</li>
                      <li>5 MySQL databases</li>
                      <li>5 MySQL databases</li>
                      <li>10 GB storage</li>
                    </ul>

                    <div class="package-bottom-area">
                      <h3>$19<span>/mo.</span></h3>
                    </div>

                    <div class="pkg-btn"><a href="" class="btn btn-primary">ORDER NOW</a></div>

                  </div>


                </div>

              </div>


            </div>
          </div>
        </section>

      <section id="our-history" className="sections">
        <div className="container">



            <div className="main-history">
              <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="history-img">
                  <img src="/images/history-img.png" alt="" />
                </div>
              </div>



              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="history-wrapper">
                  <div className="history-heading">
                    <h5 className="our-history">Our History</h5>
                  </div>

                  <div className="history-content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. laboru
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>

                    <div className="hst-btn"><button className="btn btn-primary">BROWSE OUR HISTORY</button></div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="our-project" className="sections">
        <div className="container">

          <div className="heading">
            <div className="title text-center arrow-left">

              <h4 className="">Our Business Project</h4>
              <img className="hidden-xs" src="/images/right-arrow.png" alt="" />
            </div>
          </div>




            <div className="main-project text-center">
              <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="/images/projects/1.png" alt="" /></div>
                  <h5>TECHNICAL AID</h5>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="/images/projects/2.png" alt="" /></div>
                  <h5>SECURE ACCESS</h5>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="/images/projects/3.png" alt="" /></div>
                  <h5>MARKET RESERCH</h5>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="assets/images/projects/4.png" alt="" /></div>
                  <h5>CREDIT RESERCH</h5>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="/images/projects/5.png" alt="" /></div>
                  <h5>TECHNICAL AID</h5>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="/images/projects/6.png" alt="" /></div>
                  <h5>TECHNICAL AID</h5>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="/images/projects/7.png" alt="" /></div>
                  <h5>TECHNICAL AID</h5>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="project-item">
                  <div className="project-photo"><img src="/images/projects/8.png" alt="" /></div>
                  <h5>TECHNICAL AID</h5>
                </div>
              </div>


            </div>

          </div>
        </div>
      </section>

      <section id="our-team" className="sections">
        <div className="container">

          <div className="heading">
            <div className="title text-center arrow-left">
              <img className="hidden-xs" src="/images/left-arrow.png" alt="" />

              <h4 className="">Our Team Members</h4>
            </div>
          </div>
        </div>

        <div className="container-fluid project-bg">


            <div className="main-team text-center">
              <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="team-member">

                  <img className="img-circle" src="/images/team/1.png" alt="" />
                  <h5>SAYED MIRAJ</h5>
                  <p>UI & UX DESIGNER</p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="team-member">
                  <img className="img-circle" src="/images/team/2.png" alt="" />
                  <h5>PENNY HUSTON</h5>
                  <p>DEVELOPER</p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="team-member">
                  <img className="img-circle" src="/images/team/3.png" alt="" />
                  <h5>LENNERD SHELLY</h5>
                  <p>REVIEWER</p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="team-member">
                  <img className="img-circle" src="/images/team/4.png" alt="" />
                  <h5>SHELDON CUPPER</h5>
                  <p>MARKETTER</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section id="our-supports" className="sections">
        <div className="container">

          <div className="heading">
            <div className="title text-center arrow-left">

              <h4 className="">Updates & Support</h4>
              <img className="hidden-xs" src="/images/right-arrow.png" alt="" />
            </div>
          </div>

          <div className="row">


            <div className="col-sm-6 col-xs-12">
              <div className="supports-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. laboru
                </p>
                <div className="spt-btn"><button className="btn btn-primary">SUPPORT CENTER</button></div>
              </div>
            </div>

            <div className="col-sm-6 col-xs-12">
              <div className="supports-img"><img className="img-responsive" src="/images/monitor.png" alt="" /></div>
            </div>


          </div>

        </div>
      </section>

      <div className="scroll-top">

        <div className="scrollup">
          <i className="fa fa-angle-double-up"></i>
        </div>

      </div>

      <footer id="footer" className="footer">
        <div className="container">


            <div className="main-footer">
              <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="footer-item">
                  <h2>PORTFOLIO</h2>
                  <ul>
                    <li><a href="#">Web Design</a></li>
                    <li><a href="#">Brand & Identity</a></li>
                    <li><a href="#">Mobile Design</a></li>
                    <li><a href="#">Print</a></li>
                    <li><a href="#">User Interface</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="footer-item">
                  <h2>ABOUT</h2>
                  <ul>
                    <li><a href="#">The Company</a></li>
                    <li><a href="#">History</a></li>
                    <li><a href="#">Vision</a></li>

                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="footer-item">
                  <h2>GALLERY</h2>
                  <ul>
                    <li><a href="#">lickr</a></li>
                    <li><a href="#">Picasa</a></li>
                    <li><a href="#">iStockPhoto</a></li>
                    <li><a href="#">PhotoDune</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="footer-item">
                  <h2>CONTACT</h2>
                  <ul>
                    <li><a href="#">Basic Info</a></li>
                    <li><a href="#">Map</a></li>
                    <li><a href="#">Conctact Form</a></li>

                  </ul>
                </div>
              </div>

            </div>

            <div className="socio-copyright">

              <div className="social">
                <a target="_blank" href="#"><i className="fa fa-facebook"></i></a>
                <a target="_blank" href="#"><i className="fa fa-twitter"></i></a>
                <a target="_blank" href="#"><i className="fa fa-google-plus"></i></a>
                <a target="_blank" href="#"><i className="fa fa-linkedin"></i></a>
              </div>

              <p>Made with <i className="fa fa-heart"></i> by <a target="_blank" href="http://bootstrapthemes.co"> Bootstrap Themes </a>2016. All rights reserved.</p>
            </div>

          </div>
        </div>

      </footer>
      </Fragment>
    );
  }
}
