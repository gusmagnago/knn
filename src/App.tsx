import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import ShipmentsList from './components/shipments-list/ShipmentsList';
import { store } from './utils/store';
import ShipmentOverview from './components/shipment-card/ShipmentOverview';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ShipmentsList />,
    },
    { path: '/:shipId', element: <ShipmentOverview /> },
  ]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
