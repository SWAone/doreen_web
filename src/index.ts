import { Hono } from 'hono'
import { createBunWebSocket, serveStatic } from 'hono/bun'
import { createMiddleware } from 'hono/factory'
const app = new Hono();
let s = createMiddleware((c, next) => {


  c.header('cache-control', 'public, max-age=31536000')

  return next()
})
app.use(s)
app.get('/*', serveStatic({
  root: "/web/", rewriteRequestPath: p => {
    // console.log(p)
    return p.replace(/^\/web/, '')
  }
}))

app.get('/admin/*', serveStatic({
  root: "/web/", rewriteRequestPath: p => {

    return p.replace(/^\/admin/, '')
  }
}))
app.get('/tajer*', serveStatic({
  root: "/tajer", rewriteRequestPath: p => {

    return p.replace(/^\/tajer/, '')
  }
}))
app.get('/', serveStatic({ path: "/web/index.html" }))
app.get('/admin', serveStatic({ path: "/web/index.html" }))
app.get('/tajer*', serveStatic({ path: "/tajer/index.html" }))



export default {
  fetch: app.fetch,
  port: 3600
}
