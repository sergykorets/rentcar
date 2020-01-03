import React, {Fragment} from 'react';
import Masonry from 'react-masonry-css';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { Tooltip, Modal, ModalHeader, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: this.props.category,
            cars: this.props.cars
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
                                    <h2>{this.state.category.name}</h2>
                                    <span className="title-line"><i className="fa fa-car"></i></span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                                            <Masonry breakpointCols={{default: 4, 1100: 3, 700: 2, 500: 1}}>
                                                { this.state.cars.map((car, index) => {
                                                    return (
                                                        <div className="category" key={index}>
                                                            <div className="single-popular-car">
                                                                <div className="p-car-thumbnails">
                                                                    <a className="car-hover" href={`/cars/${car.slug}`}>
                                                                        <img src={car.avatar} alt="JSOFT"/>
                                                                    </a>
                                                                </div>

                                                                <div className="p-car-content">
                                                                    <h3>
                                                                        <a href={`/cars/${car.slug}`}>{car.name}</a>
                                                                    </h3>

                                                                    <h5>{car.description}</h5>
                                                                </div>
                                                            </div>
                                                        </div>)})}
                                            </Masonry>
                    </div>
                </section>
            </Fragment>
        );
    }
}