import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

// import logo from '../../assets/img/foodtech/foodtech-logo-216x62.png';

class Sidenavigation extends Component {

    removeoverlay = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }
    componentDidMount() {
        function setActiveMenuItem() {
            $('.ms-main-aside .menu-item>a').on('click', function () {
                $(this).removeAttr('href');
                var element = $(this).parent('li');
                if (element.hasClass('active')) {
                    element.removeClass('active');
                    element.find('li').removeClass('active');
                    element.find('.collapse').slideUp();
                } else {
                    element.addClass('active');
                    element.children('.collapse').slideDown();
                    element.siblings('li').children('.collapse').slideUp();
                    element.siblings('li').removeClass('active');
                    element.siblings('li').find('li').removeClass('active');
                    element.siblings('li').find('.collapse').slideUp();
                }
            });
        }
        setActiveMenuItem();
    }
    render() {
        return (
            <div>
                <div className="ms-aside-overlay ms-overlay-left ms-toggler" onClick={this.removeoverlay}></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler"></div>
                <Scrollbar id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
                    {/* Logo */}
                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/">
                            {/* <img src={logo} alt="logo" /> */}
                        </Link>
                    </div>
                    {/* Navigation */}
                    <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
                       
                        {/* product */}
                        <li className="menu-item">
                            <Link to="#" className="has-chevron"> <span><i className="fa fa-archive fs-16" />Menus </span>
                            </Link>
                            <ul id="product" className="collapse" aria-labelledby="product" data-parent="#side-nav-accordion">
                                <li> <Link to="/menu-list" >Menu List</Link>
                                </li>
                                <li> <Link to="/add-product" >Add Product</Link>
                                </li >
                                <li> <Link to="/product-detail" >Product Detail</Link>
                                </li >
                            </ul >
                        </li >
                        {/* product end */}
                
                    </ul >
                </Scrollbar >
            </div >
        );
    }
}

export default Sidenavigation;