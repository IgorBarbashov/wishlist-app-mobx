import { types, getParent, destroy } from 'mobx-state-tree';

// const data = {
//     "name": "Toy-1",
//     "price": 30.53,
//     "image": "https://lh3.googleusercontent.com/TFuORPSuxYy8PQKFV2UBNHDr-aKclxqWIlLgx3F7ORId4KU6u_CTBpcY-hZ5e_B2NiPHv3MJ7PtLK6FdARZwu1oPuYHx9gqLrDu5rt4"
// };

export const WishListItem = types.model({
    name: types.string, // it will be @observable property
    price: types.number, // it will be @observable property
    image: "" // it will be @observable property
}).actions(self => ({
    changeName(newName) { // it will be @action
        self.name = newName;
    },
    changePrice(newPrice) { // it will be @action
        self.price = newPrice;
    },
    changeImage(newImage) { // it will be @action
        self.image = newImage;
    },
    remove() {
        getParent(self, 2).remove(self)
    }
}));

export const WishList = types.model({
    items: types.optional(types.array(WishListItem), [])
}).actions(self => ({
    addItem(item) {
        self.items.push(item);
    },
    remove(item) {
        destroy(item);
        // self.items.splice(self.items.indexOf(item), 1);
    }
})).views(self => ({
    get totalPrice() { // it will be @computed property
        return self.items.reduce((acc, el) => acc + el.price, 0);
    }
}));