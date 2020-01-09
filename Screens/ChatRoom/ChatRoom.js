import React from 'react';
import io from 'socket.io-client';
import config from '../../config/config';

import { GiftedChat } from 'react-native-gifted-chat'
import API from '../../API';

class ChatRoom extends React.Component {
  state = {
    messages: [],
  }

  onSend(messages = []) {
    try {
      console.log('onSend', messages);
      // API.Chat.addMessage(this.props.navigation.state.params.event.id, messages);
      console.log('000')
      this.socket.emit('chat message', messages);
      console.log('001')
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
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  };

  render() {
    console.log('----------', this.props.navigation.state.params.event.id)
    // console.log(this.state.messages)
    return (
      <GiftedChat
        // showAvatarForEveryMessage={true}
        renderAvatarOnTop
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
};

export default ChatRoom;