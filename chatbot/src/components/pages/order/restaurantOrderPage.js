import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {useParams
} from "react-router-dom";

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

export default function RestaurantOrderPage() {
  let { id } = useParams();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return(
    <p>Order for restaurant: {id}</p>
  );
}