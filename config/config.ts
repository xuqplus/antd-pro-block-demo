import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
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
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
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
          name: 'exception-403',
          path: '/exception-403',
          component: './exception-403',
        },
        {
          name: 'account-center',
          path: '/account-center',
          component: './account-center',
        },
        {
          name: 'account-settings',
          path: '/account-settings',
          component: './account-settings',
        },
        {
          name: 'analysis',
          path: '/analysis',
          component: './analysis',
        },
        {
          name: 'monitor',
          path: '/monitor',
          component: './monitor',
        },
        {
          name: 'workplace',
          path: '/workplace',
          component: './workplace',
        },
        {
          name: 'flow',
          path: '/flow',
          component: './flow',
        },
        {
          name: 'exception-404',
          path: '/exception-404',
          component: './exception-404',
        },
        {
          name: 'exception-500',
          path: '/exception-500',
          component: './exception-500',
        },
        {
          name: 'advanced-form',
          path: '/advanced-form',
          component: './advanced-form',
        },
        {
          name: 'basic-form',
          path: '/basic-form',
          component: './basic-form',
        },
        {
          name: 'step-form',
          path: '/step-form',
          component: './step-form',
        },
        {
          name: 'basic-list',
          path: '/basic-list',
          component: './basic-list',
        },
        {
          name: 'card-list',
          path: '/card-list',
          component: './card-list',
        },
        {
          name: 'search-list-applications',
          path: '/search-list-applications',
          component: './search-list-applications',
        },
        {
          name: 'search-list-articles',
          path: '/search-list-articles',
          component: './search-list-articles',
        },
        {
          name: 'search-list-projects',
          path: '/search-list-projects',
          component: './search-list-projects',
        },
        {
          name: 'search-list',
          path: '/search-list',
          component: './search-list',
        },
        {
          name: 'table-list',
          path: '/table-list',
          component: './table-list',
        },
        {
          name: 'advanced-profile',
          path: '/advanced-profile',
          component: './advanced-profile',
        },
        {
          name: 'basic-profile',
          path: '/basic-profile',
          component: './basic-profile',
        },
        {
          name: 'result-fail',
          path: '/result-fail',
          component: './result-fail',
        },
        {
          name: 'result-success',
          path: '/result-success',
          component: './result-success',
        },
        {
          name: 'user-login',
          path: '/user-login',
          component: './user-login',
        },
        {
          name: 'user-register-result',
          path: '/user-register-result',
          component: './user-register-result',
        },
        {
          name: 'user-register',
          path: '/user-register',
          component: './user-register',
        },
        {
          path: '/',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
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
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
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
} as IConfig;
