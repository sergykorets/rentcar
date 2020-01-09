import React, {Fragment} from 'react';
import Masonry from 'react-masonry-css';
import ReactGA from 'react-ga';

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
        if (!this.props.admin) {
          ReactGA.initialize('UA-116820611-3');
          ReactGA.ga('send', 'pageview', `/categories/${this.state.category.name}`);
        }
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
                        <Masonry breakpointCols={{default: 4, 1199: 3, 991: 2, 767: 1}}>
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