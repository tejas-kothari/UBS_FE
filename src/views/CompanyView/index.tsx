import classes from '*.module.css';
import { Box, makeStyles } from '@material-ui/core';
import Checkbox /* CheckboxProps */ from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
/*import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'; */
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React from 'react';
import { useParams } from 'react-router-dom';
import ChartWrapper from '../../chart/ChartWrapper';
import TestChart3 from '../../chart/TestChart3';
import Page from '../../components/Page';
import { Company } from '../../interfaces/company';
import companiesData from '../../tmp_data/crunchbase_data_heads/organizations.json';
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

/*const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
*/

function CompanyView() {
  const classes = useStyles();

  const { companyId } = useParams();
  const company = companiesData.find(
    company => company.uuid === companyId
  ) as Company;
  console.log(companiesData);

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
        <Grid item xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox checked={value} onChange={handleChange} name={name} />
            }
            label={label}
            className={classes.checkboxLabel}
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

  return (
    <Page title={company.name} className={classes.root}>
      <Typography variant="h1">Company View </Typography>
      <Typography variant="body1">&nbsp;</Typography>
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
        <Grid xs={12}>
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
        <Grid xs={12}>
          <Typography variant="body1">&nbsp;</Typography>
        </Grid>
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
    </Page>
  );
}

export default CompanyView;
