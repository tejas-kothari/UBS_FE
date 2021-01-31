import {
  Button,
  Grid,
  makeStyles,
  TablePagination,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Company, {
  categories,
  countries,
  phases,
  sizes
} from '../../interfaces/company';
import CompanyList from '../../components/CompanyList';
import CustomSelect from './CustomSelect';
import { SearchField } from './SearchField';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  selects: {
    marginBottom: theme.spacing(3)
  },
  button: {
    width: 250
  }
}));

function CompaniesListView() {
  const classes = useStyles();

  // Total number of startups in the database
  const [totalNumStartups, setTotalNumStartups] = useState<number>(0);
  // List of companies that will be displayed
  const [companies, setCompanies] = useState<Company[]>([]);
  // True when loading
  const [loading, setLoading] = useState<boolean>(true);

  const selects = {
    phases,
    sizes,
    categories,
    countries
  };

  // Filter for category
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  // Filter for country
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  // Filter for phase (last funding round)
  const [filterPhase, setFilterPhase] = useState<string[]>([]);
  // Filter for size
  const [filterSize, setFilterSize] = useState<string[]>([]);
  // Search field
  const [search, setSearch] = useState<string>('');

  // Page of the pagination
  const [page, setPage] = useState<number>(0);
  // Rows per page of the pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://ubs-be.herokuapp.com/get_startup_list?page=${page +
        1}&rowsPerPage=${rowsPerPage}&search=${search}&filterCategory=${filterCategory}&filterCountry=${filterCountry}&filterPhase=${filterPhase}&filterSize=${filterSize}`
    )
      .then(res => res.json())
      .then(data => {
        setCompanies(Object.values<Company>(data.filteredStartups));
        setTotalNumStartups(data.totalNumStartups);
        setLoading(false);
      });
  }, [
    filterCategory,
    filterCountry,
    filterPhase,
    filterSize,
    page,
    rowsPerPage,
    search
  ]);

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
        <SearchField search={search} setSearch={setSearch} />
        <Grid item style={{ display: 'flex' }}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              window.localStorage.setItem('comparison', '{}');
              window.location.reload();
            }}
          >
            Reset comparison
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Typography>Loading companies...</Typography>
      ) : companies.length ? (
        <>
          <CompanyList companies={companies} />
          <TablePagination
            component="div"
            count={totalNumStartups}
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

export default CompaniesListView;
