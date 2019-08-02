import { IConfig, IPlugin } from 'umi-types'
import defaultSettings from './defaultSettings' // https://umijs.org/config/
import slash from 'slash2'
import webpackPlugin from './plugin.config'

const {pwa, primaryColor} = defaultSettings // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const {ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION} = process.env
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site'
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
] // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ])
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ])
}

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          redirect: '/welcome',
        },
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/exception',
          name: 'exception',
          routes: [
            {
              name: 'exception-403',
              path: '/exception/exception-403',
              component: './exception-403',
            },
            {
              name: 'exception-404',
              path: '/exception/exception-404',
              component: './exception-404',
            },
            {
              name: 'exception-500',
              path: '/error/exception-500',
              component: './exception-500',
            },
          ],
        },
        {
          path: '/account',
          name: 'account',
          routes: [
            {
              name: 'account-center',
              path: '/account/account-center',
              component: './account-center',
            },
            {
              name: 'account-settings',
              path: '/account/account-settings',
              component: './account-settings',
            },
          ],
        },
        {
          path: '/list',
          name: 'list',
          routes: [
            {
              name: 'basic-list',
              path: '/list/basic-list',
              component: './basic-list',
            },
            {
              name: 'card-list',
              path: '/list/card-list',
              component: './card-list',
            },
            {
              name: 'search-list',
              path: '/list/search',
              // component: './List/List',
              routes: [
                {
                  path: '/list/search',
                  redirect: '/list/search/search-list-articles',
                },
                {
                  name: 'search-list-applications',
                  path: '/list/search/search-list-applications',
                  component: './search-list-applications',
                },
                {
                  name: 'search-list-articles',
                  path: '/list/search/search-list-articles',
                  component: './search-list-articles',
                },
                {
                  name: 'search-list-projects',
                  path: '/list/search/search-list-projects',
                  component: './search-list-projects',
                },
                {
                  name: 'search-list',
                  path: '/list/search/search-list',
                  component: './search-list',
                },
              ],
            },
            {
              name: 'table-list',
              path: '/list/table-list',
              component: './table-list',
            },
          ],
        },
        {
          path: '/result',
          name: 'result',
          routes: [
            {
              name: 'result-fail',
              path: '/result/result-fail',
              component: './result-fail',
            },
            {
              name: 'result-success',
              path: '/result/result-success',
              component: './result-success',
            },
            {
              name: 'advanced-profile',
              path: '/result/advanced-profile',
              component: './advanced-profile',
            },
            {
              name: 'basic-profile',
              path: '/result/basic-profile',
              component: './basic-profile',
            },
          ],
        },
        {
          path: '/form',
          name: 'form',
          routes: [
            {
              name: 'advanced-form',
              path: '/form/advanced-form',
              component: './advanced-form',
            },
            {
              name: 'basic-form',
              path: '/form/basic-form',
              component: './basic-form',
            },
            {
              name: 'step-form',
              path: '/form/step-form',
              component: './step-form',
            },
          ],
        },
        {
          path: '/user',
          name: 'user',
          routes: [
            {
              name: 'user-login',
              path: '/user/user-login',
              component: './user-login',
            },
            {
              name: 'user-register-result',
              path: '/user/user-register-result',
              component: './user-register-result',
            },
            {
              name: 'user-register',
              path: '/user/user-register',
              component: './user-register',
            },
          ],
        },
        {
          path: '/other',
          name: 'other',
          routes: [
            {
              name: 'analysis',
              path: '/other/analysis',
              component: './analysis',
            },
            {
              name: 'monitor',
              path: '/other/monitor',
              component: './monitor',
            },
            {
              name: 'workplace',
              path: '/other/workplace',
              component: './workplace',
            },
            {
              name: 'flow',
              path: '/other/flow',
              component: './flow',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName
      }

      const match = context.resourcePath.match(/src(.*)/)

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '')
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase())
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-')
      }

      return localName
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
} as IConfig
