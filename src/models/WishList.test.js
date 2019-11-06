import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { WishListItem, WishList } from './WishList';
import { reaction } from 'mobx';

it("can create a instance of a model", () => {
    const item = WishListItem.create({
        "name": "Toy-1",
        "price": 30.53,
        "image": "https://lh3.googleusercontent.com/TFuORPSuxYy8PQKFV2UBNHDr-aKclxqWIlLgx3F7ORId4KU6u_CTBpcY-hZ5e_B2NiPHv3MJ7PtLK6FdARZwu1oPuYHx9gqLrDu5rt4"
    });

    expect(item.price).toBe(30.53);
    item.changeName('Toyi-3');
    expect(item.name).toBe('Toyi-3');
});

it("can create a wishlist", () => {
    const list = WishList.create({
        items: [
            {
                "name": "Toy-1",
                "price": 30.53,
                "image": "https://lh3.googleusercontent.com/TFuORPSuxYy8PQKFV2UBNHDr-aKclxqWIlLgx3F7ORId4KU6u_CTBpcY-hZ5e_B2NiPHv3MJ7PtLK6FdARZwu1oPuYHx9gqLrDu5rt4"
            }
        ]
    });

    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(30.53);
});

it("can add a new items", () => {
    const list = WishList.create();
    expect(list.items.length).toBe(0);

    const states = [];
    onSnapshot(list, snapshot => {
        states.push(snapshot);
    });

    list.addItem({
        "name": "Toy-1",
        "price": 30.53,
        "image": "https://lh3.googleusercontent.com/TFuORPSuxYy8PQKFV2UBNHDr-aKclxqWIlLgx3F7ORId4KU6u_CTBpcY-hZ5e_B2NiPHv3MJ7PtLK6FdARZwu1oPuYHx9gqLrDu5rt4"
    });

    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(30.53);
    list.items[0].changeName('Toy-100');
    expect(list.items[0].name).toBe('Toy-100');

    expect(getSnapshot(list)).toMatchSnapshot();

    expect(states).toMatchSnapshot();
});

it("can add a new items - 2", () => {
    const list = WishList.create();
    expect(list.items.length).toBe(0);

    const patches = [];
    onPatch(list, patch => {
        patches.push(patch);
    });

    list.addItem({
        "name": "Toy-1",
        "price": 30.53,
        "image": "https://lh3.googleusercontent.com/TFuORPSuxYy8PQKFV2UBNHDr-aKclxqWIlLgx3F7ORId4KU6u_CTBpcY-hZ5e_B2NiPHv3MJ7PtLK6FdARZwu1oPuYHx9gqLrDu5rt4"
    });

    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(30.53);
    list.items[0].changeName('Toy-100');
    expect(list.items[0].name).toBe('Toy-100');

    expect(getSnapshot(list)).toMatchSnapshot();

    expect(patches).toMatchSnapshot();
});

it("can calculate totalPrice", () => {
    const list = WishList.create({
        items: [
            {
                "name": "Toy-1",
                "price": 30.53,
                "image": "https://lh3.googleusercontent.com/TFuORPSuxYy8PQKFV2UBNHDr-aKclxqWIlLgx3F7ORId4KU6u_CTBpcY-hZ5e_B2NiPHv3MJ7PtLK6FdARZwu1oPuYHx9gqLrDu5rt4"
            }
        ]
    });

    list.addItem({
        "name": "Toy-1",
        "price": 30.53,
        "image": "https://lh3.googleusercontent.com/TFuORPSuxYy8PQKFV2UBNHDr-aKclxqWIlLgx3F7ORId4KU6u_CTBpcY-hZ5e_B2NiPHv3MJ7PtLK6FdARZwu1oPuYHx9gqLrDu5rt4"
    });

    expect(list.items.length).toBe(2);
    expect(list.items[0].price).toBe(30.53);
    list.items[0].changeName('Toy-100');
    expect(list.items[0].name).toBe('Toy-100');
    expect(list.totalPrice).toBe(61.06);

    let changed = 0;
    reaction(() => list.totalPrice, () => changed++ );
    
    expect(changed).toBe(0);
    console.log(list.totalPrice);
    list.items[0].changeName('ToyToy');
    expect(changed).toBe(0);
    list.items[0].changePrice(10);
    expect(changed).toBe(1);
});