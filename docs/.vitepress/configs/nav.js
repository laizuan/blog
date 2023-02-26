import { createWebNav } from './menus/web'
import { createJavaNav } from './menus/java'
import { createArticleNav } from './menus/aritcle'
import { createGitNav } from './menus/git'

module.exports = [createJavaNav(), createWebNav(), createArticleNav(), createGitNav()]
