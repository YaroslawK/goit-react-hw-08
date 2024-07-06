import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.filter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label htmlFor="search">Find contacts by name</label><br />
      <input
        type="text"
        id="search"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
