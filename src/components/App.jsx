import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { TailSpin } from 'react-loader-spinner';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Button/Button';

class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    totalHits: null,
    loading: false,
    showModal: false,
    modalImage: '',
  };
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.inputValue);
    console.log(this.state.inputValue);

    if (prevState.inputValue !== this.state.inputValue) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = inputValue => {
    this.setState({ inputValue, images: [], page: 1, totalHits: 0 });
  };

  fetchImages = () => {
    this.setState({ loading: true });
    // const URL_API = `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=24940342-42b3a055a9e1adb2b613cb878&image_type=photo&orientation=horizontal&per_page=12`;
    fetch(
      `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=24940342-42b3a055a9e1adb2b613cb878&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(images => {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
            page: prevState.page + 1,
            totalHits: images.hits.length,
          };
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  openModal = largeImageURL => {
    console.log('click');
    console.log(largeImageURL);
    this.setState({ showModal: true, modalImage: largeImageURL });
    console.log(this.state);
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <SearchBar onSubmit={this.handleSearchSubmit} />

        <ImageGallery images={this.state.images} onClickImg={this.openModal} />
        {this.state.totalHits <= 11 ? null : (
          <Button onClick={this.fetchImages} />
        )}
        {this.state.loading && (
          <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />
        )}
        {this.state.showModal && (
          <Modal modalImage={this.state.modalImage} onClose={this.closeModal} />
        )}

        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}

export default App;
