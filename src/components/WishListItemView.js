import React, { Component } from 'react';
import { clone, getSnapshot, applySnapshot }from 'mobx-state-tree';
import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends Component {
    state = {
        isEdit: false,
        clone: null
    };

    onToggleEdit = () => {
        this.setState({
            isEdit: true,
            clone: clone(this.props.item)
        });
    };

    onCancelEdit = () => {
        this.setState({ isEdit: false});
    };

    onSaveEdit = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone));
        this.setState({
            isEdit: false, 
            clone: null
        });
    };

    render() {
        const { item } = this.props;
        return (
            <li>
                {!this.state.isEdit ? (
                    <>
                        {item.image && <img src={item.image} alt={item.name} width="200" />}
                        <h3>{item.name}</h3>
                        <div>{item.price}</div>
                        <button onClick={this.onToggleEdit}>Edit</button>
                        <button onClick={item.remove}>Del</button>
                    </>
                ) : (
                    <>
                        <WishListItemEdit item={this.state.clone}/>
                        <button onClick={this.onSaveEdit}>Save</button>
                        <button onClick={this.onCancelEdit}>Cancel</button>
                    </>
                )}
            </li>

        );
    }
};

export default WishListItemView;