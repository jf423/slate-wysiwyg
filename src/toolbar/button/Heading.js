import React from 'react'

class Heading extends React.Component {
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.blocks.some(node => node.type === type);
    }
    onClickBlock = (type, isActive) => {
        let { state, handleStateChange } = this.props;
        const change = state.change();
        const isList = this.hasActive('block', 'list-item');
        if (isList) {
            change
                .setBlock(isActive ? 'paragraph' : type)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
        } else {
            change
                .setBlock(isActive ? 'paragraph' : type)
        }

        handleStateChange(change);
    }
    render() {
        const { name, type } = this.props;
        const isActive = this.hasActive('block', type);
        return(
            <span className="button" onMouseDown={() => this.onClickBlock(type, isActive)} data-active={isActive}>
                <span className="material-icons">{name}</span>
            </span>
        );
    }
}

export default Heading;
