import { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from 'components/Button/Button';

import { fetchImages } from '../Cervices/FetchApi';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Paragraph } from './Paragraph/Paragraph';
import { Button } from './Button/Button';

import './App.css';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [imgArr, setImgArr] = useState([]);
  const [fetchArrLenght, setFetchArrLenght] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [targetImg, setTargetImg] = useState(null);

  const modalClose = () => {
    setShowModal(false);
  };

  const takeQuery = query => {
    setQuery(query);
    setPage(1);
    setImgArr([]);
    setShowEmpty(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (query === '' && page === 1) {
      return;
    }
    setLoading(true);
    fetchImages(query, page)
      .then(images => updateArrs(images))
      .catch(error => console.log('Something went wrong'))
      .finally(setLoading(false));
  }, [query, page]);

  const updateArrs = images => {
    if (!images.hits.length) {
      setShowEmpty(true);
    }
    setImgArr(prevState => [...prevState, ...images.hits]);
    setFetchArrLenght(images.hits.length);
  };

  const imgCacher = image => {
    setTargetImg(image);
    setShowModal(true);
  };

  return (
    <>
      <Searchbar takeQuery={takeQuery} />
      {loading && <Loader />}
      <ImageGallery imgArr={imgArr} imgCacher={imgCacher} />
      {imgArr.length > 0 && fetchArrLenght === 12 && (
        <Button text={'Load more'} func={loadMore} type={'button'} />
      )}
      {showModal && <Modal targetImg={targetImg} modalClose={modalClose} />}
      {showEmpty && <Paragraph />}
    </>
  );
};
