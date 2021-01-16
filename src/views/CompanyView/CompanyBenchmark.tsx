import {
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
import React, { useState } from 'react';
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

type CompanyBenchmarkState = {
  xAxis: string;
  yAxis: string;
  category: string;
};

function CompanyBenchmark({ company }: CompanyBenchmarkProps) {
  const classes = useStyles();
  const [state, setState] = useState<CompanyBenchmarkState>({
    xAxis: '',
    yAxis: '',
    category: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
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
            <PivotChartWrapper data={state} />
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
                <RadioButton value="test" label="Test"></RadioButton>
                <RadioButton value="test2" label="Test2"></RadioButton>
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
                <RadioButton value="test" label="Test"></RadioButton>
                <RadioButton value="test2" label="Test2"></RadioButton>
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
                <RadioButton value="test" label="Test"></RadioButton>
                <RadioButton value="test2" label="Test2"></RadioButton>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CompanyBenchmark;
