import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function AppWrapper() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default AppWrapper;