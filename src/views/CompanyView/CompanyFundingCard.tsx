import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import React from 'react';
import CompanyFunding from '../../interfaces/company_funding';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  chip: {
    marginRight: theme.spacing(1)
  }
}));

type CompanyFundingCardProps = {
  funding: CompanyFunding;
};

const processFundingRound = (round: string) => {
  return round
    .split('_')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');
};

function CompanyFundingCard({ funding }: CompanyFundingCardProps) {
  const classes = useStyles();
  console.log(funding);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography>
              {processFundingRound(funding.investment_type)}
            </Typography>
            <Typography>{funding.announced_on}</Typography>
            <Typography>USD {funding.raised_amount_usd}</Typography>
          </Grid>
          <Grid item>
            <Typography>Lead investors</Typography>
            {Object.values(funding.investors).map(investor => (
              <Chip
                key={investor.uuid}
                avatar={<Avatar src={investor.logo_url}></Avatar>}
                label={investor.name}
                className={classes.chip}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CompanyFundingCard;
