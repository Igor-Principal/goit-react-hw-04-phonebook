import css from './app.module.css';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { saveTolS, getFromLS } from './helpers/localeStorage';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
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

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     if (getFromLS('contacts')) {
//       this.setState({
//         contacts: getFromLS('contacts'),
//       });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts.length !== this.state.contacts.length) {
//       saveTolS('contacts', this.state.contacts);
//       this.setState({ contacts: getFromLS('contacts') });
//     }
//   }

//   createContact = data => {
//     const user = {
//       ...data,
//       id: nanoid(),
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, user],
//     }));
//   };

//   handleFilter = ({ target }) => {
//     this.setState({ filter: target.value });
//   };

//   handleDelete = id => {
//     this.setState(prev => ({
//       contacts: prev.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const filteted = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
//     );
//     return (
//       <div className={css.wrapper}>
//         <h1 className={css.title}>Phonebook</h1>
//         <Phonebook
//           createContact={this.createContact}
//           data={this.state.contacts}
//         />
//         {this.state.contacts.length > 0 && (
//           <>
//             <h2 className={css.title}>Contacts</h2>
//             <Filter filter={this.state.filter} onChange={this.handleFilter} />
//             <Contacts data={filteted} handleDelete={this.handleDelete} />
//           </>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
