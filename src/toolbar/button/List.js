import React from 'react'

class List extends React.Component {
    hasActive = (kind, type) => {
        const { state } = this.props;
        const { document } = state;
        if(type === 'list-item') return state.blocks.some(node => node.type === type);
        return state.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type));
    }
    onClickList = (type, isActive) => {
        let { state, handleStateChange } = this.props;
        const change = state.change();
        const isList = this.hasActive('block', 'list-item');
        if (isList && isActive) {
            change
                .setBlock('paragraph')
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
        } else if (isList) {
            change
                .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
                .wrapBlock(type)
        } else {
            change
                .setBlock('list-item')
                .wrapBlock(type)
        }
        
        handleStateChange(change);
    }
    render() {
        const { name, type } = this.props;
        const isActive = this.hasActive('block', type);
        return(
            <span className="button" onMouseDown={() => this.onClickList(type, isActive)} data-active={isActive}>
                <span className="material-icons">{name}</span>
            </span>
        );
    }
}

export default List;
