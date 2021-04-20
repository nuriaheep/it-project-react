import { useState, useEffect } from 'react';
import axios from 'axios';
import {Gallery} from "./App.styles";
import ContainerImages from './components/ContainerImages';

function App() {
  const [imagesList, setImagesList] = useState({
    photos: [],
    loading: false
  });
  const [pageNum, setPageNum] = useState(1);

  async function getImages(pageNum) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${pageNum}&_limit=24`);
    setImagesList({ photos: [...imagesList.photos, ...response.data], loading: false });
  }

  useEffect(() => {
    getImages(pageNum);
    // eslint-disable-next-line
  }, [pageNum]);

  useEffect(() => {
    const checkIfReachBottom = () => {
      let scrollTop = document.documentElement.scrollTop,
        windowHeight = window.innerHeight,
        height = document.body.scrollHeight - windowHeight,
        scrollPercentage = (scrollTop / height);
      if (scrollPercentage > 0.9) {
        setPageNum(pageNum + 1);
      }
    };
    window.addEventListener('scroll', checkIfReachBottom);
    return () => {
      window.removeEventListener('scroll', checkIfReachBottom);
    };
    // eslint-disable-next-line
  }, [imagesList]);

  function onItemClick(id) {
    const newListImages = imagesList.photos.filter((item) => item.id !== id);
    setImagesList({ photos: newListImages, loading: false });
  };

  return (
    <Gallery>
      <h1>Gallery</h1>
      <div>
        <ContainerImages images={imagesList.photos} onItemClick={onItemClick} />
      </div>
    </Gallery>
  );
}

export default App;
