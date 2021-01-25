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
    xAxis: 'Number of Founders',
    yAxis: 'Predicted Funding',
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

  // Startup features of the companies that are marked from comparison in the company list
  const [featuresComparing, setFeaturesComparing] = useState<CompanyFeatures[]>(
    []
  );

  // Load startup features of the companies specified
  useEffect(() => {
    if (!state.loadData) return;

    Promise.all(
      state.companiesComparing.map(uuid =>
        fetch(`https://ubs-be.herokuapp.com/get_startup_features?uuid=${uuid}`)
      )
    )
      .then(rawJsons => Promise.all(rawJsons.map(rawJson => rawJson.json())))
      .then(featuresComparing =>
        setFeaturesComparing(featuresComparing as CompanyFeatures[])
      );
  }, [company.uuid, state.companiesComparing, state.loadData]);

  useEffect(() => {
    if (!state.loadData) return;

    fetch(
      `https://ubs-be.herokuapp.com/get_features?x_axis=${state.xAxis}&y_axis=${state.yAxis}`
    )
      .then(res => res.json())
      .then(companiesFeatures => {
        setState(state => {
          return {
            ...state,
            companyFeatures: [
              ...(Object.values(companiesFeatures) as CompanyFeatures[]),
              ...(featuresComparing as CompanyFeatures[])
            ].filter((value, index, self) => {
              return self.map(x => x.org_uuid).indexOf(value.org_uuid) === index;
            }),
            loadData: false,
            reset: true
          };
        });
      });
  }, [company, featuresComparing, state.loadData, state.xAxis, state.yAxis]);

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
                {[
                  'Number of Founders',
                  'Number of organisations founded previously by current Founders',
                  'Funding received from organisations founded previously by current Founders',
                  'Number of executive jobs held by Founders previously',
                  'Funding received from previously held jobs by current Founders',
                  'Number of Funding Rounds from previously held jobs by current Founders',
                  'Number of Bachelors',
                  "University Rankings from Founders' degrees",
                  'Number of previous funding rounds',
                  'Age at Funding - Series Unknown',
                  'Funding Raised (USD) - Series Unknown',
                  'Age at Funding - Seed',
                  'Funding Raised (USD) - Seed',
                  'Number of Investors - Seed',
                  'Age at Funding - Series A',
                  'Funding Raised (USD) - Series A',
                  'Number of Investors - Series A',
                  'Funding Raised (USD) - Debt Financing',
                  'Age at Funding - Series B',
                  'Funding Raised (USD) - Series B',
                  'Average organization age at events',
                  'Organization Age',
                  'Predicted Funding',
                  'Total Funding Received'
                ].map(xAxis => (
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
