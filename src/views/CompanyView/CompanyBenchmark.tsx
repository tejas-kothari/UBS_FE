import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import StatefulChartWrappper from '../../chart/StatefulChartWrapper';
import Company from '../../interfaces/company';
import CompanyFeatures from '../../interfaces/company_features';
import PivotChart from './chart/PivotChart';

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
  formControl: {
    width: '100%'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}));

type CompanyBenchmarkProps = {
  // Reference to the company
  company: Company;
};

export type CompanyBenchmarkState = {
  // Value type of the x-axis
  xAxis: keyof CompanyFeatures;
  // Value type of the y-axis
  yAxis: keyof CompanyFeatures;
  // List of companies that should be shown
  data: CompanyFeatures[];
  // List of all companies
  companyFeatures: CompanyFeatures[];
  // If true, the system should reload the data
  loadData: boolean;
  // If true, the system should reset the x-axis and y-axis
  reset: boolean;
  // Reference to the company
  company: Company;
  // List of companies in the comparison list
  companiesComparing: string[];
  // If true, the system should have data that is zero
  showZero: boolean;
};

function CompanyBenchmark({ company }: CompanyBenchmarkProps) {
  const classes = useStyles();
  const [state, setState] = useState<CompanyBenchmarkState>({
    xAxis: 'Predicted Funding',
    yAxis: 'Total Funding Received',
    data: [],
    loadData: true,
    reset: false,
    company,
    companyFeatures: [],
    companiesComparing: [
      company.uuid,
      ...Object.keys(
        JSON.parse(window.localStorage.getItem('comparison') || '{}')
      )
    ],
    showZero: false
  });

  useEffect(() => {
    if (!state.loadData) return;

    // Fetch startup features of the companies selected for comparison
    Promise.all(
      state.companiesComparing.map(uuid =>
        fetch(`https://ubs-be.herokuapp.com/get_startup_features?uuid=${uuid}`)
      )
    )
      .then(rawJsons => Promise.all(rawJsons.map(rawJson => rawJson.json())))
      .then(featuresComparing =>
        // Fetch baseline values for the benchmark
        fetch(
          `https://ubs-be.herokuapp.com/get_features?uuid=${
            company.uuid
          }&x_axis=${state.xAxis}&y_axis=${state.yAxis}&show_zero=${
            state.showZero ? 'True' : 'False'
          }`
        )
          .then(res => res.json())
          .then(companiesFeatures => {
            setState(state => {
              return {
                ...state,
                companyFeatures: [
                  // Merge the company features of the baseline companies and those from the comparison list
                  ...(featuresComparing as CompanyFeatures[]),
                  ...(Object.values(companiesFeatures) as CompanyFeatures[])
                ].filter((value, index, self) => {
                  // Remove all duplicates
                  return (
                    self.map(x => x.org_uuid).indexOf(value.org_uuid) === index
                  );
                }),
                loadData: false,
                reset: true
              };
            });
          })
      );
  }, [
    company.uuid,
    state.companiesComparing,
    state.loadData,
    state.xAxis,
    state.yAxis,
    state.showZero
  ]);

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setState({
      ...state,
      loadData: true,
      [event.target.name as string]: event.target.value
    });
  };

  return (
    <Card>
      <CardContent>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" align="left" className={classes.title}>
              Company Benchmark
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <StatefulChartWrappper
              type={PivotChart}
              state={state}
              setState={setState}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} md={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="xAxis-label" focused={false}>
                X-Axis
              </InputLabel>
              <Select
                labelId="xAxis-label"
                name="xAxis"
                value={state.xAxis}
                onChange={handleChange}
              >
                
                {state.companyFeatures[0] &&
                  // Only show keys that do not have string values (i.e. name, org_uuid)
                  Object.keys(state.companyFeatures[0])
                    .filter(key => key !== 'name' && key !== 'org_uuid')
                    .map(xAxis => (
                      <MenuItem key={xAxis} value={xAxis}>
                        {xAxis}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="yAxis-label" focused={false}>
                Y-Axis
              </InputLabel>
              <Select
                labelId="yAxis-label"
                name="yAxis"
                value={state.yAxis}
                onChange={handleChange}
              >
                {['Predicted Funding', 'Total Funding Received'].map(yAxis => (
                  <MenuItem key={yAxis} value={yAxis}>
                    {yAxis}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.showZero}
                  onChange={event =>
                    setState(state => {
                      return {
                        ...state,
                        loadData: true,
                        showZero: event.target.checked
                      };
                    })
                  }
                  name="showZero"
                />
              }
              label="Show Zero"
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() =>
                setState(state => {
                  return {
                    ...state,
                    reset: true
                  };
                })
              }
            >
              Reset Zoom
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CompanyBenchmark;
