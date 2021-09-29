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
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();

const defaultImage =
  "gs://test-bot-hldq.appspot.com/static material/default user/Twemoji_1f61d.svg.png";
const auth = app.auth();
const db = app.firestore();
const storage = firebase.storage();

export { storage, firebase as default };



const addRestaurant = async (name, address, phonenum, userID, url) => {
  if (!name) {
    alert("Name is empty!");
    return false;
  }
  try {
    // const user = res.user;
    const rest_id = uuidv1()
    const data = {
      id: rest_id,
      name: name,
      address: address,
      phonenum: phonenum,
      imageUrl: url
    };
    const defaultItem = {
      name: "Empty"
    }

    await db.collection("User").doc(userID).collection("Restaurants").doc(rest_id).set(data)
    .then(
      function(docRef) {
        // Initialised the 'Menu' and 'Order' collection for the restaurants
        docRef.collection("Menu").add(defaultItem)
        // docRef.collection("Order").add(defaultItem)
      });
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const addProduct = async (name, price, description, Catagory, userID, RID, url) => {
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
      imageUrl: url
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
  if (auth.currentUser.uid) {
    return auth.currentUser.uid;
  } else {
    setTimeout(() => {
      return auth.currentUser.uid;
    }, 100);
  }
};

// real-time listener getRestaurants
export const getRestaurants = () => {
  return new Promise((resolve, reject) => {
      db
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .onSnapshot((snapshot) => {
        let updatedData = snapshot.docs
        .filter((doc) => doc.id != "Empty")
        .map((doc) => doc.data());
        resolve(updatedData);
      }, reject);
  });
};

const getcurrentRestaurantId = (rid) => {
  return new Promise((res, rej) => {
    db
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .get()
      .then((s) => {
        s.forEach((doc) => {
          if (doc.data().id === rid) {
            res(doc.id);
          }
        });
      }, rej);
  });
};

const getcurrentRestaurantName = (rid) => {
  return new Promise((resolve, reject) => {
    db
    .collection("User")
    .doc(getcurrentuserId())
    .collection("Restaurants")
    .doc(rid)
    .get()
    .then((s) => {
        resolve(s.data().name)
      }, reject);
});
};

const getUrlById = (id) => {
  return new Promise((resolve, reject) => {
    db
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .onSnapshot((snapshot) => {
        let updatedData = snapshot.docs.map((doc) => doc.data());
        let url;
        updatedData.forEach((e) => {
          if (e.id === id) {
            url = e.imageUrl
          }
        });
        resolve(url);
      }, reject);
  });
};

// real-time listener getProducts
export const getProducts = (rid) => {
  return new Promise((resolve, reject) => {
    db
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

// real-time listener getOrders
const getOrders = (rid) => {
  return new Promise((resolve, reject) => {
    db
      .collection("User")
      .doc(getcurrentuserId())
      .collection("Restaurants")
      .doc(rid)
      .collection("Order")
      .onSnapshot((snapshot) => {
        let updatedData = snapshot.docs.map((doc) => doc.data());
        resolve(updatedData);
      }, reject);
  });
};

export {
  auth,
  db,
  addRestaurant,
  getcurrentuserId,
  getcurrentuser,
  getcurrentRestaurantId,
  getcurrentRestaurantName,
  addProduct,
  getUrlById,
  getOrders
};
