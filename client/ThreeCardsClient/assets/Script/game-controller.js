// import { isObject } from "util";

import global from './global'
import EventListener from "./event-listener"
cc.Class({
    extends: cc.Component,

    properties: {
        main_world_prefab:{
            default: null,
            type: cc.Prefab
        },
        game_world_prefab:{
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.socket = io("wss://t-rryl.zixianzi.com/bumpWebsocket");//io("localhost:3000");
        global.eventlistener = EventListener({});
        global.eventlistener.on("login", function(uid){
            console.log("button click uid:" + uid);
            global.socket.emit("login", uid);
        });

        global.eventlistener.on("start_game", function(){
            console.log("send msg start_game");
            global.socket.emit("start_game");
        });

        global.socket.on("sync_data", (data)=>{
            console.log("sync data = " + JSON.stringify(data));
            this.enterGameWorld(data);
        });

        global.socket.on("player_join", (data)=>{
            global.gameEventListener.fire("player_join", data);
        });

        global.socket.on("player_offline", (uid)=>{
            console.log("player off line = " + uid);
            global.gameEventListener.fire("player_offline", uid);
        });

        global.socket.on("change_house_manager_id", (uid)=>{
            console.log("change house manage id = " + uid);
            global.gameEventListener.fire("change_house_manager_id", uid);
        });

        this.enterMainWorld();
    },

    enterMainWorld:function(){
        if(this.runningWorld != undefined){
            this.runningWorld.removeFromParent(true);
        }
        this.runningWorld = cc.instantiate(this.main_world_prefab);
        this.runningWorld.parent = this.node;
    },

    enterGameWorld:function(data){
        console.log("enterGameWorld...");
        if(this.runningWorld != undefined){
            this.runningWorld.removeFromParent(true);
        }
        this.runningWorld = cc.instantiate(this.game_world_prefab);
        this.runningWorld.parent = this.node;
        global.gameEventListener.fire("sync_data", data);
    }


    // update (dt) {},
});
