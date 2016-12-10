import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBgu07dgyo-cYre-_jqIVTyAQYIEoEIi1U",
  authDomain: "antgeek-aca8d.firebaseapp.com",
  databaseURL: "https://antgeek-aca8d.firebaseio.com",
  storageBucket: "antgeek-aca8d.appspot.com",
  messagingSenderId: "387244412232",
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
