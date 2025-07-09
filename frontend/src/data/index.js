import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Exam,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  },
  {
    title: "Logout",
    icon: <SignOut />,
  },
];

export const Nav_Menu = [
  {
    index: 0,
    title: "About Us"
  },
  {
    index: 1,
    title: "Services"
  },
  {
    index: 2,
    title: "Features"
  },
  {
    index: 3,
    title: "Driving Schools"
  },
  {
    index: 4,
    title: "Contact Us"
  }
];


export const auth_Menu = [
  {
    index: 0,
    title: "login"
  },
  {
    index: 1,
    title: "register"
  }
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
  },
  {
    index: 1,
    icon: <Users />,
  },
  {
    index: 2,
    icon: <Phone />,
  },
  {
    index: 3,
    icon: <Exam />,
  }
];

const Nav_Setting = [
  {
    index: 4,
    icon: <GearSix />,
  },
];

const CallLogs = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: true,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: false,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: true,
  }
];

const MembersList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true
  }
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋, how are you today? Ready for your lesson?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋, I'm doing well! Yes, I'm excited for the lesson.",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me a link to the road signs guide? I want to review them before we start.",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Sure, I'll send you the link now.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Here is the road signs guide I promised.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "By the way, can you send me the document for parking techniques?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Here you go! This document covers all the parking techniques you need to know.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can we practice parallel parking today?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Absolutely, I'll make sure we focus on that during our session today.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Also, could you send me my progress report from last week?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Here's your progress report. You've improved a lot since last time!",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Thanks! I'll review it before our lesson. See you soon!",
    incoming: false,
    outgoing: true,
  },
];


const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

const SHARED_LINKS = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.imageUrl(),
    message: "Here's a video on parallel parking techniques.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.imageUrl(),
    message: "This article explains how to prepare for your driving test.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.imageUrl(),
    message: "Here's a quick guide on road signs and their meanings.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.imageUrl(),
    message: "Watch this video on the best practices for highway driving.",
    incoming: true,
    outgoing: false,
  }
];



const SHARED_DOCS = [
  {
    type: "msg",
    subtype: "doc",
    message: "Here's your progress report for the last few lessons.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "I've attached a checklist for your driving test preparation.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Here's the driver's manual for you to review before your next lesson.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Please review this document on safe driving practices.",
    incoming: true,
    outgoing: false,
  },
]



export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  SHARED_DOCS,
  SHARED_LINKS,
  CallLogs,
  MembersList
};
