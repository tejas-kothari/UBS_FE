import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
import Company from '../../interfaces/company';
import CompanyFunding from '../../interfaces/company_funding';
import FundingChart from './chart/FundingChart';
import CompanyFundingDetailsCard from './CompanyFundingDetailsCard';

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

type CompanyFundingCardProps = {
  companyFunding: CompanyFunding[];
  company: Company;
};

export type CompanyFundingCardState = {
  companyFunding: CompanyFunding[];
  company: Company;
  activeFunding: CompanyFunding | null;
};

function CompanyFundingCard({
  company,
  companyFunding
}: CompanyFundingCardProps) {
  const classes = useStyles();
  const [state, setState] = useState<CompanyFundingCardState>({
    company,
    companyFunding,
    activeFunding: companyFunding[0]
  });

  return (
    <Card>
      <CardContent>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" align="left" className={classes.title}>
              Company Funding
            </Typography>
          </Grid>
          {/* <Grid item xs={12} md={8} xl={8}>
            <StatefulChartWrappper
              type={FundingTimelineChart}
              state={state}
              setState={setState}
            />
          </Grid> */}
          <Grid item xs={12} md={8}>
            <StatefulChartWrappper
              type={FundingChart}
              state={state}
              setState={setState}
            />
          </Grid>
          {state.activeFunding && (
            <Grid item xs={12}>
              <CompanyFundingDetailsCard funding={state.activeFunding} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CompanyFundingCard;
