import { defineConfig } from '@umijs/max';
import jaJP from 'antd/locale/ja_JP';

export default defineConfig({
  antd: {
    // configProvider
    configProvider: {
      locale: jaJP
    },
    // themes
    dark: false,
    compact: false,
    // less or css, default less
    style: 'less',
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {},
    // antd <App /> valid for version 5.1.0 or higher, default: undefined
    appConfig: {},
    // Transform DayJS to MomentJS
    momentPicker: true,
    // Add StyleProvider for legacy browsers
    styleProvider: {
      hashPriority: 'high',
      legacyTransformer: true,
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes: [
    {
      path: '/',
      redirect: '/admin/setting',
    },
    {
      path: '/login',
      component: './Login',
    },
    {
      path: '/profile',
      component: './Profile',
    },
    {
      path: '/co2/template/manage/cat1',
      component: './Co2/Template/Manage/cat1',
    },
     {
      path: '/co2/template/manage/cat2',
      component: './Co2/Template/Manage/cat2',
    },
     {
      path: '/co2/template/manage/cat3',
      component: './Co2/Template/Manage/cat3',
    },
    {
      path: '/co2/template/manage/cat4',
      component: './Co2/Template/Manage/cat4',
    },
    {
      path: '/co2/template/manage/cat5',
      component: './Co2/Template/Manage/cat5',
    },
    {
      path: '/co2/template/manage/cat6',
      component: './Co2/Template/Manage/cat6',
    },
    {
      path: '/co2/template/manage/cat7',
      component: './Co2/Template/Manage/cat7',
    },
    {
      path: '/co2/template/manage/cat8',
      component: './Co2/Template/Manage/cat8',
    },
    {
      path: '/co2/template/manage/cat9',
      component: './Co2/Template/Manage/cat9',
    },
    {
      path: '/co2/template/manage/cat10',
      component: './Co2/Template/Manage/cat10',
    },
    {
      path: '/co2/template/manage/cat11',
      component: './Co2/Template/Manage/cat11',
    },
    {
      name: '管理',
      path: '/admin',
      routes: [
        {
          name: '設定',
          path: '/admin/setting',
          component: './Admin/Setting',
        }
      ]
    },
    {
      name: 'Dashboard',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CO2計算',
      path: '/co2',
      routes: [
        {
          name: '数値入力',
          path: '/co2/template',
          component: './Co2/Template',
        }
      ]
    },
  ],
  npmClient: 'yarn',
});

