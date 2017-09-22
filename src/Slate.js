import { State } from 'slate';
import { Editor } from 'slate-react'
import React from 'react'
import styled from 'styled-components';

import InlineToolbar from './toolbar/Toolbar';
import initialState from './state.json'
import { schema } from './schema';

class Slate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      state: State.fromJSON(initialState)
    };
  }

  onChange = ({ state }) => {
    this.setState({ state });
    const content = JSON.stringify(state.toJSON())
    localStorage.setItem('content', content)
  }

  handleStateChange = state => {
    this.setState(state)
  }
  
  render = () => {
    const { state } = this.state;
    return (
      <EditorStyle>
        <Editor
          schema={schema}
          state={state}
          onChange={this.onChange}
        />
        <InlineToolbar state={state} handleStateChange={this.handleStateChange} />
      </EditorStyle>
    )
  }

}

export default Slate;

const EditorStyle = styled.div`
    width: 80vw;
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: text;
    padding: 16px;
    border-radius: 2px;
    margin-bottom: 2em;
    box-shadow: inset 0px 1px 8px -3px #ABABAB;
    background: #fefefe;
`;
