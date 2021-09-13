import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import { v1 as uuidv1 } from "uuid";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyCI2vdERLGu3nKte9s2iX8zBNGcuLNw9kQ",
  authDomain: "test-bot-hldq.firebaseapp.com",
  databaseURL: "https://test-bot-hldq-default-rtdb.firebaseio.com",
  projectId: "test-bot-hldq",
  storageBucket: "test-bot-hldq.appspot.com",
  messagingSenderId: "102684075085",
  appId: "1:102684075085:web:8856a30e60aa994b94e804",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const defaultImage =
  "gs://test-bot-hldq.appspot.com/static material/default user/Twemoji_1f61d.svg.png";
const auth = app.auth();
const db = app.firestore();
const firestore = app.firestore();
const storage = firebase.storage();

export { storage, firebase as default };

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
    throw new Error();
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("The password is too weak.");
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
      icon_image: defaultImage,
    };

    await db.collection("User").doc(user.uid).set(data);
    await db
      .collection("User")
      .doc(user.uid)
      .collection("restaurants")
      .doc("Empty")
      .set({
        status: "empty",
      });
    return auth.currentUser.updateProfile({
      displayName: name,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
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

const addRestaurant = async (name, address, phonenum, userID) => {
  if (!name) {
    alert("Name is empty!");
    return false;
  }
  try {
    // const user = res.user;
    const data = {
      id: uuidv1(),
      name: name,
      address: address,
      phonenum: phonenum,
    };
    await db.collection("User").doc(userID).collection("Restaurants").add(data);
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const addProduct = async (name, price, description, Catagory, userID, RID) => {
  if (!name) {
    alert("Name is empty!");
    return false;
  }
  try {
    const data = {
      name: name,
      price: price,
      description: description,
      Catagory: Catagory,
    };
    await db
      .collection("User")
      .doc(userID)
      .collection("Restaurants")
      .doc(RID)
      .collection("Menu")
      .add(data);
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};
const getcurrentuser = () => {
  return auth.currentUser.displayname;
};
const getcurrentuserId = () => {
  return auth.currentUser.uid;
};

// real-time listener getRestaurants
export const getRestaurants = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .onSnapshot((snapshot) => {
        let updatedData = snapshot.docs.map((doc) => doc.data());
        resolve(updatedData);
      }, reject);
  });
};

const getcurrentRestaurantId = (rid) => {
  return new Promise((res, rej) => {
    firestore
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .get()
      .then((s) => {
        s.forEach((doc) => {
          if (doc.data().id === rid) {
            console.log(`${doc.id}`);
            res(doc.id);
          }
        });
      }, rej);
  });
};
const getRestaurantById = (id) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .onSnapshot((snapshot) => {
        let updatedData = snapshot.docs.map((doc) => doc.data());
        let restaurant;
        updatedData.forEach((e) => {
          if (e.id === id) {
            restaurant = e;
          }
        });
        resolve(restaurant);
      }, reject);
  });
};

// real-time listener getProducts
export const getProducts = (rid) => {
  console.log(`${rid}: ${typeof rid}`);
  if(!rid) {
    setTimeout(()=>{},100)
  } 
  return new Promise((resolve, reject) => {
    firestore
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .doc(rid)
      .collection("Menu")
      .onSnapshot((snapshot) => {
        let updatedData = snapshot.docs.map((doc) => doc.data());
        resolve(updatedData);
      }, reject);
  });
    
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  addRestaurant,
  logout,
  getcurrentuserId,
  getcurrentuser,
  getcurrentRestaurantId,
  addProduct,
};
