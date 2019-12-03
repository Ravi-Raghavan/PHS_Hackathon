import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
 
// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};
 
const steps = [
  {
    id: '1',
    message: 'Hello World',
    end: true,
  },
];
 
const Robot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot
  headerTitle="Automatic User Responses"
  speechSynthesis={{ enable: true, lang: 'en' }}
  steps={[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      trigger: '4',
    },
    {
        id: '4',
      user: true,
      trigger: '5',
    },
    {
        id: '5',
        message: "How's it going?",
        trigger: "6"
    },
    {
        id: '6',
        user: true,
        trigger: "7"
    },
    {
        id: '7',
        message: "Are you interested in donating to a homeless shelter?",
        trigger: "8"
    },
    {
        id: '8',
        options: [
            {value: 1, label: "yes", trigger: "9"},
            {value: 2, label: "no", trigger: "10"}
        ]
    },
    {
        id: '9',
        message: "How much money would you be interested in donating?",
        trigger: "11"
    },
    {
        id: "10",
        message: "Have a nice day!!!!",
        end: true
    },
    {
        id: "11",
        user: true,
        trigger: "12"
    },
    {
        id: "12",
        message: "Thank you so much! Have a nice day! For more information, please visit the Donate Part of our Website",
        end: true
    }


  ]}
/>;
  </ThemeProvider>
);
 
export default Robot;