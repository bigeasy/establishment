var cadence = require('cadence')
var Delta = require('delta')

module.exports = cadence(function (async, server, port, address) {
    var loop = async([function () {
        new Delta(async()).ee(server).on('listening')
        server.listen(port, address)
    }, /^EADDRINUSE$/, function () {
        port++
        return [ loop.continue ]
    }], function () {
        return [ loop.break ]
    })()
})
