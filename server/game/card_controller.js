/**
 * Created by xuyuanteng on 2018/8/7.
 */

var Card = require('./card')
var Defines = require("./defines")

const CardController = function () {
    var that = {};

    var _cardList = [];
    var initCard = function () {
        var cards = [];
        _cardList = [];
        var valueList = Object.keys(Defines.CardValues);
        var shapeList = Object.keys(Defines.CardShapes);
        for (var i = 0;i < valueList.length;i ++){
            for (var  j = 0;j < shapeList.length;j ++){
                var card = Card(valueList[i], shapeList[j]);
                cards.push(card);
            }
        }

        while (cards.length){
            var index = Math.floor(Math.random()*cards.length);
            console.log("index:" + index);
            _cardList.push(cards[index]);
            cards.splice(index, 1);
        }

        console.log("cards:" + JSON.stringify(_cardList));
        // console.log("cardListLen:" + _cardList.length);
    };



    that.init = function () {
        initCard();
    };

    //发最后一张牌
    that.popCard = function () {
        var card = _cardList[_cardList.length - 1];
        _cardList.splice(_cardList.length - 1, 1);
        if(_cardList.length <= 0){
            initCard();
        }
        return card;
    };

    return that;
};

module.exports = CardController;