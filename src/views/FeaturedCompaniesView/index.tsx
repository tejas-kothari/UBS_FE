import { Grid, makeStyles, TablePagination } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CompanyCard from '../../components/CompanyCard';
import Page from '../../components/Page';
import Company, {
  categories,
  countries,
  phases,
  sizes
} from '../../interfaces/company';
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

function FeaturedCompaniesView() {
  const classes = useStyles();
  const [totalNumStartups, setTotalNumStartups] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  // const [filterInvestor, setFilterInvestor] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://ubs-be.herokuapp.com/get_startup_list?page=${page +
        1}&rowsPerPage=${rowsPerPage}&search=${search}&filterCategory=${filterCategory}&filterCountry=${filterCountry}&filterPhase=${filterPhase}&filterSize=${filterSize}`
    )
      .then(res => res.json())
      .then(data => {
        setCompanies(
          Object.values<Company>(data.filteredStartups).sort(
            (a: Company, b: Company) => a.rank - b.rank
          )
        );
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
      </Grid>

      {loading ? (
        <Typography>Loading companies...</Typography>
      ) : companies.length ? (
        <>
          <Grid
            container
            spacing={2}
            direction="column"
            className={classes.companyCards}
          >
            {companies.map(company => (
              <Grid item xs={12} key={company.uuid}>
                <NavLink to={`/companies/${company.uuid}`}>
                  <CompanyCard company={company} showRank={true} />
                </NavLink>
              </Grid>
            ))}
          </Grid>
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

export default FeaturedCompaniesView;
