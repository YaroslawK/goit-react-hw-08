import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => (
  <nav className={css.authNav}>
    <NavLink to="/register">
      Register
    </NavLink>
    <NavLink to="/login">
      Login
    </NavLink>
  </nav>
);

export default AuthNav;
