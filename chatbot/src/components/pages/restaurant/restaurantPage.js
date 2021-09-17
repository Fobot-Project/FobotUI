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
  addRestaurant,
  auth,
  getRestaurants,
} from "../../../firebase";
import { useHistory } from "react-router-dom";
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
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const history = useHistory();
  const [url, setUrl] = useState("");
  // const {currentUser} = useAuthState()
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        setUserId(auth.currentUser.uid);
        getRestaurants().then((doc) => {
          setRestaurants(doc);
        });
      } else {
      }
    });
  }, [open]);
  const handleAdd = () => {
    const uploadTask = storage
      .ref(`users_images/retaurants_images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("users_images/retaurants_images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            if(url){
              setUrl(url)
            console.log("restaurant image: "+ url)
            if (name === "") {
              console.log("...");
            } else {
              if (addRestaurant(name, address, phone, userId, url)) {
                //添加成功
                console.log(url)
                console.log("成功");
                setOpen(false);
              } else {
                console.log(console.log("添加失败！"));
              }
            }
            }
            
          });
      }
    );

    
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
  
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const content = () => {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add restaurant
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Registered restaurant information
          </DialogTitle>

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

            <input type="file" onChange={handleChange} />
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
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            className={classes.root}
            onClick={() => history.push(`/restaurant/${restaurant.id}`)}
          >
            <CardActionArea>
              <CardMedia
                className={classes.photo}
                component="img"
                alt={restaurant.name}
                //alt={firebase-image}
                height="140"
                image={restaurant.imageUrl} //"https://picsum.photos/200/300" //
                title={restaurant.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {restaurant.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {restaurant.phonenum}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {/* <Button size="small" color="primary" onClick={handleAddProducts}>
                add product
              </Button> */}
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  };
  return <PageSkeleton content={content} />;
}
