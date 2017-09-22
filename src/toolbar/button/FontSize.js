import React from 'react'
import styled from 'styled-components';
import Dropdown from 'react-dropdown';

class FontSize extends React.Component {
    removeMarksByType = (change, type) => {
        const { state } = change;
        const { document, selection } = state;
        const marks = document.getMarksByType(type);
        marks.forEach(mark => change.removeMarkAtRange(selection, mark));
    }
    onClickSize = (value, type, isActive) => {
        let { state, handleStateChange } = this.props;
        const change = state.change();
        const size = isActive ? isActive.getIn(['data', 'size']) : '16';
        const mb_size = isActive ? isActive.getIn(['data', 'mb_size']) : '16';

        change
            .call(this.removeMarksByType, 'font-size')
            .addMark({
                type: 'font-size',
                data: {
                    size: type === 'size' ? value : size,
                    mb_size: type === 'mb_size' ? value : mb_size,
                }
            })
        
        handleStateChange(change);
    }
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.activeMarks.filter(value => value.type === 'font-size').first();
    }
    render() {
        const { mode, onChangeState } = this.props;
        const options = [8,10,12,14,16,18,22,26,30,36,42,48,56];
        const isActive = this.hasActive('mark', mode);
        const size = isActive ? isActive.getIn(['data', `${mode}`]) : 16;
        return(
            <Button onClick={() => onChangeState({ showLink: false, colorPicker: false })}>
                <Dropdown
                  options={options}
                  onChange={e => this.onClickSize(e.value, mode, isActive)}
                  value={{ value: size, label: size }}
                  placeholder="Select an option"
                />
            </Button>
        );
    }
}

export default FontSize;

const Button = styled.span`
    color: #fff;
    min-width: 24px;
`;
