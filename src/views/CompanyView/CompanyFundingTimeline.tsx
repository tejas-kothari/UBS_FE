import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
import CompanyFunding from '../../interfaces/company_funding';
import FundingTimelineChart from './FundingTimelineChart';

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

type ComapnyFundingTimelineProps = {
  companyFunding: CompanyFunding[];
};

export type ComapnyFundingTimelineState = {
  companyFunding: CompanyFunding[];
};

function ComapnyFundingTimeline({
  companyFunding
}: ComapnyFundingTimelineProps) {
  const classes = useStyles();
  const [state, setState] = useState<ComapnyFundingTimelineState>({
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
          <Grid item xs={12}>
            <StatefulChartWrappper
              type={FundingTimelineChart}
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
