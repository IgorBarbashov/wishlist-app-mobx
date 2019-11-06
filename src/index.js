import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot } from 'mobx-state-tree';
import App from './components/App';
import { WishList } from './models/WishList';

let initialState = {
    items: [
        {
            "name": "Toy-1",
            "price": 10.10,
            "image": "https://www.sanlorenzos.ie/wp-content/uploads/2014/11/Gift-Card-small.jpg"
        },
        {
            "name": "Toy-2",
            "price": 20.20,
            "image": "https://www.sanlorenzos.ie/wp-content/uploads/2014/11/Gift-Card-small.jpg"
        },
        {
            "name": "Toy-3",
            "price": 30.30,
            "image": "https://www.sanlorenzos.ie/wp-content/uploads/2014/11/Gift-Card-small.jpg"
        }
    ]
}

if (localStorage.getItem('wishlist')) {
     const json = JSON.parse(localStorage.getItem('wishlist'));
     if (WishList.is(json)) { // проверка - можно ли из json создать instance WishList
        initialState = json;
     }
}

const wishList = WishList.create(initialState);

onSnapshot(wishList, snapShot => {
    localStorage.setItem('wishlist', JSON.stringify(snapShot));
})

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));

// setInterval(() => {
//     console.log(wishList.items[0].price);
//     wishList.items[0].changePrice(wishList.items[0].price + 1)
// }, 1000);