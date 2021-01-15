import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CategoryIcon from '@material-ui/icons/Category';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Company } from '../../interfaces/company';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  spacer: {
    flexGrow: 1
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
  details: {
    maxWidth: 600,
    width: '100%'
  }
}));

type CompanyCardProps = {
  company: Company;
};

function CompanyCardModified({ company }: CompanyCardProps) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <img src={company.logo_url} alt={company.name} />
            </Grid>
            <Grid item>
              <Typography className={classes.title} gutterBottom>
                {company.name}
              </Typography>
              <Grid container spacing={1} className={classes.details}>
                <Grid item xs={6}>
                  <Typography noWrap={true} color="textSecondary">
                    <CategoryIcon className={classes.icon} />
                    {company.category_groups_list.split(',')[0] || 'unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography noWrap={true} color="textSecondary">
                    <LocationOnIcon className={classes.icon} />
                    {company.country || 'unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography noWrap={true} color="textSecondary">
                    <PeopleIcon className={classes.icon} />
                    {company.employee_count || 'unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography noWrap={true} color="textSecondary">
                    <ShowChartIcon className={classes.icon} />
                    {company.num_funding_rounds || 'unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography noWrap={true} color="textSecondary">
                    <AttachMoneyIcon className={classes.icon} />
                    USD {company.total_funding_usd || 'unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography noWrap={true} color="textSecondary">
                    <LanguageIcon className={classes.icon} />
                    {company.homepage_url || 'unknown'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <div className={classes.spacer}></div>
        <CardActions>
          <IconButton
            component={NavLink}
            to={`/companies/${company.uuid}`}
            size="small"
          ></IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CompanyCardModified;
