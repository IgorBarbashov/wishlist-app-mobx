import React, { Component } from 'react';
import { observer } from 'mobx-react';

class WishListItemEdit extends Component {
    onNameChanged = event => {
        this.props.item.changeName(event.target.value);
    };

    onPriceChanged = event => {
        const price = parseInt(event.target.value);
        if (!isNaN(price)) {
            this.props.item.changePrice(price);
        }
    };

    render() {
        const {item} = this.props;
        return (
            <>
                <div>
                    Thing: <input type='text' value={item.name} onChange={this.onNameChanged} />
                </div>
                <div>
                    Price: <input type='text' value={item.price} onChange={this.onPriceChanged} />
                </div>
            </>
        );
    }
}


export default observer(WishListItemEdit);