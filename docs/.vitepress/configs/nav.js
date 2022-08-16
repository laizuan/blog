import { createWebNav } from './menus/web'
import { createJavaNav } from './menus/java'
import { createArticleNav } from './menus/aritcle'

module.exports = [createJavaNav(), createWebNav(), createArticleNav()]
