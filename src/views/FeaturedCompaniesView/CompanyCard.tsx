import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import React from 'react';
import { Divide } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  title: {
    fontSize: 14
  },
  spacer: {
    flexGrow: 1
  }
}));

type CompanyCardProps = {
  //   label: string;
};

function CompanyCard({}: CompanyCardProps) {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <div className={classes.spacer}></div>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CompanyCard;
