import { useEffect, useState, MouseEvent } from 'react';
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
import { selectShipments } from '../../utils/reducers';
import { useSelector } from 'react-redux';
import { column } from '../shipments-list/ShipmentsList';
import CardItem from './card-item/CardItem';
import Layout from '../layout/Layout';
import { fetchShipmentsData } from '../../utils/api/fetchShipmentsData';
import { updateShipmentData } from '../../utils/api/updateShipmentData';
import ErrorPage from '../error/Error';
import { AxiosError } from 'axios';

const ShipmentOverview = () => {
  const dispatch = useAppDispatch();
  const { shipId } = useParams();

  const navigate = useNavigate();

  const { pathname, search } = useLocation();

  const shipIdFromEdit = search.slice(1);
  const isEdit = pathname.includes('/edit');

  const shipments = useSelector(selectShipments);

  const foundShipment = shipments.find(
    (shipment) => shipment.trackingNo === (isEdit ? shipIdFromEdit : shipId)
  );

  const [consignee, setConsignee] = useState(foundShipment?.consignee);
  const [customer, setCustomer] = useState(foundShipment?.customer);
  const filteredColumn = column.filter(({ heading }) => heading);

  useEffect(() => {
    dispatch(fetchShipmentsData());
  }, [dispatch]);

  const handleChangeValue = (name: string, e: any) => {
    e.preventDefault();
    if (name === 'consignee') {
      setConsignee(e.target.value);
    }
    if (name === 'customer') {
      setCustomer(e.target.value);
    }
    return;
  };

  const handleUpdateShipment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (shipIdFromEdit && foundShipment && consignee && customer) {
        await dispatch(
          updateShipmentData({
            shipIdFromEdit,
            foundShipment: {
              ...foundShipment,
              consignee: consignee,
              customer: customer,
            },
          })
        );
      }
      navigate('/');
    } catch (error) {
      return <ErrorPage error={error as AxiosError} />;
    }
  };

  return (
    <Layout>
      <Card className='mt-6 w-full border-radius-md border-solid'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <Typography className='uppercase font-bold text-[#cfd8dc]'>
            {isEdit ? 'edit your' : null} shipment details
          </Typography>
        </CardHeader>
        <form>
          <CardBody className=' grid gap-4 grid-cols-2 grid-rows-3'>
            {filteredColumn?.map(({ name }) => {
              const placeholderValue = foundShipment
                ? foundShipment[name as keyof typeof foundShipment]
                : '';

              return (
                <CardItem
                  isEdit={isEdit}
                  key={name}
                  label={name}
                  name={name}
                  onChange={(e) => handleChangeValue(name, e)}
                  value={placeholderValue}
                />
              );
            })}
          </CardBody>
        </form>
        <CardFooter className='pt-0 flex justify-between'>
          <Button className='bg-[#bbdefb]' onClick={() => navigate(-1)}>
            <FaArrowLeft fill='#42a5f5' />
          </Button>
          {isEdit ? (
            <Button type='submit' onClick={handleUpdateShipment}>
              save
            </Button>
          ) : (
            <Button
              onClick={() => navigate(`/edit?${foundShipment?.trackingNo}`)}
            >
              edit
            </Button>
          )}
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default ShipmentOverview;
