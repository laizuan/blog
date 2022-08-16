import { createWebMenu } from './menus/web'
import { createJavaMenu } from './menus/java'
import { createArticleMenu } from './menus/aritcle'

module.exports = {
  '/web/': createWebMenu(),
  '/java/': createJavaMenu(),
  '/aritcle/': createArticleMenu(),
}
