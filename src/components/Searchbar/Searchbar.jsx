import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';
class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  handleInputChange = e => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      //   alert('Enter your search query');
      toast.info(' Enter your search query !');
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            name="inputValue"
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
