import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type AppAlertProps = {
  status?: 'success' | 'info' | 'error' | 'warning';
  mb?: number;
  title: ReactNode;
  content: ReactNode;
};

const AppAlert = (props: AppAlertProps) => {
  const { status = 'info', title, content, ...rest } = props;

  return (
    <Alert
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={4}
      {...rest}
    >
      <AlertIcon boxSize="40px" mr={0} />

      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>

      <AlertDescription maxWidth="sm">{content}</AlertDescription>
    </Alert>
  );
};

export default AppAlert;
