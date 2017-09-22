import React from 'react'

class Link extends React.Component {
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.inlines.some(inline => inline.type === type);
    }
    render() {
        const { enableLink } = this.props;
        const isActive = this.hasActive('mark', 'link');
        return(
            <span className="button" onMouseDown={() => enableLink()} data-active={isActive}>
                <span className="material-icons">{'link'}</span>
            </span>
        );
    }
}

export default Link;
