// Add an event listener
document.addEventListener("logged", function(e) {
  console.log(e.detail); // Prints "Example of an event"
  console.log('APP Init');
  loadData();

  $('.app button').on('click', function(ev){
    addNote();
  });

  $('span.remove').on('click', function(ev){
    console.log('leon');
  });

});



function addNote(){

  var text = $('.app input[type="text"]').val();
  if (text !== "") {
    var userId = firebase.auth().currentUser.uid;
    var data = {
      value: text,
      date : new Date().getTime(),
      color : '#e2e2e2'
    };
    var newPostKey = firebase.database().ref('/messages/' + userId).push(data).key;
    var element = $('<div>').addClass('item').text(text).attr('data-key', newPostKey).css("background-color", data.color);
    var notes = $('.app .notes');
    notes.prepend(element);
  }

}

function loadData(){
  var database = firebase.database();
  var userId = firebase.auth().currentUser.uid;

  database.ref('/messages/' + userId ).once('value').then(function(snapshot) {
    var messages = snapshot.val();
    for (var key in messages) {
      if (messages.hasOwnProperty(key)) {

        var element = $('<div>').addClass('item').attr('data-key', key).css("background-color", messages[key].color);
        var message = $('<div>').addClass('value').text(messages[key].value);
        var controls = $('<div>').addClass('controls');
        var remove = $('<span>').addClass('remove').text('X');
        controls.append(remove);
        element.append(message);
        element.append(remove);
        var notes = $('.app .notes');
        notes.append(element);
      }
    }
  });



}


function removeItem(ev){
  console.log();
  /*var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/messages/' + userId + '/' + key).remove().then(function(){
    $('.' + key).remove();
  });*/
}
