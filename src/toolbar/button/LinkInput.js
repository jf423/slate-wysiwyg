import React from 'react'
import styled from 'styled-components';

class LinkInput extends React.Component {
    onInput = e => {
        const { enableLink } = this.props;
        const isActive = this.hasActive('inline', 'link');
        if (e.which === 13) {
            this.onClickInline('link', isActive, e.target.value);
            enableLink()
        }
    }
    onClickInline = (type, isActive, value) => {
        let { state, handleStateChange } = this.props;
        const change = state.change();
        if (!value) {
            change
                .unwrapInline('link')
        } else {
            change
                .unwrapInline('link')
                .wrapInline({
                    type: 'link',
                    data: {
                        href: value
                    }
                })
                .collapseToEnd()
        }

        handleStateChange(change);
    }
    hasActive = (kind, type) => {
        const { state } = this.props;
        return state.inlines.some(inline => inline.type === type);
    }
    render() {
        return(
            <LinkStyle>
                <LinkInputStyle
                  placeholder="http/https..."
                  onKeyUp={this.onInput}
                  type="text"
                />
            </LinkStyle>
        );
    }
}

export default LinkInput;

const LinkInputStyle = styled.input`
    width: 18rem;
    border: 0;
    background: #222;
    color: #fff;
    border-radius: 5px;
`;

const LinkStyle = styled.div`
    position: absolute;
    top: 100%;
    left: 12.5rem;
    margin: .8rem 0;

    &::after {
        content: '';
        position: absolute;
        border: 1px solid rgba(51, 51, 51, 0.19);
        border-color: #222 transparent;
        border-width: 0 13px 12px 13px;
        top: -10px;
        left: 45%;
    }
    &::before {
        content: '';
        position: absolute;
        border: 1px solid #333;
        border-color: #222 transparent;
        border-width: 0 13px 11px 13px;
        top: -10px;
        left: 45%;
    }
`;