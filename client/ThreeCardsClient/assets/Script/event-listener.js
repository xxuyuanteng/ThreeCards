const EventListener = function(obj){
    let Register = [];
    obj.on = function(name, method){
        if (!Register.hasOwnProperty(name)) {
            Register[name] = [];
        }
        Register[name].push(method);
    };

    obj.fire = function(name) {
        if (Register.hasOwnProperty(name)) {
            var handerList = Register[name];
            for (let i = 0; i < handerList.length; i++) {
                let hander = handerList[i];
                let args = [];
                for (let j = 1; j < arguments.length; j++) {
                    args.push(arguments[j]);
                    
                }
                hander.apply(this, args);
            }
        }
    };

    obj.off = function(name, method){
        if(Register.hasOwnProperty(name)){
            var handerList = Register[name];
            for (let i = 0; i < handerList.length; i++) {
                if(handerList[i] == method){
                    handerList.splice(i, 1);
                }           
            }
        }
    };

    obj.destroy = function(){
        Register = {};
    };

    return obj;
};
export default EventListener;