import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  incomingMsgBox: {
    backgroundColor: 'white',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  incomingMsgText: {color: 'black', fontSize: 16},

  sentMsgBox: {
    backgroundColor: 'orange',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 5,
  },

  sentMsgText: {color: '#fff', fontSize: 16},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    elevation: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'orange',
  },
  exitButton: {
    borderRadius: 20,
    padding: 10,
    width: 100,
    elevation: 2,
    position: 'absolute',
    right: 30,
    top: 30,
    backgroundColor: '#E7192A',
  },

  sendButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: 'orange',
  },

  input: {
    margin: 10,
    borderBottomWidth: 1,
    width: 300,
    padding: 10,
    position: 'absolute',
    bottom: 20,
    left: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  senderText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  receiverText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default styles;
