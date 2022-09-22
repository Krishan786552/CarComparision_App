import React from 'react';
import useAxiosLoader from '../../../hooks/useAxiosLoader';
import LoaderComponent from './index';

const Loader = () => {
  const loading = useAxiosLoader();
  console.log('------------------', loading);
  // show loader when a request is made and hide when response received
  return loading && (
    <LoaderComponent open={loading}/>
  )
}

export default Loader;