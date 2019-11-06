import React from 'react';
import { observer } from 'mobx-react';
import WishListItemView from './WishListItemView';
import WishListItemEntry from './WishListItemEntry';

const WishListView = ({ wishList }) => (
    <div>
        <ul>
            {wishList.items.map((item, id) => <WishListItemView key={id} item={item} /> )}
        </ul>
        <div>Total: {wishList.totalPrice}</div>
        <hr />
        <div><WishListItemEntry wishList={wishList}/></div>
    </div>
);

export default observer(WishListView);