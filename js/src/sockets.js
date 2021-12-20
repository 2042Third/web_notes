"use strict";
var username = `user_${getRandomNumber()}`;
function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}
var Chat = {};
class web_chat {
    constructor(u1) {
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
            append_terminal_rd('不支持此浏览器，请使用 Firefox, Chrom, Safari.');
            return;
        }
        this.socket.onopen = function () {
            append_terminal_gr('服务器接口打开。');
            send_regi();
        };
        this.socket.onclose = function () {
            append_terminal_rd('服务器接口关闭。');
        };
    }
    send(a) {
        if (a != '') {
            this.socket.send(a);
        }
    }
}
