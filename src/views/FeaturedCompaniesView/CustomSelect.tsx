import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 150,
    backgroundColor: theme.palette.background.paper
  }
}));

type CustomSelectProps = {
  label: string;
};

function CustomSelect({ label }: CustomSelectProps) {
  const classes = useStyles();

  return (
    <Grid item>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="featured-companies-category-select-label">
          {label}
        </InputLabel>
        <Select
          labelId="featured-companies-category-select-label"
          value=""
          // onChange={handleChange}
          label={label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

export default CustomSelect;
