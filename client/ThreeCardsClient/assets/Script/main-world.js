import global from "./global"


cc.Class({
    extends: cc.Component,

    properties: {
        edit_box:{
            default: null,
            type: cc.EditBox
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    buttonClickLogin:function(event, customData){
        console.log("buttonClickLogin:" + customData);
        console.log("edit_box string:" + this.edit_box.string);
        if(this.edit_box.string.length != 0){
            global.eventlistener.fire("login", this.edit_box.string);
        }
    }

    // update (dt) {},
});
