import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Vibration, Button, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer : null,
      minutesCounter : '25',
      secondsCounter : '00',
      workMin : '00',
      workSec : '00',
      timerDisable : false,
      headerTitle : 'Work Timer',
      breakTime : '5',
      isItWork : true,
    }
  }
 
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  onButtonStart = () => {
    let timer = setInterval(() => {
      num = (Number(this.state.secondsCounter) - 1).toString();
      count = this.state.minutesCounter;


      if(Number(this.state.secondsCounter == 0)) {
        count = (Number(this.state.minutesCounter) - 1).toString();
        num = '59';
      }

      this.setState({
        minutesCounter : count.length == 1 ? '0' + count : count,
        secondsCounter : num.length == 1 ? '0' + num : num,
      })

      if (this.state.minutesCounter == 0 && this.state.secondsCounter == 0 && this.state.isItWork == true) {
        this.setState({
           minutesCounter : this.state.breakTime,
           secondsCounter : '00',
           headerTitle : 'Break Timer', 
            isItWork : false,
     })
          Vibration.vibrate();     
    }

      if (this.state.minutesCounter == 0 && this.state.secondsCounter == 0 && this.state.isItWork == false) {
        this.setState({
          minutesCounter : this.state.workMin,
          secondsCounter : this.state.workSec,
          headerTitle : 'Work Timer',
          isItWork : true,
        })
        Vibration.vibrate();
      }
     
          }
            , 1000)

      this.setState({timer});
      this.setState({timerDisable : true})
  }

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({timerDisable : false});
  }

  onButtonClear = () => {
    this.setState({
        timer : null,
        minutesCounter : '25',
        secondsCounter : '00',
        headerTitle : 'Work Timer',
    });
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.MainContainer}>
      <Text style = {{fontSize : 60, color : '#B0BEC5'}}> {this.state.headerTitle} </Text>
      <Text style = {styles.counterText}> {this.state.minutesCounter} : {this.state.secondsCounter} </Text>
      <TouchableOpacity
      onPress = {this.onButtonStart}
      activeOpacity = {0.6}
      style = {[styles.Button, {backgroundColor: this.state.timerDisable ? '#B0BEC5' : '#FF6F00' }]}
      disabled = {this.state.timerDisable}>

      <Text style = {styles.buttonText}> START! </Text>
      </TouchableOpacity>
      <TextInput style = {styles.SearchInput} placeholder = 'Minutes' keyboardType = 'numeric' onChangeText = {(text) => this.setState({ minutesCounter : text, workMin : text,})} />
      <TextInput style = {styles.SearchInput} placeholder = 'Seconds' keyboardType = 'numeric' onChangeText = {(text) => this.setState({ secondsCounter : text, workSec : text,})} />
      <TextInput style = {styles.BreakInput} placeholder = 'Break Time in mins' keyboardType = 'numeric' onChangeText = {(text) => this.setState({ breakTime : text})} />

      <TouchableOpacity onPress = {this.onButtonStop} activeOpacity = {0.6} style = {[styles.Button, {backgroundColor: '#FF6F00'}]}>

      <Text style = {styles.buttonText}> STOP! </Text>

      </TouchableOpacity>

      <TouchableOpacity onPress = {this.onButtonClear} activeOpacity = {0.6} style = {[styles.Button, {backgroundColor: this.state.timerDisable ? '#FF6F000' : '#B0BEC5'}]}
      disabled = {this.state.timerDisable}>

      <Text style = {styles.Button}> Reset </Text>

      </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 7,
    marginTop: 10,
  },
  buttonText: {
    color: '#bdc3c7',
    textAlign: 'center',
    fontSize: 20,
  },
  counterText: {
    fontSize: 28,
    color: '#e74c3c',
  },
  SearchInput: {
    paddingLeft: 2,
    paddingTop: 4,
    paddingBottom: 4,
    height: 30,
    width: 75,
    fontSize: 12,
    color: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#B0BEC5', 
  },
  BreakInput: {
     paddingLeft: 2,
    paddingTop: 4,
    paddingBottom: 4,
    height: 30,
    width: 115,
    fontSize: 12,
    color: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#B0BEC5', 

  }

});