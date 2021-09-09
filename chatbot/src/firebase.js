import firebase from "firebase";
import 'firebase/firestore'
import "firebase/storage";


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
  const firestore = app.firestore()
  const storage = firebase.storage();

  export { storage, firebase as default };
  
  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw(new Error)
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
      return auth.currentUser.updateProfile({
        displayName: name
      });
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


const addRestaurant = async (name, address, phonenum, userID) => {
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
    await db.collection("User").doc(userID).collection("Restaurants").add(data);
    return true
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false
  }
};

const addProduct = async (name, price, description,Catagory,userID,RID) => {
  if(!name){
    alert("Name is empty!"
    )
    return false;
  }
  try {
    const data = {
      name: name,
      price: price,
      description: description,
      Catagory: Catagory
    }
    await db.collection("User").doc(userID).collection("Restaurants").doc(RID).collection("Products").add(data);
    return true
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false
  }
};
  
const getcurrentuser =()=>{
  return auth.currentUser.displayName
};

// real-time listener getRestaurants
export const getRestaurants = () => {
  return new Promise((resolve, reject) => {
    firestore.collection("Restaurants")
    .onSnapshot((snapshot) => {
      console.log('Received doc snapshot: ${docSnapshot}')
      let updatedData = snapshot.docs.map(doc => doc.data())
      resolve(updatedData)
    }, reject)
  })
}

// real-time listener getProducts
export const getProducts = () => {
  return new Promise((resolve, reject) => {
    firestore.collection("Products")
    .onSnapshot((snapshot) => {
      console.log('Received doc snapshot: ${docSnapshot}')
      let updatedData = snapshot.docs.map(doc => doc.data())
      resolve(updatedData)
    }, reject)
  })
}

// //Get elements
// var fileButton = document.getElementById('fileButton');
// var uploader = document.getElementById('uploder');
// //Listen for file selection
// fileButton.addEventListener('change', function(e){
//   //Get file
//   var file = e.target.files[0];
//   //create a storage ref
//   var storageRef = firebase.storage().ref('retaurants_images/'+file.name);
//   //upload file
//   var task = storageRef.put(file);
//   //Update progress bar
//   task.on('state_changed',
//     function progress(snapshot){
//       var percentage = (snapshot.bytesTransFerred /
//         snapshot.totalBytes) * 100;
//         uploader.value = percentage;
//     },
//     function errerror(err){

//     },
//     function complete() {

//     }
    
//   );

// });


export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  addRestaurant,
  logout,
  getcurrentuser,
  addProduct,
};