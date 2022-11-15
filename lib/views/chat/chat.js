import React, {useState, useRef} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import styles from './chat_style';
import {LocalNotification} from '../../services/local_notification';

const Chat = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userMessageList, setUserMessageList] = useState([]);
  const [botMessageList, setBotMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();

  const onSendMsg = async () => {
    if (message != '') {
      setUserMessageList([
        ...userMessageList,
        {text: message, type: 'user', date: new Date()},
      ]);
      await setTimeout(
        () => {
          setBotMessageList([
            ...botMessageList,
            {text: message, type: 'bot', date: new Date()},
          ]);
          LocalNotification('Bot', message);
          scrollViewRef.current.scrollToEnd({animated: true});
        },

        2000,
      );
      scrollViewRef.current.scrollToEnd({animated: true});
      setMessage('');
    }
  };

  const openChatScreen = () => {
    setModalVisible(true);
  };

  const action = () => {
    setModalVisible(false);
  };

  const exitChatButton = () => {
    //   alert
    Alert.alert('Leave the chat', 'Are you sure you want to leave the chat?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'YES', onPress: () => yesButtonFunc()},
    ]);
  };

  const yesButtonFunc = () => {
    setModalVisible(false);
    setUserMessageList([]);
    setBotMessageList([]);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={styles.container}>
          <View>
            <View style={{height: 70}}>
              <Pressable
                style={[styles.exitButton]}
                onPress={() => exitChatButton()}>
                <Text style={styles.textStyle}>Exit</Text>
              </Pressable>
            </View>
            <ScrollView ref={scrollViewRef}>
              <View style={styles.modalView}>
                {[...userMessageList, ...botMessageList]
                  .sort((a, b) => a.date - b.date)
                  .map((item, i) => {
                    return (
                      <View style={{width: '100%'}} key={i}>
                        {item.type == 'bot' ? (
                          <View style={styles.incomingMsgBox}>
                            <Text style={styles.incomingMsgText}>
                              {item.text}
                            </Text>
                          </View>
                        ) : (
                          <Text style={styles.sentMsgBox}>
                            <Text style={styles.sentMsgText}>{item.text}</Text>
                          </Text>
                        )}
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
        <View style={{height: 150}}></View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={value => setMessage(value)}
          />
          <Pressable style={[styles.sendButton]} onPress={() => onSendMsg()}>
            <Text style={styles.textStyle}>Send</Text>
          </Pressable>
        </View>
      </Modal>

      {!modalVisible ? (
        <Pressable style={[styles.button]} onPress={() => openChatScreen()}>
          <Text style={styles.textStyle}>Live Support</Text>
        </Pressable>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Chat;
