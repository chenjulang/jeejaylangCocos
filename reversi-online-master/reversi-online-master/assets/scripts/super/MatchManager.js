const Constants = require('Constants');
const STAND = Constants.STAND;
cc.Class({
    extends: cc.Component,

    onLoad: function () {
        cc.log(io);
        // var url = '127.0.0.1:5050';
        // var url = '';
        var url = G.url;



        io().on('cocos linked', function (data) {
            console.log('接受到服务器cocos linked')
        });

        G.queueSocket = io(url+'/queue', { 'force new connection': true });
        G.queueSocket.on('set stand', function (stand) {
            if (stand === 'black') {
                G.stand = STAND.BLACK;
            } else if (stand === 'white') {
                G.stand = STAND.WHITE;
            }
        });
        G.queueSocket.on('match success', function (roomId) {
            cc.log('match success' + roomId);
            G.roomSocket = io(url+'/rooms' + roomId, { 'force new connection': true });
            G.queueSocket.disconnect();
            cc.director.loadScene('game');
        });
    },

    onBtnCancel() {
        G.queueSocket.disconnect();
        cc.director.loadScene('menu');
    }
});
