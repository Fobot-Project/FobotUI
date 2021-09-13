import clsx from "clsx";
import PageSkeleton from "../../layouts/drawerHeader";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {
  db,
  getRestaurantById,
  addProduct
} from "../../../firebase";
import { useHistory,Link, useParams } from "react-router-dom";
import { storage } from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  photo: {
    height: 200,
    width: 500,
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
  const [image, setImage] = useState(null);
  const [restaurant, setRestaurant] = useState();
  const history = useHistory();
  // const {currentUser} = useAuthState()
  const {id} = useParams();
  console.log(id)
 
  const handleAddProducts = () => {
    history.push(`/restaurant/addProduct/${id}`);
    // history.push("/order")
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage
      .ref("users images/retaurants_images/" + image.name)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("image")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const content = () => {
    return (
      <div>    
          <Card className={classes.root} onClick={()=>history.push(`/restaurant/addproduct/${id}`)}>
            <CardActionArea>
              <CardMedia
                className={classes.photo}
                component="img"
                //alt={restaurant.name}
                //alt={firebase-image}
                height="140"
                image="https://picsum.photos/200/300" //{restaurant.url}
                // title={restaurant.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {/* {restaurant.name} */}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {/* {restaurant.address} */}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {/* {restaurant.phonenum} */}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={handleAddProducts}>
                add product
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
      </div>
    );
  };

  return <PageSkeleton content={content} />;
}
