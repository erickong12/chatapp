const http = require('http')
const url = require('url')

const listen = 1234
const routing = []
var request
var response

const viewer = function(path) {
    const fs = require('fs')
    fs.readFile(`./resourse/${path}`, 'utf8', (err, page) => {
        this.write(page)
        this.end()
    })
}

exports.start = function(port) {
    let server = http.createServer((req, res) => {
        request = req
        response = res
        let reqUrl = url.parse(req.url, true)

        let checkRoute = routing.some((route) => {
            if (reqUrl.pathname == route.url && req.method == route.method) {
                req.parms = reqUrl.query
                res.view = viewer

                route.callback(req, res)
                return true;
            }
            return false;
        })
        if (!checkRoute) {
            res.write('404')
            res.end()
        }
    })
    server.listen(port || listen)
}
exports.option = function(method, url, callback) {
    routing.push({ method, url, callback })
}
exports.get = function(url, callback) {
    routing.push({ method: "GET", url, callback })
}
exports.post = function(url, callback) {
    routing.push({ method: "POST", url, callback })
}