import css from './app.module.css';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { saveTolS, getFromLS } from './helpers/localeStorage';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(getFromLS('contacts') || []);
  const [filter, setfilter] = useState('');

  useEffect(() => {
    if (getFromLS('contacts')) setContacts(getFromLS('contacts'));
  }, []);

  useEffect(() => {
    saveTolS('contacts', contacts);
  }, [contacts]);

  const createContact = data => {
    const user = {
      ...data,
      id: nanoid(),
    };
    setContacts(prevState => [...prevState, user]);
  };

  const handleFilter = ({ target }) => {
    setfilter(target.value);
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <Phonebook createContact={createContact} data={contacts} />
      {contacts.length > 0 && (
        <>
          <h2 className={css.title}>Contacts</h2>
          <Filter filter={filter} onChange={handleFilter} />
          <Contacts data={filtered} handleDelete={handleDelete} />
        </>
      )}
    </div>
  );
};
