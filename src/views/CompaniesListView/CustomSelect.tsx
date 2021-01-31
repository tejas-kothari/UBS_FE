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
  // Label of the select dropdown
  label: string;
  // ID of the select element
  id: string;
  // Values of the dropdown
  values: string[];
  // Value that is currently selected
  value: string[];
  // Event Listener that is called when the selected values change
  handleChange: React.Dispatch<React.SetStateAction<string[]>>;
  // Function that is called after handleChange
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
