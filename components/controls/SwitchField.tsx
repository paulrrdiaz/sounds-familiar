import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

type SwitchFieldProps = {
  label: string;
  id: string;
};

const SwitchField = (props: SwitchFieldProps) => {
  const { label, id, ...rest } = props;
  const switchProps = {
    id,
    ...rest
  };

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor={id} mb="0">
        {label}
      </FormLabel>
      <Controller
        name={id}
        {...switchProps}
        render={({ field }) => <Switch {...field} />}
      />
    </FormControl>
  );
};

export default SwitchField;
