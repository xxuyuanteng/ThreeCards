
import global from './global'
let self = undefined;
cc.Class({
    extends: cc.Component,

    properties: {
        sprite_frames:{
            default: [],
            type: cc.SpriteFrame
        },
        uid_label:{
            default: null,
            type: cc.Label
        },
        house_manage_label:{
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        // self = this;
        var index = Math.round(Math.random()*(this.sprite_frames.length-1));
        console.log("player index:" + index);
        this.node.addComponent(cc.Sprite).spriteFrame = this.sprite_frames[index];

        const changeHouseManager = (uid)=>{
            console.log("change_house_manager_id:" + uid + " this.uid:" + this.uid);
            this.house_manage_label.string = "";
            if(uid == this.uid){
                this.house_manage_label.string = "房主";
            }
        };
    
        global.gameEventListener.on("change_house_manager_id", changeHouseManager);
    },


    init:function (uid) {
        this.uid = uid;
        this.uid_label.string = uid + "";
        if(global.playerData.house_manage_id == this.uid){
            this.house_manage_label.string = "房主";
        }
    },

    getUid:function(){
        return this.uid;
    },

    onDestroy:function(){
        console.log("onDestroy...");
        global.gameEventListener.off("change_house_manager_id", this.changeHouseManager);

    }

    // update (dt) {},
});
