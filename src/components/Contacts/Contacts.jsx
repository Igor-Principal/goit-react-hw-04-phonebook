import PropTypes from 'prop-types';
import css from './contacts.module.css';

const Contacts = ({ data, handleDelete }) => {
  const handleClick = e => {
    handleDelete(e.target.id);
  };

  const elements = data.map(({ name, number, id }) => (
    <li className={css.item} key={id}>
      {name} : {number}
      <button
        className={css.button}
        id={id}
        type="button"
        onClick={handleClick}
      >
        Delete
      </button>
    </li>
  ));
  return (
    <>
      <ul className={css.list}>{elements}</ul>
    </>
  );
};

export default Contacts;

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
