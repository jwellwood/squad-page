import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDl2_wbndQeUdh5in-DjXzMnRde9b5DrcE',
  authDomain: 'squad-b0693.firebaseapp.com',
  databaseURL: 'https://squad-b0693.firebaseio.com',
  projectId: 'squad-b0693',
  storageBucket: 'squad-b0693.appspot.com',
  messagingSenderId: '889276170925',
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers,
};
