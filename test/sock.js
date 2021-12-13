var username = `user_${getRandomNumber()}`
const socket = io();

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

$(() => {
    getMessages();
    const message = {
          name: "chatreg",
          message: "test_chat_user1"
      };
      postMessage(message);
    $("#send").click(() => {
        const message = {
            name: $("#name").val(),
            message: $("#message").val()
        };
        postMessage(message);
    });
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
    $.post('https://pdm.pw/fileserv/Upload', message);
}