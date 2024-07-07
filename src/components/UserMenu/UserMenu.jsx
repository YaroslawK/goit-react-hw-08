import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import css from './UserMenu.module.css'

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={css.userMenuContainer}>
      <span>Welcome, <span className={css.userName}>{user.name}</span></span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
