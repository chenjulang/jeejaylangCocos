cc.Class({
    extends: cc.Component,

    onLoad: function () {
        // var url = 'http://jeejaylang13.applinzi.com';
        // var url = '127.0.0.1:5050';
        // var url = '';
        var url = G.url;

        G.globalSocket = io(url);
        //断开连接后再重新连接需要加上{'force new connection': true}
        G.hallSocket = io(url+'/hall',{'force new connection': true});
    },

    onBtnStart() {
        G.hallSocket.disconnect();
        cc.director.loadScene('match');
    }
});
