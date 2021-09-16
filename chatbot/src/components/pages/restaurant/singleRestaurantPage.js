// import clsx from "clsx";
import PageSkeleton from "../../layouts/drawerHeader";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: "100%",
  },
  photo: {
    height: "100%",
    width: "100%",
  },

  root: {
    maxWidth: "500px",
  },
  media: {
    height: 140,
  },
}));

export default function FormDialog() {
  const history = useHistory();

  const { id } = useParams();

  const handleAddProducts = () => {
    history.push(`/restaurant/addProduct/${id}`);
  };

  const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const content = () => {
    return (
      <div>
        <Card
          className={classes.root}
          onClick={() => history.push(`/restaurant/addproduct/${id}`)}
        >
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
