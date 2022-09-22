import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../app/App';
import CarsList from '../car-list';
import CarDetailsComponent from '../car-details-page';
import CompareCars from '../compare-cars';

// used React-router-dom v6
const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<App/>} path="/">
        <Route element={<CarsList/>} index />
        <Route index element={<CarDetailsComponent/>} path=':nameId'/>
        <Route index element={<CompareCars/>} path='cars/compare-cars'/>
      </Route>
      {/* <Route element={<ProductDetail />} path="product/:productId" />
    <Route element={<Cart />} path="/cart" /> */}
      <Route element={<h1>Page Not Found</h1>} path="*" />
    </Routes>
  )
}

export default RoutesComponent;