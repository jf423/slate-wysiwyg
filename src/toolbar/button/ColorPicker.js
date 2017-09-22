import React from 'react'
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
    removeMarksByType = (change, type) => {
        const { state } = change;
        const { document, selection } = state;
        const marks = document.getMarksByType(type);
        marks.forEach(mark => change.removeMarkAtRange(selection, mark));
    }
    onClickColor = (value, type, isActive) => {
        let { state, handleStateChange } = this.props;
        const change = state.change();

        change
            .call(this.removeMarksByType, 'color')
            .addMark({
                type: 'color',
                data: {
                    color: value
                }
            })
        
        handleStateChange(change);
    }
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.activeMarks.filter(value => value.type === 'color').first();
    }
    render() {
        const isActive = this.hasActive('mark', 'color');
        const color = isActive ? isActive.getIn(['data', 'color']) : '#000';
        return(
            <Picker>
                <SketchPicker
                  disableAlpha
                  color={color}
                  width="180px"
                  presetColors={[]}
                  onChangeComplete={e => this.onClickColor(e.hex, 'color', isActive)}
                />
            </Picker>
        );
    }
}

export default ColorPicker;

const Picker = styled.div`
    position: absolute;
    top: 135%;
    left: 28%;
`;
