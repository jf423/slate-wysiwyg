import Portal from 'react-portal'
import React from 'react'
// import styled from 'styled-components';

import FontSize from './button/FontSize';
import ColorPicker from './button/ColorPicker';
import LinkInput from './button/LinkInput';
import Bold from './button/Bold';
import Italic from './button/Italic';
import Underline from './button/Underline';
import Icon from './button/Icon';
import Color from './button/Color';
import Link from './button/Link';
import Blockquote from './button/Blockquote';
import Heading from './button/Heading';
import List from './button/List';
import Alignment from './button/Alignment';

class InlineToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: null,
            showLink: false,
            colorPicker: false,
            showMenu: false
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     const { state } = nextProps;
    //     if (!state.isFocused || state.isCollapsed) {
    //         this.setState({
    //             // showLink: false,
    //             colorPicker: false
    //         });
    //     }
    // }
    
    componentDidUpdate = (prevProps, prevState) => {
        this.updateMenu();
    }

    onOpen = portal => {
        this.setState({
            menu: portal.firstChild,
            showMenu: true
        });
    }

    updateMenu = () => {
        const { state: { isBlurred, isCollapsed } } = this.props;
        const { menu, showMenu } = this.state;
        const disable = isBlurred || isCollapsed;
        if (!menu) return;
        if (disable && !showMenu) {
            menu.removeAttribute('style');
            return;
        } else if (!disable){
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const top = rect.top + window.scrollY - menu.offsetHeight;
            const maxLeft = window.innerWidth - menu.offsetWidth;
            let left = rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2;
            if (left > maxLeft) {
                left = maxLeft - 10;
            }
            menu.style.opacity = 1;
            menu.style.top = `${top > 10 ? top : 10}px`;
            menu.style.left = `${left > 10 ? left : 10}px`;
        }
    }

    enableColorPicker = () => {
        const { colorPicker } = this.state;
        this.setState({
            colorPicker: !colorPicker,
            showLink: false
        });
    }
    onChangeState = newState => {
        this.setState(newState);
    }
    enableLink = () => {
        const { showLink } = this.state;
        this.setState({
            colorPicker: false,
            showLink: !showLink
        });
    }
    handleClickOutside = () => {
        this.setState({
            showMenu: false,
            showLink: false,
            colorPicker: false
        });
    }
    // handleClickMenu = () => {
    //     this.setState({ showMenu: true } );
    // }
    render = () => {
        const { state, handleStateChange } = this.props;
        const { isBlurred, isCollapsed, isFocused } = state;
        const { showLink, colorPicker, showMenu } = this.state;
        // console.log(`isBlurred: ${isBlurred}, isCollapsed: ${isCollapsed}, isFocused: ${isFocused}`);
        const disable = isBlurred || isCollapsed;
        return (
            <Portal isOpened={!disable || showMenu} onOpen={this.onOpen} onClose={this.handleClickOutside} closeOnOutsideClick>
                <div className="menu hover-menu">
                    <Bold state={state} handleStateChange={handleStateChange}/>
                    <Italic state={state} handleStateChange={handleStateChange}/>
                    <Underline state={state} handleStateChange={handleStateChange}/>
                    <Icon name={'laptop_mac'}/>
                    <FontSize onChangeState={this.onChangeState} state={state} handleStateChange={handleStateChange} mode={'size'}/>
                    <Icon name={'phone_iphone'}/>
                    <FontSize onChangeState={this.onChangeState} state={state} handleStateChange={handleStateChange} mode={'mb_size'}/>
                    <Color state={state} enableColorPicker={this.enableColorPicker}/>
                    { colorPicker &&
                        <ColorPicker state={state} handleStateChange={handleStateChange}/>
                    }
                    <Link state={state} enableLink={this.enableLink}/>
                    { showLink &&
                        <LinkInput enableLink={this.enableLink} state={state} handleStateChange={handleStateChange}/>
                    }
                    <Blockquote state={state} handleStateChange={handleStateChange}/>
                    <Heading name={'looks_one'} type={'heading-one'} state={state} handleStateChange={handleStateChange}/>
                    <Heading name={'looks_two'} type={'heading-two'} state={state} handleStateChange={handleStateChange}/>
                    <Heading name={'looks_3'} type={'heading-three'} state={state} handleStateChange={handleStateChange}/>
                    <List name={'format_list_numbered'} type={'numbered-list'} state={state} handleStateChange={handleStateChange}/>
                    <List name={'format_list_bulleted'} type={'bulleted-list'} state={state} handleStateChange={handleStateChange}/>
                    <Alignment name={'format_align_left'} type={'align-left'} state={state} handleStateChange={handleStateChange}/>
                    <Alignment name={'format_align_center'} type={'align-center'} state={state} handleStateChange={handleStateChange}/>
                    <Alignment name={'format_align_right'} type={'align-right'} state={state} handleStateChange={handleStateChange}/>
                </div>
            </Portal>
        )
    }
}

export default InlineToolbar;
