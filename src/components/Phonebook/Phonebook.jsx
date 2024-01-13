import { Component } from 'react';
import css from './phonebook.module.css';

class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  getInfo = e => {
    e.preventDefault();
    const normalizeName = this.state.name;
    const includeName = this.props.data.some(
      contact =>
        contact.name.toLocaleLowerCase() ===
        normalizeName.toLocaleLowerCase().trim()
    );
    if (includeName) {
      alert(`${normalizeName} is already in contacts`);
    } else {
      this.props.createContact({
        name: this.state.name.trim(),
        number: this.state.number,
      });
    }
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.getInfo}>
        <label className={css.titleSmall} htmlFor="name">
          Name
        </label>
        <input
          className={css.input}
          type="text"
          id="name"
          name="name"
          required
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label className={css.titleSmall} htmlFor="number">
          Number
        </label>
        <input
          className={css.input}
          type="tel"
          name="number"
          id="nomber"
          required
          value={this.state.number}
          onChange={this.handleChange}
        />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default Phonebook;
