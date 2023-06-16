import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { FaArrowLeft } from 'react-icons/fa';

import { useAppDispatch } from '../../utils/store';
import { fetchShipmentsData, selectShipments } from '../../utils/reducers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { column } from '../shipments-list/ShipmentsList';
import CardItem from './card-item/CardItem';
import Layout from '../layout/Layout';

const ShipmentOverview = () => {
  const dispatch = useAppDispatch();
  const { shipId } = useParams();

  const { pathname, search } = useLocation();

  const urlSearchParams = new URLSearchParams(search);
  const shipIdFromEdit = urlSearchParams.get('shipId');

  const isEdit = pathname.includes('/edit');

  const navigate = useNavigate();

  const shipments = useSelector(selectShipments);

  const foundShipment = shipments.find(
    (shipment) => shipment.trackingNo === shipId || shipIdFromEdit
  );

  const filteredColumn = column.filter(({ heading }) => heading);

  useEffect(() => {
    dispatch(fetchShipmentsData());
  }, [dispatch, shipId]);

  const handleEditClick = () => {
    if (isEdit) {
      return console.log('aaaaa');
    }
    return navigate(`/edit?shipId=${foundShipment?.trackingNo}`);
  };

  return (
    <Layout>
      <Card className='mt-6 w-full border-radius-md border-solid'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <Typography className='uppercase font-bold text-[#cfd8dc]'>
            shipment details
          </Typography>
        </CardHeader>
        <CardBody className=' grid gap-4 grid-cols-2 grid-rows-3'>
          {filteredColumn?.map(({ name }) => {
            const placeholderValue = foundShipment
              ? foundShipment[name as keyof typeof foundShipment]
              : '';

            return (
              <CardItem
                label={name}
                value={placeholderValue}
                key={name}
                isEdit={isEdit}
              />
            );
          })}
        </CardBody>
        <CardFooter className='pt-0 flex justify-between'>
          <Button className='bg-[#bbdefb]' onClick={() => navigate(-1)}>
            <FaArrowLeft fill='#42a5f5' />
          </Button>
          <Button onClick={handleEditClick}>{isEdit ? 'save' : 'edit'}</Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default ShipmentOverview;
