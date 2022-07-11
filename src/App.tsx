import React from 'react';
import './styles/App.css';
import MyHeader from './components/UI/MyHeader/MyHeader';
import MyFooter from './components/UI/MyFooter/MyFooter';



const App = () => {
  return (
    <div className=".container">
      <MyHeader />
      <MyFooter />

    </div>
  );
}
export default App