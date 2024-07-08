import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className={css.homeNav}>
      <NavLink
        to="/"
        className={css.navLink}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={css.navLink}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
