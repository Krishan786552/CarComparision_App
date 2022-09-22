import { useEffect } from "react";
import { useStore} from 'react-redux';

// dynamically inject a reduecer (to implement code-splitting)
const useInjectReducer = (key, reducer) => {
  const store = useStore();
  useEffect(() => {
    store.injectReducer(key, reducer);
  }, [key, reducer]);
};

export default useInjectReducer;
