import clsx from 'clsx';
import PageSkeleton from '../../layouts/drawerHeader';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addRestaurant
} from "../../../firebase";

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




export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] =React.useState("");
  const [address, setAddress] =React.useState("");
  const [phone, setPhone] =React.useState("");
  // const {currentUser} = useAuthState()




  function handleAdd(){
    if(name===""){
      console.log(
        "..."
      )
    }else{
      if(addRestaurant(name,address,phone)){
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
        Add restaurant
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Registered restaurant information</DialogTitle>

        <DialogContent>

          <DialogContentText>
           Please enter the basic information of your restaurant
          </DialogContentText>

          <TextField
            // margin="dense"
            name="Restaurant name"
            required
            fullWidth
            multiline
            id="Restaurant name"
            label="Restaurant name"
            autoFocus
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            name="Restaurant address"
            id="Restaurant address"
            label="Restaurant address"
            fullWidth
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            name="phone number"
            id="phone number"
            label="phone number"
            type="number"
            fullWidth
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

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
    </div>
    );
  };

  return(
    <PageSkeleton content={content}/>
  );

}
