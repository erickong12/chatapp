exports.router = function(route) {
    route.get('/', (req, res) => {
        res.view('index.html')
    })
    route.get('/o', (req, res) => {
        res.view('about.html')
    })
}