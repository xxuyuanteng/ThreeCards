/**
 * Created by xuyuanteng on 2018/7/24.
 */

const Player = require("./player")
const EventListener = require("./event-listener")
const CardController = require("./card_controller")

const Room = function () {
    var that = {};
    var _playerList = [];

    var _event = EventListener({});
    var _cardController = CardController();
    _cardController.init();

    const getIndex = function () {
        var seatMap = {};
        for (var i = 0;i < _playerList.length;i++){
            seatMap[_playerList[i].getIndex()] = true;
        }
        for (var i = 0;i < 6;i ++){
            if (!seatMap.hasOwnProperty(i)){
                return i;
            }
        }
    };

    that.createPlayer = function (uid, socket) {

        var currentIndex = getIndex();
        console.log("currentIndex:" + currentIndex);
        console.log("createPlayer:" + uid);

        var player = Player({
            uid: uid,
            socket: socket,
            event: _event,
            index: currentIndex
        });
        _playerList.push(player);

        var playerDatas = [];
        for (var i = 0; i < _playerList.length;i++){
            var p1 = _playerList[i];
            playerDatas.push(
                {
                    uid: p1.getUid(),
                    index: p1.getIndex()
                }
            );
        }

        player.sendSyncData({
            uid: uid,
            index: player.getIndex(),
            house_manage_id: _playerList[0].getUid(),
            players_data: playerDatas
        });


        _event.fire("send_create_player_message",{
            uid: uid,
            index:player.getIndex()
        })
    };


    that.getPlayerCount = function () {
        return  _playerList.length;
    };

    //断线后相关操作
    _event.on("disconnect", function (uid) {
        for (var i = 0;i < _playerList.length;i++){
            if(_playerList[i].getUid() == uid){
                _playerList[i].destroy();
                _playerList.splice(i, 1);
            }
        }

        if(_playerList.length == 0){
            return;
        }

        _event.fire("player_offline", uid);
        //短线后切换房主
        _event.fire("change_house_manager_id", _playerList[0].getUid());
    });

    //开始游戏
    _event.on("start_game", function () {
        console.log("房主开始游戏");

        pushCard();
    });

    const pushCard = function () {

    };

    return that;
}

module.exports = Room;