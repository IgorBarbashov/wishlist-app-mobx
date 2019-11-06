import React from 'react';
import WishListView from './WishListView';

function App(props) {
  return (
    <div>
      <WishListView wishList={props.wishList} />
    </div>
  );
}

export default App;
