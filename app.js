//dari teman
const Router = require('./router')

require('./routers/web').router(Router)
require('./routers/api').router(Router)
Router.start()
