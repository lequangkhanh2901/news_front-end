import { lazy } from 'react'

import routers from '../configs/baseRoutes'
import SettingLayout from '../layouts/SettingLayout'

const AddCategory = lazy(() => import('../pages/AddCategory'))
const Category = lazy(() => import('../pages/Category'))
const CategoryTrash = lazy(() => import('../pages/CategoryTrash'))
const Home = lazy(() => import('../pages/Home'))
const Post = lazy(() => import('../pages/Post'))
const WritePost = lazy(() => import('../pages/WritePost'))
const Profile = lazy(() => import('../pages/Profile'))
const SettingAccount = lazy(() => import('../pages/SettingAccount'))
const ManagerUsers = lazy(() => import('../pages/ManagerUsers'))
const ManagerPosts = lazy(() => import('../pages/ManagerPosts'))

const publicRoutes = [
  {
    path: routers.home,
    component: Home,
  },
  {
    path: routers.category,
    component: Category,
  },
  {
    path: routers.post,
    component: Post,
  },
]

const privateRoutes = {
  adminRoutes: [
    {
      path: routers.addCategory,
      component: AddCategory,
      layout: SettingLayout,
    },
    {
      path: routers.categoryTrash,
      component: CategoryTrash,
      layout: SettingLayout,
    },
    {
      path: routers.managerUsers,
      component: ManagerUsers,
      layout: SettingLayout,
    },
    {
      path: routers.managerPosts,
      layout: SettingLayout,
      component: ManagerPosts,
    },
  ],
  writerRoutes: [
    {
      path: routers.writePost,
      component: WritePost,
    },
  ],
  censorRoutes: [],
  normalUserRoutes: [
    {
      path: routers.profile,
      component: Profile,
    },
    {
      path: routers.settingAccount,
      component: SettingAccount,
      layout: SettingLayout,
    },
  ],
}

export { publicRoutes, privateRoutes }
