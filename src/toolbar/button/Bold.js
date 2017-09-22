import React from 'react'

class Bold extends React.Component {
    onClickMark = (type, isActive) => {
        let { state, handleStateChange } = this.props;
                        
        const change = state
                    .change()
                    .toggleMark(type);

        handleStateChange(change)
    }
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.activeMarks.some(mark => mark.type === type);
    }
    render() {
        const isActive = this.hasActive('mark', 'bold');
        return(
            <span className="button" onMouseDown={e => this.onClickMark('bold', isActive)} data-active={isActive}>
                <span className="material-icons">{'format_bold'}</span>
            </span>
        );
    }
}

export default Bold;
