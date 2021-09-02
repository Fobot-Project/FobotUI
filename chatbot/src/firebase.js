import firebase from "firebase";


// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyCI2vdERLGu3nKte9s2iX8zBNGcuLNw9kQ",
    authDomain: "test-bot-hldq.firebaseapp.com",
    databaseURL: "https://test-bot-hldq-default-rtdb.firebaseio.com",
    projectId: "test-bot-hldq",
    storageBucket: "test-bot-hldq.appspot.com",
    messagingSenderId: "102684075085",
    appId: "1:102684075085:web:8856a30e60aa994b94e804"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const defaultImage = "gs://test-bot-hldq.appspot.com/static material/default user/Twemoji_1f61d.svg.png";
  const auth = app.auth();
  const db = app.firestore();
  
  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
      const user = res.user;
      const data = {
        name: name,
        email: email,
        authProvider: "local",
        icon_image: defaultImage
      }
      await db.collection("User").doc(user.uid).set(data);
      await db.collection("User").doc(user.uid).collection("restaurants").doc("Empty").set({
        status: "empty"
      });
      return true
    } catch (err) {
      console.error(err);
      alert(err.message);
      return false
    }
  };

  
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};


const addRestaurant = async (name, address, phonenum) => {
  if(!name){
    alert("Name is empty!"
    )
    return false;
  }
  try {
    // const user = res.user;
    const data = {
      name: name,
      address: address,
      phonenum: phonenum
    }
    await db.collection("Restaurants").add(data);
    return true
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false
  }
};
  
export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  addRestaurant,
  logout,
};