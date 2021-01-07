import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Company } from '../../interfaces/company';

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
  company: Company;
};

function CompanyCard({ company }: CompanyCardProps) {
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
            {company.name}
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <div className={classes.spacer}></div>
        <CardActions>
          <Button
            component={NavLink}
            to={`/companies/${company.uuid}`}
            size="small"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CompanyCard;
