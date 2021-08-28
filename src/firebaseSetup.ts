import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrO9M_VF4N_Y0LCMINeSm8DgVMU_s8U5s",
  authDomain: "tests-3d7ec.firebaseapp.com",
  projectId: "tests-3d7ec",
  storageBucket: "tests-3d7ec.appspot.com",
  messagingSenderId: "455421807904",
  appId: "1:455421807904:web:998af1e1c00e5dd9565b45",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
