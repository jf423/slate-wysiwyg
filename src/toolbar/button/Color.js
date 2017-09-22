import React from 'react'

class Color extends React.Component {
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.activeMarks.filter(value => value.type === 'color').first();
    }
    render() {
        const { enableColorPicker } = this.props;
        const isActive = this.hasActive('mark', 'color');
        const color = isActive ? isActive.getIn(['data', 'color']) : '#000';
        return(
            <span className="button" onMouseDown={enableColorPicker} style={{ color: `${color}`, border: '1px dotted #fff' }}>
                <span className="material-icons">{'format_color_text'}</span>
            </span>
        );
    }
}

export default Color;
