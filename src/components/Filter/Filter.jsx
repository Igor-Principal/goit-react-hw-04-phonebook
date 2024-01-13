import PropTypes from 'prop-types';

import css from './filter.module.css';

const Filter = ({ filter, onChange }) => {
  return (
    <div className={css.inputContainer}>
      <input
        type="text"
        name="filter"
        className={css.input}
        value={filter}
        onChange={onChange}
        placeholder="Write name"
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
