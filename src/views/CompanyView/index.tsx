import { makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  }
}));

function CompanyView() {
  const classes = useStyles();
  const { companyId } = useParams();

  return (
    <Page title="Portfolio" className={classes.root}>
      
      <Typography variant="h1" >
        Company: {companyId}
      </Typography>
      

    </Page>
  );
}

export default CompanyView;
