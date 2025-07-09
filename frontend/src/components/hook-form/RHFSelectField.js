import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const RHFSelectField = ({ name, label, children, ...other }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <FormControl fullWidth error={!!errors[name]} margin="normal">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            label={label}
            {...field}
            {...other}
          >
            {children}
          </Select>
        )}
      />

      {errors[name] && (
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RHFSelectField;
