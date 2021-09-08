import clsx from 'clsx';
import PageSkeleton from '../../layouts/drawerHeader';
import { makeStyles } from '@material-ui/core/styles';
import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { addProduct, db, getProducts} from "../../../firebase";


// import {
//   addProduct
// } from "../../../firebase";

// import {getRestaurants} from '../../../firebase';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  photo: {
    height: 200,
    width: 500
  },
  root: {
    maxWidth: 500,
  },
  media: {
    height: 140,
  },
}));




export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] =useState("");
  const [price, setPrice] =useState("");
  const [description, setDescription] =useState("");
  // const {currentUser} = useAuthState()
  const [Products, setProducts] = useState([])
  
  useEffect(() => {
    getProducts().then(doc => {
    setProducts(doc)
  })
  },[open] )
  
  const [Catagory, setCatagory] = React.useState('');

  const handleChange = (event) => {
    setCatagory(event.target.value);
  };

  function handleAdd(){
    if(name===""){
      console.log(
        "..."
      )
    }else{
      if(addProduct(name,price,description,Catagory)){
        //添加成功
        console.log("成功")
      }else{
        console.log(
          console.log("添加失败！")
        )
      }
    }
  
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const content = () => {

    return (
        
      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add product
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add product information</DialogTitle>

        <DialogContent>

          <DialogContentText>
           Please enter the basic information of your product
          </DialogContentText>

          <TextField
            // margin="dense"
            name="Product name"
            required
            fullWidth
            multiline
            id="Product name"
            label="Product name"
            autoFocus
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Catagory</InputLabel>
        <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={Catagory}
            onChange={handleChange}
            >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* <MenuItem value={Vegetable}>Vegetable</MenuItem>
          <MenuItem value={Meat}>Meat</MenuItem>
          <MenuItem value={Dessert}>Dessert</MenuItem>
          <MenuItem value={Drink}>Drink</MenuItem> */}
        </Select>
      </FormControl>

          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            name="Price"
            id="Price"
            label="Price"
            fullWidth
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

         <TextField
            autoFocus
            required
            multiline
            margin="dense"
            name="Description"
            id="Description"
            label="Description"
            fullWidth
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

         
          <label>Product Image</label>
          <input type="file" name='file' id="fileButton"/>
          {/* <progress value="0" max="100" id="uploader">0%</progress> */}
          {/* <input type="submit" value="上传"/> */}
          {/* <input type="file" onChange={handleChange}/>
          <Button onClick={handleupload}>upload</Button> */}


        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {Products.map((Product) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.photo}
                component="img"
                alt={Product.name}
                height="140"
                image= "https://picsum.photos/200/300"  //{Product.url}
                title={Product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {Product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {Product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  {Product.description}
                </Typography>
              </CardContent>
              
            </CardActionArea>

          </Card>
          
        ))}
    </div>
    );
  };

  return(
    <PageSkeleton content={content}/>
  );

}
