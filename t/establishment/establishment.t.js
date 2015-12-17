require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var net = require('net')
    var establishment = require('../..')
    var first, second
    async(function () {
        first = net.createServer()
        establishment(first, 22000, '0.0.0.0', async())
    }, function () {
        second = net.createServer()
        establishment(second, 22000, '0.0.0.0', async())
    }, function () {
        assert(first.address().port && first.address().port != second.address().port, 'bound')
        first.close(async())
        second.close(async())
    })
}
