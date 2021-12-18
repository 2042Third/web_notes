
"use strict";
var username = `user_${getRandomNumber()}`

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}



var Chat = {};

class web_chat {
    socket: WebSocket;

    constructor(){ 
        if (window.location.protocol == 'http:') {
            this.connect('ws://' + window.location.host + '/chat/chat');
        } else {
            this.connect('wss://' + window.location.host + '/chat/chat');
        }
    }

    public connect(host:string | URL){
        if ('WebSocket' in window) {
            this.socket = new WebSocket(host);
        } else if ('MozWebSocket' in window) {
            this.socket = new MozWebSocket(host);
        } else {
            append_terminal_rd('Error: WebSocket is not supported by this browser.');
            return;
        }

        this.socket.onopen = function () {
            append_terminal_gr('Info: WebSocket connection opened.');
        };

        this.socket.onclose = function () {
            append_terminal_rd('Info: WebSocket closed.');
        };
        
    }

    public send (a:string) {
        if (a != '') {
            this.socket.send(a);
        }
    } 

    
}




// document.addEventListener("DOMContentLoaded", function() {
//     // Remove elements with "noscript" class - <noscript> is not allowed in XHTML
//     var noscripts = document.getElementsByClassName("noscript");
//     for (var i = 0; i < noscripts.length; i++) {
//         noscripts[i].parentNode.removeChild(noscripts[i]);
//     }
// }, false);

