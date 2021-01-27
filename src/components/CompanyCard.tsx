import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CategoryIcon from '@material-ui/icons/Category';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import RemoveIcon from '@material-ui/icons/Remove';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Company, { categories as hitechCategories } from '../interfaces/company';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  diff: {
    fontSize: '1rem'
  },
  spacer: {
    flexGrow: 1
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    flexGrow: 1
  },
  rank: {
    width: 120
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  },
  detailsContainer: {
    maxWidth: 600,
    width: '100%'
  },
  details: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    width: 120,
    height: 120,
    objectFit: 'contain'
  },
  greenDiff: {
    color: '#228C22'
  },
  redDiff: {
    color: '#B53737'
  }
}));

type CompanyCardProps = {
  company: Company;
  showRank: boolean;
  addLink: boolean;
};

const processFundingRound = (round: string) => {
  return round
    .split('_')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');
};

function CompanyCard({ company, showRank, addLink }: CompanyCardProps) {
  const classes = useStyles();
  const companyHomepage = (
    <Typography noWrap={true} color="textSecondary">
      <LanguageIcon className={classes.icon} />
      {company.homepage_url || 'unknown'}
    </Typography>
  );

  const [comparing, setComparing] = useState<boolean>(
    JSON.parse(window.localStorage.getItem('comparison') || '{}')[
      company.uuid
    ] !== undefined
  );

  useEffect(() => {
    const comparison = JSON.parse(
      window.localStorage.getItem('comparison') || '{}'
    );

    if (comparing) {
      comparison[company.uuid] = company;
    } else {
      delete comparison[company.uuid];
    }

    window.localStorage.setItem('comparison', JSON.stringify(comparison));
    // window.location.reload();
  }, [company, comparing]);

  const cardContent = (
    <CardContent className={classes.cardContent}>
      <Grid container spacing={2} alignItems="center">
        {showRank && (
          <Grid item className={classes.rank}>
            <Typography className={classes.title} gutterBottom>
              {company.rank}.
            </Typography>
            <div
              className={company.diff > 0 ? classes.greenDiff : classes.redDiff}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {company.diff > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              <Typography className={classes.diff}>
                {Math.abs(company.diff).toFixed(1)}%
              </Typography>
            </div>
          </Grid>
        )}
        <Grid item>
          <img
            className={classes.img}
            src={company.logo_url}
            alt={company.name}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.title} gutterBottom>
            {company.name}
          </Typography>
          <Grid container spacing={1} className={classes.detailsContainer}>
            <Grid item xs={6}>
              <Tooltip
                title={'Category: ' + company.category_groups_list}
                placement="bottom-start"
              >
                <Typography
                  className={classes.details}
                  noWrap={true}
                  color="textSecondary"
                >
                  <CategoryIcon className={classes.icon} />
                  {company.category_groups_list
                    .split(',')
                    .filter(
                      category => hitechCategories.indexOf(category) !== -1
                    )[0] || 'unknown'}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip
                title={'Country: ' + company.country}
                placement="bottom-start"
              >
                <Typography
                  className={classes.details}
                  noWrap={true}
                  color="textSecondary"
                >
                  <LocationOnIcon className={classes.icon} />
                  {company.country || 'unknown'}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip
                title={'Number of employees: ' + company.employee_count}
                placement="bottom-start"
              >
                <Typography
                  className={classes.details}
                  noWrap={true}
                  color="textSecondary"
                >
                  <PeopleIcon className={classes.icon} />
                  {company.employee_count || 'unknown'}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip
                title={
                  'Last funding round: ' +
                  processFundingRound(company.last_funding_round)
                }
                placement="bottom-start"
              >
                <Typography
                  className={classes.details}
                  noWrap={true}
                  color="textSecondary"
                >
                  <ShowChartIcon className={classes.icon} />
                  {processFundingRound(company.last_funding_round) || 'unknown'}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip
                title={
                  'Total funding: USD ' +
                    new Intl.NumberFormat('en-US', {
                      notation: 'compact'
                    }).format(company.total_funding_usd) || 'unknown'
                }
                placement="bottom-start"
              >
                <Typography
                  className={classes.details}
                  noWrap={true}
                  color="textSecondary"
                >
                  <AttachMoneyIcon className={classes.icon} />
                  USD{' '}
                  {new Intl.NumberFormat('en-US', {
                    notation: 'compact'
                  }).format(company.total_funding_usd) || 'unknown'}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              {!addLink ? (
                <a href={company.homepage_url} target="_blank" rel="noreferrer">
                  <Tooltip
                    title="Click to go to company homepage"
                    placement="bottom-start"
                  >
                    {companyHomepage}
                  </Tooltip>
                </a>
              ) : (
                companyHomepage
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );

  return (
    <Card className={classes.root}>
      {addLink ? (
        <NavLink to={`/companies/${company.uuid}`} style={{ width: '100%' }}>
          {cardContent}
        </NavLink>
      ) : (
        cardContent
      )}
      <CardActions>
        {comparing ? (
          <Tooltip title="Remove from comparison">
            <IconButton aria-label="delete" onClick={() => setComparing(false)}>
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add to comparison">
            <IconButton aria-label="add" onClick={() => setComparing(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

export default CompanyCard;
