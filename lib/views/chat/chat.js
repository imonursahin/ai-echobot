import React, {useState, useRef} from 'react';
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
} from 'react-native';

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

  const exitChatButton = () => {
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
    <View className="flex-1 items-center justify-center bg-white">
      <Modal animationType="slide" visible={modalVisible}>
        <View className="flex-1">
          <View className="h-[100]">
            <Pressable
              className="absolute right-[30] top-[30] elevation-[2] w-[100] p-[10] bg-[#C62828] rounded-full"
              onPress={() => exitChatButton()}>
              <Text className="text-white text-center	font-bold	">Exit</Text>
            </Pressable>
          </View>
          <ScrollView ref={scrollViewRef}>
            <View className="bg-transparent items-center">
              {[...userMessageList, ...botMessageList]
                .sort((a, b) => a.date - b.date)
                .map((item, i) => {
                  return (
                    <View className="w-full" key={i}>
                      {item.type == 'bot' ? (
                        <View className="border self-start   items-start w-max	 p-[10] mx-2 my-2 rounded-md   ">
                          <Text className="text-black text-center	font-bold">
                            Bot
                          </Text>
                          <Text className="text-black text-center">
                            {item.text}
                          </Text>
                        </View>
                      ) : (
                        <View className="border self-end bg-[#DCEDC8]  items-start w-max	 p-[10]   mx-2 my-2 rounded-md   ">
                          <Text className="text-black text-center	font-bold">
                            User
                          </Text>
                          <Text className="text-black">{item.text}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>

        <View className="h-[100]"></View>
        <View>
          <TextInput
            className="border-b-[1px] border-black rounded-[10] p-[10] w-[250] m-[10] absolute bottom-[20] left-[5]"
            placeholder="Type a message..."
            value={message}
            onChangeText={value => setMessage(value)}
          />
          <Pressable
            className="absolute right-[20] bottom-[30] elevation-[2] w-[100] p-[10] bg-[#263238] rounded-full w"
            onPress={() => onSendMsg()}>
            <Text className="text-white text-center	font-bold	">Send</Text>
          </Pressable>
        </View>
      </Modal>

      {!modalVisible ? (
        <Pressable
          className="absolute right-[30] bottom-[30] elevation-[2] w-[100] p-[10] bg-[#263238] rounded-full"
          onPress={() => openChatScreen()}>
          <Text className="text-white text-center	font-bold	">Live Support</Text>
        </Pressable>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Chat;
