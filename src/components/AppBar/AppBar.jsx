import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import css from './AppBar.module.css'

const AppBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <header className={css.headerNav}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;