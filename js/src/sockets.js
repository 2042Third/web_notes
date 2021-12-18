"use strict";
var username = `user_${getRandomNumber()}`;
function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}
var Chat = {};
class web_chat {
    constructor() {
        if (window.location.protocol == 'http:') {
            this.connect('ws://' + window.location.host + '/chat/chat');
        }
        else {
            this.connect('wss://' + window.location.host + '/chat/chat');
        }
    }
    connect(host) {
        if ('WebSocket' in window) {
            this.socket = new WebSocket(host);
        }
        else if ('MozWebSocket' in window) {
            this.socket = new MozWebSocket(host);
        }
        else {
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
    send(a) {
        if (a != '') {
            this.socket.send(a);
        }
    }
}
