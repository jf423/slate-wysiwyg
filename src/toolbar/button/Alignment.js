import React from 'react'

class Alignment extends React.Component {
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.activeMarks.some(mark => mark.type === type);
    }
    onClickAlign = (type, isActive) => {
        let { state, handleStateChange } = this.props;
        const change = state.change();

        if (isActive) {
            change
                .removeMark(type)
        } else {
            change
                .removeMark('align-left')
                .removeMark('align-center')
                .removeMark('align-right')
                .addMark(type)
        }

        handleStateChange(change)
    }
    render() {
        const { name, type } = this.props;
        const isActive = this.hasActive('mark', type);
        return(
            <span className="button" onMouseDown={() => this.onClickAlign(type, isActive)} data-active={isActive}>
                <span className="material-icons">{name}</span>
            </span>
        );
    }
}

export default Alignment;
