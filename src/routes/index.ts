import type { Application, Router } from 'express'
import { HealthRouter } from './health'
import { ProductRouter } from './products'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter]
]
export const routes = (app: Application) => {
  _routes.forEach(([url, router]) => {
    app.use(url, router)
  })
}
