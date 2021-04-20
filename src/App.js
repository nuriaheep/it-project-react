import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import {Gallery} from "./App.styles";
import ContainerImages from './components/ContainerImages';


function App() {
  const [imagesList, setImagesList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const refContainer = useRef(null);

  const getImages = useCallback(async pageNum => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${pageNum}&_limit=24`);
      const {status, data} = response;
      setLoading(false);

      return { status, data };
    } catch (e) {
      setLoading(false);
      return e;
    }
    // eslint-disable-next-line
  }, []);

  const handleInitial = useCallback(async page => {
    const newImages = await getImages(page);
    const { status, data } = newImages;

    if (status === 200) {
      setImagesList(images => [...images, ...data]);
    }
  }, [getImages]);

  useEffect(() => {
    handleInitial(pageNum)
    // eslint-disable-next-line
  }, [handleInitial])

  useEffect(() => {
    const checkIfReachBottom = () => {
      let scrollTop = document.documentElement.scrollTop,
          windowHeight = window.innerHeight,
          height = document.body.scrollHeight - windowHeight,
          scrollPercentage = (scrollTop / height);
      if(scrollPercentage > 0.85) {
        setPageNum(pageNum + 1);
        console.log(pageNum)
        handleInitial(pageNum)
      }
    }
    window.addEventListener('scroll', checkIfReachBottom)
    return () => window.removeEventListener("scroll", checkIfReachBottom);
    // eslint-disable-next-line
  }, [])

  return (
    <Gallery>
      <h1>Gallery</h1>
      <div ref={refContainer}>
        <ContainerImages images={imagesList} />
      </div>
    </Gallery>
  );
}

export default App;
