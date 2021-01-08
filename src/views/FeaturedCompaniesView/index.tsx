import { Grid, makeStyles, TablePagination } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useState } from 'react';
import Page from '../../components/Page';
import CompanyCard from './CompanyCard';
import CustomSelect from './CustomSelect';
import companiesData from '../../tmp_data/crunchbase_data_heads/organizations.json';
import { Company } from '../../interfaces/company';
import { phases, categories, sizes, countries } from "./CompanyFilters"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  formControl: {
    minWidth: 150,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  selects: {
    marginBottom: theme.spacing(3)
  },
  companyCards: {}
}));

function FeaturedCompaniesView() {
  const classes = useStyles();

  const selects = {
    phases,
    sizes,
    categories,
    countries,
    investor: ['Investor A']
  };

  const allCompanies = companiesData as Company[];

  const [category, setCategory] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [phase, setPhase] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [investor, setInvestor] = useState<string>('');

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  let companies = allCompanies;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function updateCompanies() {
    setPage(0);
  }
  
  companies = allCompanies.filter(company => {
    if (
      category &&
      !company.category_list
        .split(',')
        .find(companyCategory => category === companyCategory)
    ) {
      return false;
    }

    if (country && company.country_code !== country) {
      return false;
    }

    if (phase && company.last_funding_type !== phase) {
      return false;
    }

    if (size && company.employee_count !== size) {
      return false;
    }

    // Filter investors later

    return true;
  });

  console.log('hi');

  return (
    <Page title="Featured Companies" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Featured Companies
      </Typography>
      <Grid container spacing={2} className={classes.selects}>
        <CustomSelect
          label="Category"
          id="category"
          value={category}
          handleChange={setCategory}
          updateCompanies={updateCompanies}
          values={selects.categories}
        />
        <CustomSelect
          label="Country"
          id="country"
          value={country}
          handleChange={setCountry}
          updateCompanies={updateCompanies}
          values={selects.countries}
        />
        <CustomSelect
          label="Phase"
          id="phase"
          value={phase}
          handleChange={setPhase}
          updateCompanies={updateCompanies}
          values={selects.phases}
        />
        <CustomSelect
          label="Size"
          id="size"
          value={size}
          handleChange={setSize}
          updateCompanies={updateCompanies}
          values={selects.sizes}
        />
        <CustomSelect
          label="Investors"
          id="investors"
          value={investor}
          handleChange={setInvestor}
          updateCompanies={updateCompanies}
          values={selects.investor}
        />
      </Grid>

      {companies.length ? (
        <>
          <Grid
            container
            spacing={2}
            direction="column"
            className={classes.companyCards}
          >
            {companies
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(company => (
                <CompanyCard company={company} key={company.uuid} />
              ))}
          </Grid>
          <TablePagination
            component="div"
            count={companies.length}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography>Companies Not Found!</Typography>
      )}
    </Page>
  );
}

export default FeaturedCompaniesView;
