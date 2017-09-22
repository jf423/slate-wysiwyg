import React from 'react';
import styled from 'styled-components';

export const schema = {
    nodes: {
        'paragraph': props =>{
            return <div {...props.attributes}>{props.children}</div>
        },
        'link': props => {
            const { data } = props.node;
            const href = data.get('href') || {};
            return <a href={href} {...props.attributes}>{props.children}</a>
        },
        'code': props => <pre><code {...props.attributes}>{props.children}</code></pre>,
        'quote': props => <div><blockquote {...props.attributes}>{props.children}</blockquote></div>,
        'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
        'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
        'heading-three': props => <h3 {...props.attributes}>{props.children}</h3>,
        'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
        'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
        'list-item': props => <li {...props.attributes}>{props.children}</li>
    },
    marks: {
        'span': props => {
            const { data } = props.mark;
            const style = data.get('style') || {};
            const Span = styled.span`${style}`;
            return <Span {...props.attributes}>{props.children}</Span>
        },
        'bold': props => <strong>{props.children}</strong>,
        'italic': props => <em>{props.children}</em>,
        'underline': props => <u>{props.children}</u>,
        'align-left' : props => <div {...props.attributes} style={{ textAlign: 'left' }}>{props.children}</div>,
        'align-center' : props => <div {...props.attributes} style={{ textAlign: 'center' }}>{props.children}</div>,
        'align-right' : props => <div {...props.attributes} style={{ textAlign: 'right' }}>{props.children}</div>,
        'font-size' : props => {
            const { data } = props.mark;
            const size = data.get('size');
            const mobile_size = data.get('mb_size');
            const Span = styled.span`
                font-size: ${size}px;
                @media(max-width: 480px){
                    font-size: ${mobile_size}px;
                }
            `;
            return <Span>{props.children}</Span>;
        },
        'color' : props => {
            const { data } = props.mark;
            const color = data.get('color');
            const Span = styled.span`
                color: ${color};
            `;
            return <Span>{props.children}</Span>;
        },
    },
};
