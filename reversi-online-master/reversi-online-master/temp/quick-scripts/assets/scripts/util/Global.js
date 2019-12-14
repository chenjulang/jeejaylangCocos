(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/util/Global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '04fd0MxwapHrYsfCAT2HRS8', 'Global', __filename);
// scripts/util/Global.js

'use strict';

window.G = {
    globalSocket: null, //全局
    hallSocket: null, //大厅
    queueSocket: null, //队列
    roomSocket: null, //房间
    gameManager: null,
    chessManager: null,
    stand: null,
    url: ''
};

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
        //# sourceMappingURL=Global.js.map
        