import { Grid, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

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

type CustomSelectProps = {
  label: string;
  id: string;
  values: string[];
  value: string[];
  handleChange: React.Dispatch<React.SetStateAction<string[]>>;
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
      <Autocomplete
        id={`featured-companies-${id}-autocomplete`}
        // style={{ width: 300 }}
        options={values}
        className={classes.formControl}
        autoHighlight
        multiple
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password' // disable autocomplete and autofill
            }}
          />
        )}
        value={value}
        onChange={(event, value) => {
          handleChange(value);
          updateCompanies();
        }}
        limitTags={1}
      />
    </Grid>
  );
}

export default CustomSelect;
