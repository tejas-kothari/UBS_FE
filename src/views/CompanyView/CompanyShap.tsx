/* eslint-disable no-eval */
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Company from '../../interfaces/company';
import CompanyFeatures from '../../interfaces/company_features';
import AdditiveForceVisualizer from '../../shap/AdditiveForceVisualizer';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}));

type CompanyShapProps = {
  company: Company;
  companyFeatures: CompanyFeatures;
};

function CompanyShap({ company, companyFeatures }: CompanyShapProps) {
  const classes = useStyles();

  // Base values for props
  const [props, setProps] = useState<any>({
    outNames: ['f(x)'],
    baseValue: 1234,
    outValue: 8617560.94 - 1234,
    link: 'identity',
    featureNames: [
      'Age at Funding - Pre-Seed',
      'Age at Funding - Seed',
      'Age at Funding - Series Unknown',
      'Average organization age at events',
      'Event Appearances as Sponsor',
      'Funding Raised (USD) - Pre-Seed',
      'Funding Raised (USD) - Seed',
      'Funding Raised (USD) - Series A',
      'Funding Raised (USD) - Series Unknown',
      'Funding received from organisations founded previously by current Founders',
      'Funding received from previously held jobs by current Founders',
      'Number of Bachelors by Founders',
      'Number of Employees',
      'Number of Event Appearances',
      'Number of Founders',
      "Number of Founders' degrees within top 576 universities",
      'Number of Funding Rounds from organizations founded by current Founders',
      'Number of Funding Rounds from previously held jobs by current Founders',
      'Number of Investors - Seed',
      'Number of Investors - Series Unknown',
      'Number of Masters by Founders',
      'Number of PhDs by Founders',
      'Number of employee jobs held by Founders previously',
      'Number of executive jobs held by Founders previously',
      'Number of organisations founded previously by current Founders',
      'Number of previous funding rounds',
      'Organization Age'
    ],
    features: [
      { effect: 0.0201355094, value: 0 },
      { effect: 0.0642521832, value: 0 },
      { effect: 0.0258998403, value: 0 },
      { effect: 0.0424521424, value: 0 },
      { effect: 0.0116938142, value: 0 },
      { effect: 0.0218116713, value: 0 },
      { effect: 0.0914389092, value: 0 },
      { effect: 0.0327837615, value: 0 },
      { effect: 0.0329224608, value: 0 },
      { effect: 0.0243356912, value: 0 },
      { effect: 0.0426838242, value: 0 },
      { effect: 0.0304178418, value: 0 },
      { effect: 0.0413570241, value: 0 },
      { effect: 0.0280771428, value: 0 },
      { effect: 0.0414604415, value: 0 },
      { effect: 0.0320875806, value: 0 },
      { effect: 0.0183379709, value: 0 },
      { effect: 0.0383619463, value: 0 },
      { effect: 0.0434523978, value: 0 },
      { effect: 0.0160896495, value: 0 },
      { effect: 0.0231795944, value: 0 },
      { effect: 0.0172002551, value: 0 },
      { effect: 0.0283788655, value: 0 },
      { effect: 0.0550220245, value: 0 },
      { effect: -0.0270843611, value: 0 },
      { effect: 0.033089869, value: 0 },
      { effect: -0.1159932272, value: 0 }
    ],
    plot_cmap: 'RdBu'
  });

  useEffect(() => {
    fetch(`https://ubs-be.herokuapp.com/get_startup_shap?uuid=${company.uuid}`)
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length !== 0) {
          // Set the prop data from endpoint data
          data['featureNames'] = eval(data['featureNames']);
          eval(`data['features'] = ` + data['features']);
          eval(`data['outNames'] = ` + data['outNames']);
          setProps(data);
        }
      });
  }, [company.uuid]);

  return (
    <Card>
      <CardContent>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" align="left" className={classes.title}>
              Features Contribution
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ overflowX: 'auto' }}>
            <AdditiveForceVisualizer
              {...props}
              funding={companyFeatures['Predicted Funding']}
              labelMargin={20}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CompanyShap;
