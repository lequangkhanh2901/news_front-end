const routers = {
  home: '/',
  category: '/danh-muc/:id/:slug',
  post: '/post/:id/:slug',
  writePost: '/post/write',
  addCategory: '/category/system',
  categoryTrash: '/category/trash',
  profile: '/profile',
  setting: '/setting',
  settingAccount: '/setting/account',
  managerUsers: '/setting/manager-users',
  managerPosts: '/setting/manager-posts',
  trashPost: '/setting/post/trash',
  editPost: '/post/edit/:id',
  user: '/user/:id',
  userRegister: 'user-register/:token',
  search: '/search/:slug',
}

export default routers
