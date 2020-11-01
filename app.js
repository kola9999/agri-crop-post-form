
var firebaseConfig = {
  apiKey: "AIzaSyBdVy7Tn4HniT6NMzvARzp6qRbF3mHmhRM",
  authDomain: "potent-symbol-233716.firebaseapp.com",
  databaseURL: "https://potent-symbol-233716.firebaseio.com",
  projectId: "potent-symbol-233716",
  storageBucket: "potent-symbol-233716.appspot.com",
  messagingSenderId: "1075928338495",
  appId: "1:1075928338495:web:b0ca7383d74ae5e030a88a"
  };
firebase.initializeApp(firebaseConfig);


let formMessage = firebase.database().ref('Posts');

document
  .getElementById('postform')
  .addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  // Get Values from the DOM
  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  let price = document.querySelector('#price').value;
  let contact = document.querySelector('#contact').value;

  //send message values
  // sendMessage(title, description);

  
}

function sendMessage(title,description) {
  let newFormMessage = formMessage.push();
  newFormMessage.set({
    title: title,
    description: description,
    price: price,
    contact: contact

  });
}


var uploader = document.getElementById('uploader')
var fileButton = document.getElementById('images')

fileButton.addEventListener('change',function(e){
  
  var file = e.target.files[0];
  var filename = file.name;
var metadata = {
  contentType: 'image/jpeg'
};
var storageRef = firebase.storage().ref();
var uploadTask = storageRef.child('post_images/' + file.name).put(file, metadata);
uploadTask.on('state_changed',
  function progress(snapshot){
var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
uploader.value = percentage;
  },
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING:
        console.log('Upload is running');
        break;
    }
  },function(error) {
  switch (error.code) {
    case 'storage/unauthorized':
      break;

    case 'storage/canceled':
      break;

    case 'storage/unknown':
      break;
  }
}, function() {
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    var database = firebase.database();
//var downloadURL = uploadTask.snapshot.downloadURL;
let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  let category = document.querySelector('#category').value;
  let price = document.querySelector('#price').value;
  let contact = document.querySelector('#contact').value;

 var postData = {
    URL: downloadURL,
    title:title,
    description: description,
    category: category,
    price: price,
    contact: contact
  };
var newPostKey = firebase.database().ref().child('Posts').push().key;
  var updates = {};
  updates['/cropposts/' + newPostKey] = postData;
 // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  document.getElementById('postform').reset();
  });
}));

});