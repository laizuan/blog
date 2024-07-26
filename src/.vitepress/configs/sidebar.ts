import { createWebMenu } from './menus/web'
import { createJavaMenu } from './menus/java'
import { createGitMenu } from './menus/git'
import { createArticleMenu } from './menus/aritcle'

export default {
  '/web/': createWebMenu(),
  '/java/': createJavaMenu(),
  '/aritcle/': createArticleMenu(),
  '/git/': createGitMenu()
}
