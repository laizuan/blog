import { createWebNav } from './menus/web'
import { createJavaNav } from './menus/java'
import { createArticleNav } from './menus/aritcle'
import { createGitNav } from './menus/git'
import { createLinkNav } from './menus/link'

export default [
  createJavaNav(),
  createWebNav(),
  createArticleNav(),
  createGitNav(),
  ...createLinkNav()
]
