import type { Application, Router } from 'express'
import { HealthRouter } from './health'
import { ProductRouter } from './product'
import { AuthRouter } from './auth.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/auth', AuthRouter]
]
export const routes = (app: Application) => {
  _routes.forEach(([url, router]) => {
    app.use(url, router)
  })
}
