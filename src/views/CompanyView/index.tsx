import { Box, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import { Company } from '../../interfaces/company';
import companiesData from '../../tmp_data/crunchbase_data_heads/organizations.json';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import 'fontsource-roboto';
import CompanyCardModified from '../CompanyView/CompanyCardModified';
/*import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'; */
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, {/* CheckboxProps */} from '@material-ui/core/Checkbox';
import ChartWrapper from '../../chart/ChartWrapper';
import TestChart3 from '../../chart/TestChart3';

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
    checkedL: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
           
      <FormControlLabel control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}label="Number of Employees"/>
      <FormControlLabel control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}label="Number of News Articles"/>
      <FormControlLabel control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}label="Number of Competitors"/>
      <FormControlLabel control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}label="Number of Offices"/>
      <FormControlLabel control={<Checkbox checked={state.checkedE} onChange={handleChange} name="checkedE" />}label="Number of Products"/>
      <FormControlLabel control={<Checkbox checked={state.checkedF} onChange={handleChange} name="checkedF" />}label="Total Investments"/>
      <FormControlLabel control={<Checkbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}label="Total Number of Acquisitions"/>
      <FormControlLabel control={<Checkbox checked={state.checkedH} onChange={handleChange} name="checkedH" />}label="Number of Investments"/>
      <FormControlLabel control={<Checkbox checked={state.checkedI} onChange={handleChange} name="checkedI" />}label="Number of Total Investments"/>
      <FormControlLabel control={<Checkbox checked={state.checkedJ} onChange={handleChange} name="checkedJ" />}label="Total Number of companies by same founder"/>
      <FormControlLabel control={<Checkbox checked={state.checkedK} onChange={handleChange} name="checkedK" />}label="??"/>
      <FormControlLabel control={<Checkbox checked={state.checkedL} onChange={handleChange} name="checkedL" />}label="???"/>



      
    </FormGroup>
  );
}

function CompanyView() {
  const classes = useStyles();

  const { companyId } = useParams();
  const company = companiesData.find(
    company => company.uuid === companyId
  ) as Company;
  console.log(companiesData);

  return (
    <Page title="Portfolio" className={classes.root}>
      <Typography variant="h1">Company View </Typography>
      <Typography variant="body1">&nbsp;</Typography>
      <Grid container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start">
        

        <Paper>
          <Grid item xs={12}>
            <CompanyCardModified company={company} key={company.uuid} />
          </Grid>
        </Paper>
        <Grid xs={12}>
          <Typography variant="body1">&nbsp;</Typography>
          
        </Grid>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <Typography variant="body1" align='left'>
              Data Features
            </Typography>
            <CheckboxLabels/>
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
