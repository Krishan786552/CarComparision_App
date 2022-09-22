import { useEffect } from "react";
import { useStore } from "react-redux";

// dynamically inject a saga (to implement code-splitting)
const useInjectSaga = (key, saga) => {
  const store = useStore();
  useEffect(() => {
    store.injectSaga(key, saga);
  }, [key, saga]);
};

export default useInjectSaga;
