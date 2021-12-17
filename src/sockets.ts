
"use strict";
var username = `user_${getRandomNumber()}`

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}



var Chat = {};

Chat.socket = null;

Chat.connect = (function(host) {
    if ('WebSocket' in window) {
        Chat.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
        Chat.socket = new MozWebSocket(host);
    } else {
        Console.log('Error: WebSocket is not supported by this browser.');
        return;
    }

    Chat.socket.onopen = function () {
        Console.log('Info: WebSocket connection opened.');
        document.getElementById('message').onkeydown = function(event) {
            if (event.keyCode == 13) {
                Chat.sendMessage();
            }
        };
    };

    Chat.socket.onclose = function () {
        document.getElementById('message').onkeydown = null;
        Console.log('Info: WebSocket closed.');
    };

    Chat.socket.onmessage = function (message) {
        Console.log(message.data);
    };
});

Chat.initialize = function() {
    if (window.location.protocol == 'http:') {
        Chat.connect('ws://' + window.location.host + '/chat/chat');
    } else {
        Chat.connect('wss://' + window.location.host + '/chat/chat');
    }
};

Chat.sendMessage = (function() {
    var message = document.getElementById('message').value;
    if (message != '') {
        Chat.socket.send(message);
        document.getElementById('message').value = '';
    }
});

var Console = {};

Console.log = (function(message) {
    var console = document.getElementById('output');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.innerHTML = message;
    console.appendChild(p);
    while (console.childNodes.length > 25) {
        console.removeChild(console.firstChild);
    }
    console.scrollTop = console.scrollHeight;
});

Chat.initialize();


document.addEventListener("DOMContentLoaded", function() {
    // Remove elements with "noscript" class - <noscript> is not allowed in XHTML
    var noscripts = document.getElementsByClassName("noscript");
    for (var i = 0; i < noscripts.length; i++) {
        noscripts[i].parentNode.removeChild(noscripts[i]);
    }
}, false);

