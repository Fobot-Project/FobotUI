import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from "react-router-dom";
import { useAuth} from "../../../context/AuthContext";

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

export default function RestaurantChatbotPage() {
  let { id } = useParams();
  const {currentUser} = useAuth()
  const restaurantChatbotPath = currentUser.uid + "/" + id;
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return(
    <div>
    <p>Chatbot for restaurant: {id}</p>
    <df-messenger
      intent="WELCOME"
      chat-title="test-bot"
      agent-id="726c85cc-ff28-494b-baaf-e439a6e65d09"
      expand="true"
      user-id={restaurantChatbotPath}
      language-code="en"
    ></df-messenger>
    </div>
    
  );
}