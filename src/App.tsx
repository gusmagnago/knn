import { Provider } from 'react-redux';
import ShipmentsList from './components/shipments-list/ShipmentsList';
import { store } from './utils/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        Shipment Info
        <div>
          <ShipmentsList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
