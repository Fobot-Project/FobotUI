import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from "react-router-dom";
import { useAuth} from "../../../context/AuthContext";
import IntegrationCodeBlock from "./integrationCodeBlock"
import { Paper } from "@material-ui/core";

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
    <Paper elevation={3}>
    <p>Chatbot for restaurant: {id}</p>
    <p >instruction for integration......</p>
    </Paper>
    <IntegrationCodeBlock chatPath={restaurantChatbotPath} />
    <df-messenger
      intent="WELCOME"
      chat-title="test-bot"
      agent-id="726c85cc-ff28-494b-baaf-e439a6e65d09"
      user-id={restaurantChatbotPath}
      language-code="en"
    ></df-messenger>
    </div>
    
  );
}