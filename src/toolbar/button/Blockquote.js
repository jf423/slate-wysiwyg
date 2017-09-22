import React from 'react'

class Blockquote extends React.Component {
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
        const isActive = this.hasActive('block', 'quote');
        return(
            <span className="button" onMouseDown={() => this.onClickBlock('quote', isActive)} data-active={isActive}>
                <span className="material-icons">{'format_quote'}</span>
            </span>
        );
    }
}

export default Blockquote;
