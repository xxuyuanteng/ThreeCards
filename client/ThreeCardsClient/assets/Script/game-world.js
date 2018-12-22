
import global from './global'
import EventListener from './event-listener';

cc.Class({
    extends: cc.Component,

    properties: {
        player_node_prefab:{
            default: null,
            type: cc.Prefab
        },
        player_pos_list:{
            default: [],
            type: cc.Node
        },
        game_start_ui:{
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this._index = 0;
        this.game_start_ui.active = false;
        this.playerNodeList = [];
        global.gameEventListener = EventListener({});

        global.gameEventListener.on("sync_data", (data)=>{
            console.log("game world sync data = " + JSON.stringify(data));
            global.playerData.uid = data.uid;
            global.playerData.house_manage_id = data.house_manage_id;
            //房主显示开始游戏按钮
            if (data.uid == data.house_manage_id) {
                this.game_start_ui.active = true;
            }
            console.log("house_manage_id:" + global.playerData.house_manage_id);
            var _playersData = data.players_data;
            this._index = data.index;
            for(var i = 0;i < _playersData.length;i++){
                var playerData = _playersData[i];
                this.createPlayer(playerData.uid, playerData.index);
            }
        });

        global.gameEventListener.on("player_join", (data)=>{
            console.log("player join " + JSON.stringify(data));
            this.createPlayer(data.uid, data.index);
        });

        global.gameEventListener.on("player_offline", (uid)=>{
            console.log("player offline " + uid);
            for (var i = 0; i < this.playerNodeList.length; i++) {
                var playerNode = this.playerNodeList[i];
                if (playerNode.getComponent("player-node").getUid() == uid) {
                    playerNode.removeFromParent(true);
                    playerNode.destroy();
                    this.playerNodeList.splice(i, 1);
                }   
            }
        });

        global.gameEventListener.on("change_house_manager_id", (uid)=>{
            global.playerData.house_manage_id = uid;
            if(uid == global.playerData.uid){
                this.game_start_ui.active = true;
            }
        });
    },

    createPlayer:function(uid, index){
        console.log("createPlayer...uid:" + uid + " index:" + index);
        var currentIndex = index - this._index;
        if (currentIndex < 0){
            currentIndex = currentIndex + 6;
        }
        var player = cc.instantiate(this.player_node_prefab);
        player.parent = this.node;
        player.getComponent("player-node").init(uid);
        player.position = this.player_pos_list[currentIndex].position;
        this.playerNodeList.push(player);
    },

    onClickStartGame:function(event, customData){
        console.log("onClickStartGame:" + customData);
        global.eventlistener.fire("start_game");
    }

    // update (dt) {},
});
