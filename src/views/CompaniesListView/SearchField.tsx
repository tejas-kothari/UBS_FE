import { Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react';

type SearchFieldProps = {
  // String for search
  search: string;
  // Method to set the search string
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 250,
    backgroundColor: `${theme.palette.background.paper} !important`
  },
  select: {
    '&:focus': {
      backgroundColor: `${theme.palette.background.paper} !important`
    }
  }
}));

export function SearchField({ search, setSearch }: SearchFieldProps) {
  const classes = useStyles();
  return (
    <Grid item>
      <TextField
        className={classes.formControl}
        label="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        variant="outlined"
      />
    </Grid>
  );
}
