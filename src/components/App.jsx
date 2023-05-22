import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { AppWrap } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    arrayOfImg: [],
    page: 1,
    showButton: false,
    showLoader: false,
    showModal: false,
    currentImg: '',
  };

  onSubmitForm = query => {
    this.setState({ query: '', arrayOfImg: [], page: 1 });
    this.setState({ query: query });
    this.fetchAPI(query, 1);
  };

  onButtonClick = () => {
    // console.log('button');
    this.fetchAPI(this.state.query, this.state.page + 1);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // Показ лоадера

  fetchAPI(query, page) {
    let BASE_URL = 'https://pixabay.com/api/?';
    let KEY = '35078540-2c141ef0988cb1d0018a14385';
    let PER_PAGE = 12;
    let URL = `${BASE_URL}q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

    this.setState({ showLoader: true });

    fetch(URL)
      .then(response => {
        return response.json();
      })

      .then(data => {
        if (this.state.page === 1) {
          toast.success(
            `По вашому запиту знайдено ${data.totalHits} результатів!`
          );
        }

        this.setState(prevState => ({
          arrayOfImg: [...prevState.arrayOfImg, ...data.hits],
        }));

        // перевірка показу кнопки
        let totalNumberOfImg = data.totalHits;
        let Downloaded = PER_PAGE * this.state.page;
        if (totalNumberOfImg > Downloaded) {
          this.setState({ showButton: true });
        } else {
          this.setState({ showButton: false });
        }

        this.setState({ showLoader: false });
      })

      .catch(error => {
        this.setState({ error });
        // Error handling
      });
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  setCurrentImg = imgLink => {
    this.setState({ currentImg: imgLink });
  };

  render() {
    return (
      <AppWrap>
        <ToastContainer autoClose={1000} />
        <Searchbar onSubmit={this.onSubmitForm} />
        {this.state.arrayOfImg.length > 0 && (
          <ImageGallery
            images={this.state.arrayOfImg}
            showModal={this.showModal}
            setCurrentImg={this.setCurrentImg}
          />
        )}
        {this.state.showButton && <Button onClick={this.onButtonClick} />}
        {this.state.showLoader && <Loader />}
        {this.state.showModal && (
          <Modal
            currentImg={this.state.currentImg}
            hideModal={this.hideModal}
          />
        )}
      </AppWrap>
    );
  }
}
