import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../utils/store';
import { useEffect } from 'react';
import {
  fetchShipmentsData,
  selectError,
  selectLoading,
  selectShipments,
} from '../../utils/reducers';

const ShipmentsList = () => {
  const dispatch = useAppDispatch();

  const shipments = useSelector(selectShipments);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchShipmentsData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ShipmentsList;
