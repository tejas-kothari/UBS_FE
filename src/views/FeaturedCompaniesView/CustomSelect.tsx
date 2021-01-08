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
    backgroundColor: `${theme.palette.background.paper} !important`
  },
  select: {
    '&:focus': {
      backgroundColor: `${theme.palette.background.paper} !important`
    }
  }
}));

type CustomSelectProps = {
  label: string;
  id: string;
  values: string[];
  value: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  updateCompanies: () => void;
};

function CustomSelect({
  label,
  id,
  values,
  value,
  handleChange,
  updateCompanies
}: CustomSelectProps) {
  const classes = useStyles();

  return (
    <Grid item>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="featured-companies-category-select-label">
          {label}
        </InputLabel>
        <Select
          labelId={`featured-companies-${id}-select-label`}
          value={value}
          onChange={event => {
            handleChange(event.target.value as string);
            updateCompanies();
          }}
          label={label}
          className={classes.select}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {values.map(value => (
            <MenuItem value={value} key={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default CustomSelect;
