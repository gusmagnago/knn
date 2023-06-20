import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../utils/store';
import { selectLoading, selectShipments } from '../../utils/reducers';

import { Card } from '@material-tailwind/react';

import ShipmentsTable from './components/table/ShipmentsTable';
import Loader from '../loader/Loader';
import { fetchShipmentsData } from '../../utils/api/fetchShipmentsData';
import ErrorPage from '../error/Error';
import { AxiosError } from 'axios';

export const column = [
  { name: 'orderNo', heading: 'orderno' },
  { name: 'date', heading: 'deliverydate' },
  { name: 'customer', heading: 'customer' },
  { name: 'trackingNo', heading: 'trackingno' },
  { name: 'status', heading: 'status' },
  { name: 'consignee', heading: 'consignee' },
  { name: 'edit', heading: '' },
  { name: 'delete', heading: '' },
];

const ShipmentsList = () => {
  const dispatch = useAppDispatch();

  const shipments = useSelector(selectShipments);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchShipmentsData()).unwrap();
      } catch (error) {
        return <ErrorPage error={error as AxiosError} />;
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Card className='overflow-scroll h-full w-full rounded-none'>
      <ShipmentsTable column={column} data={shipments} />
    </Card>
  );
};

export default ShipmentsList;
