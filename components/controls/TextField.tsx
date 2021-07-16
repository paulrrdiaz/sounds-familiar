import { ReactNode } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Input
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

import { isNotNill } from '@/utils';

type TextFieldPros = {
  type?: string;
  label: string;
  id: string;
  placeholder?: string;
  rightElement?: ReactNode;
  feedback?: FieldError | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField = (props: TextFieldPros) => {
  const { type = 'text', id, label, feedback, rightElement, ...rest } = props;
  const hasError = isNotNill(feedback);
  const inputProps = {
    type,
    id,
    bg: 'white',
    focusBorderColor: 'purple.500',
    ...rest
  };

  return (
    <FormControl isInvalid={hasError} id={id}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input {...inputProps} />
        {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      </InputGroup>
      <FormErrorMessage mt={1}>{feedback?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
