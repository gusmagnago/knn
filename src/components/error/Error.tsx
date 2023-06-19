import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

interface ErrorProps {
  error: AxiosError;
}

const ErrorPage = ({ error }: ErrorProps) => {
  const navigate = useNavigate();

  return (
    <Card className='mt-6 w-full'>
      <CardHeader>Error {error.status}</CardHeader>
      <CardBody>
        <Typography variant='h5' color='blue-gray' className='mb-2'>
          {error.message}
        </Typography>
      </CardBody>
      <CardFooter className='pt-0'>
        <Button onClick={() => navigate('/')}>Go back to the main page</Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorPage;
