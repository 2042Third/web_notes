var username = `user_${getRandomNumber()}`
const socket = io();

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

$(() => {
    // getMessages();
    const message = {
          name: "chatreg",
          message: "test_chat_user1"
      };
      postMessage(message);
    // $("#send").click(() => {
    //     const message = {
    //         name: $("#name").val(),
    //         message: $("#message").val()
    //     };
    //     postMessage(message);
    // });
});

socket.on('message', addMessage);

function addMessage({ name, message }) {
    $("#messages").append(`<h4>${name}</h4><p>${message}</p>`);
}

function getMessages() {
    $.get('https://pdm.pw/fileserv/Upload', messages => {
        messages.forEach(addMessage);
    });
}

function postMessage(message) {
    // $.post('https://pdm.pw/fileserv/Upload', message);
    // sock.connect('https://pdm.pw/fileserv/Upload').emit("chatreg", { name: "peter paul"}, (err) => {
    //   if (err) {
    //     alert(err);
    //   }
    // });
    var data = new FormData();
    data.append('chatreg','files list');
    $.ajax( {
        url: 'https://pdm.pw/fileserv/Upload',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function(data) {
          gotte = data
          // var response = jQuery.parseJSON(data);
          // if(response.code == "success") {
          //     console.log("Success!");
          // } else if(response.code == "failure") {
          //     console.log(response.err);
          // }
          // getList(response);
        }
    } );
}