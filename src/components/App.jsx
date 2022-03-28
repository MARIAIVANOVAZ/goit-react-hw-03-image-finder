import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { TailSpin } from 'react-loader-spinner';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    totalHits: null,
    loading: false,
    showModal: false,
    modalImage: '',
    error: null,
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
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('nothing found'));
      })
      .then(images => {
        if (images.hits.length === 0) {
          toast.warn('Nothing found with your search query');
          // this.setState({ loading: false, totalHits: null });

          return;
        }

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
            page: prevState.page + 1,
            totalHits: images.hits.length,
          };
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  openModal = largeImageURL => {
    this.setState({
      modalImage: largeImageURL,
    });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const {
      images,
      totalHits,
      loading,
      showModal,
      modalImage,
      error,
      inputValue,
    } = this.state;

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
        {!inputValue && <h2>Enter your search query!</h2>}

        <ImageGallery images={images} onClick={this.openModal} />

        {totalHits >= 11 && <Button onClick={this.fetchImages} />}
        {loading && (
          <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage} alt={modalImage} />
          </Modal>
        )}
        {error && <h3>{error.message}</h3>}
        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}

export default App;
