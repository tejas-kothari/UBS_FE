import { Grid, makeStyles, TablePagination } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { Company } from '../../interfaces/company';
import CompanyCard from './CompanyCard';
import { categories, countries, phases, sizes } from './CompanyFilters';
import CustomSelect from './CustomSelect';
import { SearchField } from './SearchField';

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

const elementInArray = (el: string, arr: string[]): boolean => {
  // When searching elements of unknown, target string is automatically replaced with ""
  arr = arr.map(value => {
    if (value.toLowerCase() === 'unknown') return '';
    return value;
  });
  return arr.some(str => str === el);
};

function FeaturedCompaniesView() {
  const classes = useStyles();
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch('https://ubs-be.herokuapp.com/get_startup_list')
      .then(res => res.json())
      .then(data => {
        setAllCompanies(
          Object.values<Company>(data).sort(
            (a: Company, b: Company) => a.rank - b.rank
          )
        );
      });
  }, []);

  const selects = {
    phases,
    sizes,
    categories,
    countries,
    investor: ['Investor A']
  };

  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  const [filterPhase, setFilterPhase] = useState<string[]>([]);
  const [filterSize, setFilterSize] = useState<string[]>([]);
  const [filterInvestor, setFilterInvestor] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

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

  const updateCompanies = () => {
    setPage(0);
  };

  companies = allCompanies.filter(company => {
    if (
      filterCategory.length &&
      !company.category_groups_list
        .split(',')
        .some(companyCategory =>
          elementInArray(companyCategory, filterCategory)
        )
    ) {
      return false;
    }

    if (
      filterCountry.length &&
      !elementInArray(company.country, filterCountry)
    ) {
      return false;
    }

    if (
      filterPhase.length &&
      !elementInArray(company.num_funding_rounds.toString(), filterPhase)
    ) {
      return false;
    }

    if (
      filterSize.length &&
      !elementInArray(company.employee_count, filterSize)
    ) {
      return false;
    }

    if (
      search !== '' &&
      company.name.toLowerCase().indexOf(search.toLowerCase()) === -1
    ) {
      return false;
    }

    // Filter investors later

    return true;
  });

  return (
    <Page title="Featured Companies" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Featured Companies
      </Typography>
      <Grid container spacing={2} className={classes.selects}>
        <CustomSelect
          label="Category"
          id="category"
          value={filterCategory}
          handleChange={setFilterCategory}
          updateCompanies={updateCompanies}
          values={selects.categories}
        />
        <CustomSelect
          label="Country"
          id="country"
          value={filterCountry}
          handleChange={setFilterCountry}
          updateCompanies={updateCompanies}
          values={selects.countries}
        />
        <CustomSelect
          label="Phase"
          id="phase"
          value={filterPhase}
          handleChange={setFilterPhase}
          updateCompanies={updateCompanies}
          values={selects.phases}
        />
        <CustomSelect
          label="Size"
          id="size"
          value={filterSize}
          handleChange={setFilterSize}
          updateCompanies={updateCompanies}
          values={selects.sizes}
        />
        <CustomSelect
          label="Investors"
          id="investors"
          value={filterInvestor}
          handleChange={setFilterInvestor}
          updateCompanies={updateCompanies}
          values={selects.investor}
        />
        <SearchField search={search} setSearch={setSearch} />
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
