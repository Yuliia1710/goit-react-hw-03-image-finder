import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Header,
  Input,
  SearchForm,
  SearchButton,
  ButtonLabel,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      toast.warning('Запит не введено! Спробуйте ще раз!');
      this.clearInput();
      return;
    }
    this.props.onSubmit(this.state.query);
    this.clearInput();
  };

  clearInput = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header className="searchbar">
        <ToastContainer autoClose={1000} />
        <SearchForm className="form" onSubmit={this.handleSubmitForm}>
          <SearchButton type="submit" className="button">
            <ButtonLabel className="button-label">Search</ButtonLabel>
          </SearchButton>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.query}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
