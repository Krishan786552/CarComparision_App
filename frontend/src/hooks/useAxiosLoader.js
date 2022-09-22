import React from 'react';
import { axiosInstance } from "../utils/axios";
const { useState, useEffect, useMemo } = React;

// This a hook which intercepts the request and response for axios calls and increment and decrement the counter value.
// If counter is 0 then it confirms that the request is made and respons is received properly. Mainly used to show a global Loader.
const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  console.log('+++++++++++++++++++++++++++', counter);

  const interceptors = useMemo(() => {
    const inc = () => setCounter(counter => counter + 1);
    const dec = () => setCounter(counter => counter - 1);

    return ({
      request: config => { inc(); return config; },
      response: response => { dec(); return response; },
      error: error => { dec(); Promise.reject(error); },
    });
  }, [counter]); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const reqInterceptor = axiosInstance.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const resInterceptor = axiosInstance.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return useMemo(() => counter > 0, [counter]);
};

export default useAxiosLoader;