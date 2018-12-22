/**
 * Created by xuyuanteng on 2018/7/24.
 */

var  Socket = require("socket.io");
var  Room = require("./room")

const SocketServer = function (server) {
    var that = Socket(server);

    var _roomList = [];
    that.on("connection", function (socket) {
        console.log("a user connect");
        socket.on("login", function (uid) {
            console.log("玩家注册:" + uid);
            if (_roomList.length == 0){
                _roomList.push(Room());
            }

            if (_roomList[_roomList.length - 1].getPlayerCount() >= 6){
                _roomList.push(Room());
            }

            _roomList[_roomList.length-1].createPlayer(uid, socket);
        });

    });
    return that
};

module.exports = SocketServer;