// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path:'/user',
          redirect:'/user/login'
        },
        {
          path: '/user/login',
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user/register',
          name: 'login',
          component: './user/register',
        },
        {
          component: './404',
        },

      ],
    },
    {
      path: '/homePage',
      layout: false,
      component: '../layouts/homePageLayout',
      routes: [
        {
          path: '/homePage',
          redirect: '/homePage/allProject'
        },
        // {
        //   path: '/homePage/newProject',
        //   name: 'Home',
        //   component: './projectList/newProject',
        // },
        {
          path: '/homePage/allProject',
          name: 'Projects',
          component: './projectList/allProject',
        },
        {
          name: 'Create',
          path:'/admin/create',
          // redirect:'/admin/create'
        },
        // {
        //   path: '/homePage/About',
        //   name: 'About',
        //   component: './projectList/allProject',
        // },
        {
          component: './404',
        },
      ]
    },
    // {
    //   path: '/welcome',
    //   name: 'welcome',
    //   component: './Welcome',
    // },
    {
      path: '/project/allProject',
      icon: 'smile',
      name: 'Explore',
      component: './projectList/allProject',
    },
    {
      path: '/project/:id',
      name: 'Project View',
      hideInMenu:true,
      component: './projectList/projectItem',
    },
    {
      path: '/admin',
      name: 'admin',
      icon: 'crown',
      access: 'canAdmin',
      component: './Admin',
      routes: [
        {
          path: '/admin/create',
          name: 'Create',
          icon: 'smile',
          component: './Admin/Create',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/',
      redirect: '/homePage',
    },
    {
      layout: false,
      routes: [
        {
          component: './404'
        }
      ]
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh ?????????
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // ???????????????????????????
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
