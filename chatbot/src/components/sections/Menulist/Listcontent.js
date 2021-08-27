import React, { Component } from 'react';
import Breadcrumbs from './Breadcrumb';
import "datatables.net-bs4/js/dataTables.bootstrap4"
// import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';

var dataSet = [
   //image
 ];
class Listcontent extends Component {
    componentDidMount() {
        //initialize datatable
        $('#data-table-5').DataTable({
            data: dataSet,
            columns: [
                { title: "Product ID" },
                { title: "Product Name" },
                { title: "Quantity" },
                { title: "Status" },
                { title: "Price" },
            ],
        });
    }
    render() {
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumbs />
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Product List</h6>
                            </div>
                            <div className="ms-panel-body">
                                <div className="table-responsive">
                                    <table id="data-table-5" className="table w-100 thead-primary"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default Listcontent;