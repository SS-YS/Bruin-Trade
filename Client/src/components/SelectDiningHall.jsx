import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const halls = [
  'De Neve', 
  'Epicuria',
  'Bruin Plate', 
  'Feast'
];

export default function SelectDiningHall(props) {
  return (
    <div>
      <FormControl sx={{ width: 230 }}>
        <InputLabel>Select a dining hall</InputLabel>
        <Select
          value={props.value}
          onChange={props.onChange}
          input={<OutlinedInput label="Select a dining hall" />}
        >
          {halls.map((hall) => (
            <MenuItem
              key={hall}
              value={hall}
            >
              {hall}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}