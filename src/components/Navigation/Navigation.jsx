import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

console.log(NavLink);

const Navigation = () => (
  <nav className={css.homeNav}>
    <NavLink
      to="/"
      className={css.navLink}>Home</NavLink>
    <NavLink
      to="/contacts"
      className={css.navLink}>Contacts</NavLink>
  </nav>
);

export default Navigation;
