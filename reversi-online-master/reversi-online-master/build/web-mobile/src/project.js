require=function c(a,r,i){function h(t,e){if(!r[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}var o=r[t]={exports:{}};a[t][0].call(o.exports,function(e){return h(a[t][1][e]||e)},o,o.exports,c,a,r,i)}return r[t].exports}for(var u="function"==typeof require&&require,e=0;e<i.length;e++)h(i[e]);return h}({ChessManager:[function(e,t,n){"use strict";cc._RF.push(t,"fd23biEYxBN7IoWrlheRQaR","ChessManager");var s=e("Constants"),c=s.CHESS_TYPE,o=s.STAND,a=s.GAME_STATE;cc.Class({extends:cc.Component,properties:{COL:8,ROW:8,chessPrefab:cc.Prefab,chesses:[]},onLoad:function(){(G.chessManager=this).chessWidth=this.node.width/this.COL;for(var e=0;e<this.COL;e++){this.chesses[e]=[];for(var t=0;t<this.ROW;t++){var n=cc.instantiate(this.chessPrefab);n.parent=this.node,n.width=this.chessWidth-5,n.height=this.chessWidth-5,n.position=cc.p(this.chessWidth/2+e*this.chessWidth,this.chessWidth/2+t*this.chessWidth);var s=n.getComponent("Chess");s.coor=cc.p(e,t),this.chesses[e][t]=s,this.addTouchEvent(s)}}this.chesses[3][3].type=c.BLACK,this.chesses[3][4].type=c.WHITE,this.chesses[4][4].type=c.BLACK,this.chesses[4][3].type=c.WHITE,G.gameManager.startGame();var o=this;G.roomSocket.on("update chessboard",function(e){o.fallChess(o.chesses[e.x][e.y])}),G.roomSocket.on("change turn",function(){G.gameManager.changeTurn()}),G.roomSocket.on("force change turn",function(){G.gameManager.forceChangeTurn()})},addTouchEvent:function(n){var s=this;n.node.on("touchend",function(e){if(G.gameManager.gameState===a.PLAYING&&G.gameManager.turn===G.stand&&n.type===c.NONE)for(var t=1;t<=8;t++){if(s.judgePass(G.gameManager.turn,n,t)){s.fallChess(n),G.roomSocket.emit("update chessboard",n.coor);break}if(8===t)return}})},fallChess:function(e){G.gameManager.turn===o.BLACK?e.type=c.BLACK:G.gameManager.turn===o.WHITE&&(e.type=c.WHITE);for(var t=1;t<=8;t++)this.judgePass(G.gameManager.turn,e,t)&&this.changePass(e,t);G.gameManager.updateScore(),G.gameManager.changeTurn(),this.judgeWin()},nearChess:function(e,t){switch(t){case 1:if(0!==e.coor.x)return this.chesses[e.coor.x-1][e.coor.y];break;case 2:if(0!==e.coor.x&&e.coor.y!==this.ROW-1)return this.chesses[e.coor.x-1][e.coor.y+1];break;case 3:if(e.coor.y!==this.ROW-1)return this.chesses[e.coor.x][e.coor.y+1];break;case 4:if(e.coor.x!==this.COL-1&&e.coor.y!==this.ROW-1)return this.chesses[e.coor.x+1][e.coor.y+1];break;case 5:if(e.coor.x!==this.COL-1)return this.chesses[e.coor.x+1][e.coor.y];break;case 6:if(e.coor.x!==this.COL-1&&0!==e.coor.y)return this.chesses[e.coor.x+1][e.coor.y-1];break;case 7:if(0!==e.coor.y)return this.chesses[e.coor.x][e.coor.y-1];break;case 8:if(0!==e.coor.x&&0!==e.coor.y)return this.chesses[e.coor.x-1][e.coor.y-1]}return null},judgePass:function(e,t,n){var s=t;if(null===(s=this.nearChess(t,n)))return!1;for(;s.type===-e;){if(null===(s=this.nearChess(s,n)))return!1;if(s.type==e)return!0}return!1},changePass:function(e,t){for(var n=this.nearChess(e,t);n.type===-G.gameManager.turn;)n.type=e.type,n=this.nearChess(n,t)},judgeMoveAble:function(e){for(var t=null,n=0;n<this.COL;n++)for(var s=0;s<this.ROW;s++)if((t=this.chesses[n][s]).type===c.NONE)for(var o=1;o<=8;o++)if(this.judgePass(e,t,o))return!0;return!1},judgeWin:function(){var e=this.judgeMoveAble(G.gameManager.turn),t=this.judgeMoveAble(-G.gameManager.trun);e||(!e&&t?(cc.log("can not move next turn"),G.gameManager.forceChangeTurn(),G.roomSocket.emit("force change turn")):e||t||(cc.log("both can not move someone win"),G.gameManager.endGame()))},getChessCount:function(){for(var e=0,t=0,n=0;n<this.chesses.length;n++)for(var s=0;s<this.chesses[n].length;s++)this.chesses[n][s].type===c.BLACK?e++:this.chesses[n][s].type===c.WHITE&&t++;return[e,t]}}),cc._RF.pop()},{Constants:"Constants"}],Chess:[function(e,t,n){"use strict";cc._RF.push(t,"038ecKdx7hAFbMdQrCbLy4q","Chess");var s=e("Constants").CHESS_TYPE;cc.Class({extends:cc.Component,properties:{pics:{default:[],type:[cc.SpriteFrame]},_type:s.NONE,type:{get:function(){return this._type},set:function(e){(this._type=e)===s.BLACK?this.getComponent(cc.Sprite).spriteFrame=this.pics[0]:e===s.WHITE?this.getComponent(cc.Sprite).spriteFrame=this.pics[1]:this.getComponent(cc.Sprite).spriteFrame=null}},coor:cc.p(0,0),chance:0},onLoad:function(){this.type=s.NONE}}),cc._RF.pop()},{Constants:"Constants"}],Constants:[function(e,t,n){"use strict";cc._RF.push(t,"12eb7dOVPtKGbYm/iRgXp8a","Constants");var s=cc.Enum({BLACK:47,WHITE:-47}),o=cc.Enum({NONE:-1,BLACK:47,WHITE:-47}),c=cc.Enum({PREPARE:-1,PLAYING:-1,OVER:-1}),a=cc.Enum({LEFT:-1,LEFT_UP:-1,UP:-1,RIGHT_UP:-1,RIGHT:-1,RIGHT_DOWN:-1,DOWN:-1,LEFT_DOWN:-1});t.exports={STAND:s,CHESS_TYPE:o,GAME_STATE:c,DIR:a},cc._RF.pop()},{}],GameManager:[function(e,t,n){"use strict";cc._RF.push(t,"e993eESIzFLR5rQMdFCiYnH","GameManager");var s=e("Constants"),o=s.GAME_STATE,c=s.STAND;s.CHESS_TYPE;cc.Class({extends:cc.Component,properties:{gameState:{default:o.PREPARE,type:o},turn:{default:c.BLACK,type:c},blackScoreLabel:cc.Label,whiteScoreLabel:cc.Label,infoPanel:cc.Node,infoLabel:cc.Label},onLoad:function(){(G.gameManager=this).infoAnimation=this.infoPanel.getComponent(cc.Animation)},startGame:function(){this.turn=c.BLACK,this.gameState=o.PLAYING,this.showInfo("start game")},endGame:function(){this.infoAnimation.on("finished",function(){G.roomSocket.disconnect(),cc.director.loadScene("menu")},this),this.gameState=o.OVER,this.showInfo("game over")},changeTurn:function(){this.turn===c.BLACK?this.turn=c.WHITE:this.turn===c.WHITE&&(this.turn=c.BLACK)},forceChangeTurn:function(){this.showInfo("force change turn"),this.changeTurn()},updateScore:function(){var e=G.chessManager.getChessCount(),t=e[0],n=e[1];this.blackScoreLabel.string=t+"",this.whiteScoreLabel.string=n+""},showInfo:function(e){var t=G.chessManager.getChessCount(),n=t[0],s=t[1];"start game"===e?G.stand===c.BLACK?this.infoLabel.string="你是蓝色方\n执黑棋先手":G.stand===c.WHITE&&(this.infoLabel.string="你是红色方\n执白棋后手"):"game over"===e?s<n?this.infoLabel.string="游戏结束\n黑棋胜":n<s?this.infoLabel.string="游戏结束\n白棋胜":n===s&&(this.infoLabel.string="游戏结束\n平局"):"force change turn"===e&&(G.stand===c.BLACK?this.infoLabel.string="黑方无子可下\n请白方下子":G.stand===c.WHITE&&(this.infoLabel.string="白方无子可下\n请黑方下子")),this.infoAnimation.play()}}),cc._RF.pop()},{Constants:"Constants"}],Global:[function(e,t,n){"use strict";cc._RF.push(t,"04fd0MxwapHrYsfCAT2HRS8","Global"),window.G={globalSocket:null,hallSocket:null,queueSocket:null,roomSocket:null,gameManager:null,chessManager:null,stand:null},cc._RF.pop()},{}],MatchManager:[function(e,t,n){"use strict";cc._RF.push(t,"6737dPBUENHLazdKLnt/lX8","MatchManager");var s=e("Constants").STAND;cc.Class({extends:cc.Component,onLoad:function(){cc.log(io);var t="http://jeejaylang13.applinzi.com";io().on("cocos linked",function(e){console.log("接受到服务器cocos linked")}),G.queueSocket=io(t+"/queue",{"force new connection":!0}),G.queueSocket.on("set stand",function(e){"black"===e?G.stand=s.BLACK:"white"===e&&(G.stand=s.WHITE)}),G.queueSocket.on("match success",function(e){cc.log("match success"+e),G.roomSocket=io(t+"/rooms"+e,{"force new connection":!0}),G.queueSocket.disconnect(),cc.director.loadScene("game")})},onBtnCancel:function(){G.queueSocket.disconnect(),cc.director.loadScene("menu")}}),cc._RF.pop()},{Constants:"Constants"}],MenuManager:[function(e,t,n){"use strict";cc._RF.push(t,"dbed4TWiO9G8rOPLhxoyUSx","MenuManager"),cc.Class({extends:cc.Component,onLoad:function(){var e="http://jeejaylang13.applinzi.com";G.globalSocket=io(e),G.hallSocket=io(e+"/hall",{"force new connection":!0})},onBtnStart:function(){G.hallSocket.disconnect(),cc.director.loadScene("match")}}),cc._RF.pop()},{}]},{},["Chess","ChessManager","GameManager","MatchManager","MenuManager","Constants","Global"]);