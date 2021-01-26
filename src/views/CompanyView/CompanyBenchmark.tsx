import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
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
  company: Company;
};

export type CompanyBenchmarkState = {
  xAxis: keyof CompanyFeatures;
  yAxis: keyof CompanyFeatures;
  category: string;
  data: CompanyFeatures[];
  companyFeatures: CompanyFeatures[];
  loadData: boolean;
  reset: boolean;
  company: Company;
  companiesComparing: string[];
};

function CompanyBenchmark({ company }: CompanyBenchmarkProps) {
  const classes = useStyles();
  const [state, setState] = useState<CompanyBenchmarkState>({
    xAxis: 'Predicted Funding',
    yAxis: 'Total Funding Received',
    category: '',
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
    ]
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
          `https://ubs-be.herokuapp.com/get_features?uuid=${company.uuid}&x_axis=${state.xAxis}&y_axis=${state.yAxis}`
        )
          .then(res => res.json())
          .then(companiesFeatures => {
            setState(state => {
              return {
                ...state,
                companyFeatures: [
                  ...(featuresComparing as CompanyFeatures[]),
                  ...(Object.values(companiesFeatures) as CompanyFeatures[])
                ].filter((value, index, self) => {
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
    state.yAxis
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

  console.log(state.companyFeatures[0]);

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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
            {/* <FormControl component="fieldset">
              <FormLabel component="legend" focused={false}>
                Category
              </FormLabel>
              <RadioGroup
                name="category"
                value={state.category}
                onChange={handleChange}
              >
                <RadioButton value="" label="All"></RadioButton>
                {company.category_groups_list
                  .split(',')
                  .filter(category => categories.indexOf(category) !== -1)
                  .map(category => (
                    <RadioButton
                      key={category}
                      value={category}
                      label={category}
                      disabled={false}
                    ></RadioButton>
                  ))}
              </RadioGroup>
            </FormControl> */}
          </Grid>
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
