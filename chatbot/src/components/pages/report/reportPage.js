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

export default function ReportPage() {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const content = () => {
    return (
      <p>Report</p>
  );
  };

  return(
    <PageSkeleton content={content}/>
  );
}