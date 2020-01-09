import React from 'react';
import io from 'socket.io-client';
import config from '../../config/config';
import store from '../../Store/configStore'

import { GiftedChat } from 'react-native-gifted-chat'
import API from '../../API';

class ChatRoom extends React.Component {
  state = {
    messages: [],
  }

  onSend(messages = []) {
    try {
      messages[0].user._id = store.getState().userInfoReducer.id;
      // API.Chat.addMessage(this.props.navigation.state.params.event.id, messages);
      this.socket.emit('chat message', messages);
      // this.setState(previousState => ({
      //   messages: GiftedChat.append(previousState.messages, messages),
      // }))
    } catch (error) {
      console.error(error);
    }
    
  }

  componentDidMount() {
    
    this.socket = io(config.API_HOST);
    this.socket.on("chat message", msg => {
      this.setState({ messages: [...msg, ...this.state.messages] });
    });
  };

  render() {
    console.log('RENDER CHAT ROOM')
    const myId = store.getState().userInfoReducer.id;
    return (
      <GiftedChat
        // showAvatarForEveryMessage={true}
        renderAvatarOnTop
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: myId,
        }}
      />
    )
  }
};

export default ChatRoom;