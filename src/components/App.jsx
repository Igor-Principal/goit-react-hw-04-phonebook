import { Component } from 'react';
import css from './app.module.css';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { saveTolS, getFromLS } from './helpers/localeStorage';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (getFromLS('contacts')) {
      this.setState({
        contacts: getFromLS('contacts'),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      saveTolS('contacts', this.state.contacts);
      this.setState({ contacts: getFromLS('contacts') });
    }
  }

  createContact = data => {
    const user = {
      ...data,
      id: nanoid(),
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, user],
    }));
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteted = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
    return (
      <div className={css.wrapper}>
        <h1 className={css.title}>Phonebook</h1>
        <Phonebook
          createContact={this.createContact}
          data={this.state.contacts}
        />
        {this.state.contacts.length > 0 && (
          <>
            <h2 className={css.title}>Contacts</h2>
            <Filter filter={this.state.filter} onChange={this.handleFilter} />
            <Contacts data={filteted} handleDelete={this.handleDelete} />
          </>
        )}
      </div>
    );
  }
}

export default App;
