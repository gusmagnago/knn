import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react';
import ShipmentsList from './components/shipments-list/ShipmentsList';
import { store } from './utils/store';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div>
          <ShipmentsList />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
