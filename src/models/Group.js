import { types } from 'mobx-state-tree';
import { WishList } from './WishList';

const User = types.model({
    id: types.model({
        id: types.string,
        name: types.string,
        // gender: types.union(types.literal('m'), types.literal('f'))
        gender: types.enumeration('gender', ['m', 'f']),
        wishList: types.optional(WishList, {})
    })
});

// const Woman = types.model({
//     id: types.model({
//         id: types.string,
//         name: types.string,
//         gender: types.literal('f')
//     })
// });

// const Man = types.model({
//     id: types.model({
//         id: types.string,
//         name: types.string,
//         gender: types.literal('m')
//     })
// });

// const someone = Human.create({
//     id: 1,
//     name: "Igor",
//     gender: 'm'
// });
        

// const Human = types.union(Man, Woman);

// console.log(Man.is(someone)); // easy to check type
// console.log(Woman.is(someone));


const Groups = types.model({
    users: types.map(User)
});