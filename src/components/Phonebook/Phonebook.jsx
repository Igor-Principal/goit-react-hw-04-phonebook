import { useState } from 'react';
import css from './phonebook.module.css';

const Phonebook = ({ createContact, data }) => {

  const [info, setInfo] = useState({ name: '', number: '' });
  const { name, number } = info;

  const handleChange = ({ target }) => {
    setInfo({
      ...info,
      [target.name]: target.value,
    });
  };

  const getInfo = e => {
    e.preventDefault();
    const includeName = data.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase().trim()
    );
    if (includeName) {
      alert(`${name} is already in contacts`);
    } else {
      createContact({
        name: name.trim(),
        number: number,
      });
    }
    setInfo({
      name: '',
      number: '',
    });
  };

  
  return (
    <form className={css.form} onSubmit={getInfo}>
      <label className={css.titleSmall} htmlFor="name">
        Name
      </label>
      <input
        className={css.input}
        type="text"
        id="name"
        name="name"
        required
        value={name}
        onChange={handleChange}
      />
      <label className={css.titleSmall} htmlFor="number">
        Number
      </label>
      <input
        className={css.input}
        type="tel"
        name="number"
        id="number"
        required
        value={number}
        onChange={handleChange}
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Phonebook;