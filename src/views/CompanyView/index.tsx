import { Box, makeStyles } from '@material-ui/core';
import Checkbox /* CheckboxProps */ from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartWrapper from '../../chart/ChartWrapper';
import TestChart3 from '../../chart/TestChart3';
import Page from '../../components/Page';
import { Company } from '../../interfaces/company';
import CompanyCardModified from '../CompanyView/CompanyCardModified';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  checkboxLabel: {
    textAlign: 'left'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  }
}));

function CompanyView() {
  const classes = useStyles();

  const { companyId } = useParams();
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    fetch('https://ubs-be.herokuapp.com/get_startup/' + companyId)
      .then(res => res.json())
      .then(data => setCompany(data as Company));
  }, [companyId]);

  function CheckboxLabels() {
    const [state, setState] = React.useState({
      checkedA: false,
      checkedB: false,
      checkedC: false,
      checkedD: false,
      checkedE: false,
      checkedF: false,
      checkedG: false,
      checkedH: false,
      checkedI: false,
      checkedJ: false,
      checkedK: false,
      checkedL: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    function CheckboxLabel({
      value,
      name,
      label
    }: {
      value: boolean;
      name: string;
      label: string;
    }) {
      return (
        <Grid item xs={12} sm={6} md={3} className={classes.checkboxLabel}>
          <FormControlLabel
            control={
              <Checkbox checked={value} onChange={handleChange} name={name} />
            }
            label={label}
          />
        </Grid>
      );
    }

    return (
      <Grid container>
        <CheckboxLabel
          name="checkedA"
          value={state.checkedA}
          label="Number of Employees"
        />
        <CheckboxLabel
          name="checkedB"
          value={state.checkedB}
          label="Number of News Articles"
        />
        <CheckboxLabel
          name="checkedC"
          value={state.checkedC}
          label="Number of Competitors"
        />

        <CheckboxLabel
          name="checkedD"
          value={state.checkedD}
          label="Number of Offices"
        />

        <CheckboxLabel
          name="checkedE"
          value={state.checkedE}
          label="Number of Products"
        />

        <CheckboxLabel
          name="checkedF"
          value={state.checkedF}
          label="Total Investments"
        />

        <CheckboxLabel
          name="checkedG"
          value={state.checkedG}
          label="Total Number of Acquisitions"
        />

        <CheckboxLabel
          name="checkedH"
          value={state.checkedH}
          label="Number of Investments"
        />

        <CheckboxLabel
          name="checkedI"
          value={state.checkedI}
          label="Number of Total Investments"
        />

        <CheckboxLabel
          name="checkedJ"
          value={state.checkedJ}
          label="Total Number of companies by same founder"
        />

        <CheckboxLabel name="checkedK" value={state.checkedK} label="??" />

        <CheckboxLabel name="checkedL" value={state.checkedL} label="???" />
      </Grid>
    );
  }

  function CompanyDetails({ company }: { company: Company }) {
    return (
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <CompanyCardModified company={company} key={company.uuid} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">&nbsp;</Typography>
        </Grid>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <Typography variant="body1" align="left" className={classes.title}>
              Data Features
            </Typography>
            <CheckboxLabels />
          </Grid>
        </Paper>
        <Grid item xs={12}>
          <Typography variant="body1">&nbsp;</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {ChartWrapper<TestChart3>(TestChart3)}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <Page title={company && company.name} className={classes.root}>
      <Typography variant="h1">Company View </Typography>
      <Typography variant="body1">&nbsp;</Typography>
      {company ? (
        <CompanyDetails company={company} />
      ) : (
        <Typography>Loading company...</Typography>
      )}
    </Page>
  );
}

export default CompanyView;
