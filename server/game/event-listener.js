/**
 * Created by xuyuanteng on 2018/7/31.
 */

const EventListener = function (obj) {
        var Register = {};
        obj.on = function (name, method) {
            if (!Register.hasOwnProperty(name)){
                Register[name] = [];
            }
            Register[name].push(method);
        };
        obj.fire = function (name) {
            if (Register.hasOwnProperty(name)){
                var handerList = Register[name];
                for (var i = 0;i < handerList.length;i++){
                    var hander = handerList[i];
                    var args = [];
                    for (var j = 1;j < arguments.length;j++){
                        args.push(arguments[j]);
                    }
                    hander.apply(this, args);
                }
            }
        };
        obj.off = function (name, method) {
            if (Register.hasOwnProperty(name)){
                var handerList = Register[name];
                for (var i = 0;i < handerList.length;i++){
                    if (handerList[i] == method){
                        handerList.splice(i, 1);
                    }
                }
            }
        };
        obj.removeAllListeners = function () {
            Register = {};
        };
        return obj;
}

module.exports = EventListener;