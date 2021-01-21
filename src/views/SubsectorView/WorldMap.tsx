import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
//import Company from '../../interfaces/company';
//import CompanyFunding from '../../interfaces/company_funding';
//import FundingChart from './chart/FundingChart';
//import FundingTimelineChart from './chart/FundingTimelineChart';
import WorldMapChart from './WorldMapChart'
/*const useStyles = makeStyles(theme => ({
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

type SubsectorProps = {
  country: Country
};

export type SubsectorState = {
  country: Country
};

function ComapnyFundingTimeline({
  country
}: SubsectorProps) {
  const classes = useStyles();
  const [state, setState] = useState<ComapnyFundingTimelineState>({
    company,
    companyFunding
  });

  return (
    <Card>
      <CardContent>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" align="left" className={classes.title}>
              Funding Timeline
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} xl={8}>
            <StatefulChartWrappper
              type={FundingTimelineChart}
              state={state}
              setState={setState}
            />
          </Grid>
          <Grid item xs={12} md={8} xl={4}>
            <StatefulChartWrappper
              type={FundingChart}
              state={state}
              setState={setState}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ComapnyFundingTimeline;
*/