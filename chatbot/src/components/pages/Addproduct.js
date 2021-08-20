import React, { Component } from 'react';
import Addproductcontent from '../sections/Addproduct/Addproductcontent'
import Quickbar from '../layouts/Quickbar';


class Addproduct extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <main className="body-content">
                    <Addproductcontent/>
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default Addproduct;