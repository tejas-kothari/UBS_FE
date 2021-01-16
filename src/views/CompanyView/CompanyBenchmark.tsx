import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PivotChartWrapper from './PivotChart/PivotChartWrapper';
import { Company } from '../../interfaces/company';

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
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}));

type CompanyBenchmarkProps = {
  company: Company;
};

export type CompanyBenchmarkState = {
  xAxis: 'rank' | 'total_funding_usd' | 'num_funding_rounds';
  yAxis: 'rank' | 'total_funding_usd' | 'num_funding_rounds';
  category: string;
  data: Company[];
  reset: boolean;
  company: Company;
};

function CompanyBenchmark({ company }: CompanyBenchmarkProps) {
  const classes = useStyles();
  const [state, setState] = useState<CompanyBenchmarkState>({
    xAxis: 'num_funding_rounds',
    yAxis: 'total_funding_usd',
    category: '',
    data: [],
    reset: false,
    company
  });

  useEffect(() => {
    fetch('https://ubs-be.herokuapp.com/get_startup_list')
      .then(res => res.json())
      .then(data => {
        setState(state => {
          return {
            ...state,
            data: [...(Object.values(data) as Company[]), company],
            reset: true
          };
        });
      });
  }, [company]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      reset: true,
      [event.target.name]: event.target.value
    });
  };

  const RadioButton = ({ value, label }: { value: string; label: string }) => {
    return (
      <FormControlLabel
        value={value}
        control={<Radio />}
        label={label}
      ></FormControlLabel>
    );
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
          <Grid item xs={12} md={6} lg={4}>
            <PivotChartWrapper state={state} setState={setState} />
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <FormLabel component="legend" focused={false}>
                Category
              </FormLabel>
              <RadioGroup
                name="category"
                value={state.category}
                onChange={handleChange}
              >
                <RadioButton value="" label="???"></RadioButton>
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend" focused={false}>
                X-Axis
              </FormLabel>
              <RadioGroup
                name="xAxis"
                value={state.xAxis}
                onChange={handleChange}
              >
                <RadioButton value="rank" label="Rank"></RadioButton>
                <RadioButton
                  value="total_funding_usd"
                  label="Total Funding USD"
                ></RadioButton>
                <RadioButton
                  value="num_funding_rounds"
                  label="Number of founding rounds"
                ></RadioButton>
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend" focused={false}>
                Y-Axis
              </FormLabel>
              <RadioGroup
                name="yAxis"
                value={state.yAxis}
                onChange={handleChange}
              >
                <RadioButton value="rank" label="Rank"></RadioButton>
                <RadioButton
                  value="total_funding_usd"
                  label="Total Funding USD"
                ></RadioButton>
                <RadioButton
                  value="num_funding_rounds"
                  label="Number of founding rounds"
                ></RadioButton>
              </RadioGroup>
            </FormControl>
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
