const redirect = require('./redirect.json')
module.exports = (req, resp, next) => {
    let hasRedirect = redirect[req.url]
    if (hasRedirect) {
        resp.writeHead(hasRedirect.status, {
            Location: hasRedirect.path});
        return resp.end()
    }
    next()
}