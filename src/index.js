import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot, getSnapshot } from 'mobx-state-tree';
import App from './components/App';
import { WishList } from './models/WishList';
import { Group } from './models/Group';

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

let wishList = WishList.create(initialState);

onSnapshot(wishList, snapShot => {
    localStorage.setItem('wishlist', JSON.stringify(snapShot));
})

function renderApp() {
    ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));
};

renderApp();

// setInterval(() => {
//     console.log(wishList.items[0].price);
//     wishList.items[0].changePrice(wishList.items[0].price + 1)
// }, 1000);

if (module.hot) {
    module.hot.accept(['./components/App.js'], () => {
        // new components
        renderApp();
    })

    module.hot.accept(['./models/WishList.js'], () => {
        // new model definitions
        const snapShot = getSnapshot(wishList);
        wishList = WishList.create(snapShot);
        renderApp();
    })
}