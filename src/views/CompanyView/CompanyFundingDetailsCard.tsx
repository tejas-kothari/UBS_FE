import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import React from 'react';
import CompanyFunding from '../../interfaces/company_funding';

const compactValue = (value: d3.NumberValue): string =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact'
  }).format(value as number);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  mutedText: {
    color: '#999999'
  }
}));

type CompanyFundingDetailsCardProps = {
  funding: CompanyFunding;
};

const processFundingRound = (round: string) => {
  return round
    .split('_')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');
};

function CompanyFundingDetailsCard({
  funding
}: CompanyFundingDetailsCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Typography className={classes.title}>
              {processFundingRound(funding.investment_type)}
            </Typography>
            <Typography>
              <CalendarTodayIcon className={classes.icon} />
              {funding.announced_on}
            </Typography>
            <Typography>
              <AttachMoneyIcon className={classes.icon} />
              USD{' '}
              {compactValue(funding.raised_amount_usd) === '0'
                ? 'N/A'
                : compactValue(funding.raised_amount_usd)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>Lead investors</Typography>
            {funding.investors &&
              Object.values(funding.investors).map(investor => (
                <Chip
                  key={investor.uuid}
                  avatar={<Avatar src={investor.logo_url}></Avatar>}
                  label={investor.name}
                  className={classes.chip}
                />
              ))}
            {Object.values(funding.investors).length === 0 && (
              <Typography className={classes.mutedText}>Unknown</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CompanyFundingDetailsCard;
