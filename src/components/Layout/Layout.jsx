import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';

const Layout = () => (
  <div>
    <AppBar />
    <Outlet/>
  </div>
);

export default Layout;
