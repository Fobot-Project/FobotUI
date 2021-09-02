import clsx from 'clsx';
import PageSkeleton from '../../layouts/drawerHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({


  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function BookingPage() {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const content = () => {
    return (
        <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-success" role="alert">
                        <strong>Please add a menu!</strong> 
  </div>
                </div>
                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Add Product Form</h6>
                        </div>
                        <div className="ms-panel-body">
                            <form className="needs-validation clearfix" noValidate>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="validationCustom18">Product Name</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="validationCustom18" placeholder="Product Name" defaultValue="Pizza" required />
                                            <div className="valid-feedback">
                                              
              </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationCustom22">Select Catagory</label>
                                        <div className="input-group">
                                            <select className="form-control" id="validationCustom22" required>
                                                <option value>Catagory 1</option>
                                                <option value>Catagory 2</option>
                                                <option value>Catagory 3</option>
                                                <option value>Catagory 4</option>
                                            </select>
                                            <div className="invalid-feedback">
                                                
              </div>
                                        </div>
                              
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationCustom24">Quantity</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="validationCustom24" placeholder="01" required />
                                            <div className="invalid-feedback">
                                              
              </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationCustom25">Price</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="validationCustom25" placeholder="$10" required />
                                            <div className="invalid-feedback">
                                          
              </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="validationCustom12">Description</label>
                                        <div className="input-group">
                                            <textarea rows={5} id="validationCustom12" className="form-control" placeholder="Message" required />
                                            <div className="invalid-feedback">
                                         
              </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="validationCustom12">Product Image</label>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="validatedCustomFile" />
                                            <label className="custom-file-label" htmlFor="validatedCustomFile">Upload Images...</label>
                                            <div className="invalid-feedback"> </div>
                                        </div>
                                    </div>

                                    <div className="ms-panel-header new">
                                    <button className="btn btn-secondary d-block" type="submit">Save</button>
                                    <button className="btn btn-primary d-block" type="submit">Save and Add</button>
                                </div>
                                
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>

    );
  };

  return(
    <PageSkeleton content={content}/>
  );
}
