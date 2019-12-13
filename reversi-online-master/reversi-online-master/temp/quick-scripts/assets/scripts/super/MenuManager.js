(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/super/MenuManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dbed4TWiO9G8rOPLhxoyUSx', 'MenuManager', __filename);
// scripts/super/MenuManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        var url = 'http://jeejaylang13.applinzi.com';
        // var url = '127.0.0.1:5050';
        // var url = '';

        G.globalSocket = io(url);
        //断开连接后再重新连接需要加上{'force new connection': true}
        G.hallSocket = io(url + '/hall', { 'force new connection': true });
    },

    onBtnStart: function onBtnStart() {
        G.hallSocket.disconnect();
        cc.director.loadScene('match');
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
        //# sourceMappingURL=MenuManager.js.map
        