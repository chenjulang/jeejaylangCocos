(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/super/MatchManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6737dPBUENHLazdKLnt/lX8', 'MatchManager', __filename);
// scripts/super/MatchManager.js

'use strict';

var Constants = require('Constants');
var STAND = Constants.STAND;
cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        cc.log(io);
        // var url = '127.0.0.1:5050';
        // var url = '';
        var url = 'http://jeejaylang13.applinzi.com';

        io().on('cocos linked', function (data) {
            console.log('接受到服务器cocos linked');
        });

        G.queueSocket = io(url + '/queue', { 'force new connection': true });
        G.queueSocket.on('set stand', function (stand) {
            if (stand === 'black') {
                G.stand = STAND.BLACK;
            } else if (stand === 'white') {
                G.stand = STAND.WHITE;
            }
        });
        G.queueSocket.on('match success', function (roomId) {
            cc.log('match success' + roomId);
            G.roomSocket = io(url + '/rooms' + roomId, { 'force new connection': true });
            G.queueSocket.disconnect();
            cc.director.loadScene('game');
        });
    },

    onBtnCancel: function onBtnCancel() {
        G.queueSocket.disconnect();
        cc.director.loadScene('menu');
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MatchManager.js.map
        