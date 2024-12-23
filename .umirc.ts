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
  define: { 'process.env.API_URL': 'http://35.72.154.8:4000' },
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
      name: 'Dashboard',
      path: '/dashboard',
      routes: [
        {
          name: '整体排放',
          path: '/dashboard/overall',
          component: './Dashboard/Overall',
        },
        {
          name: '范围1排放',
          path: '/dashboard/scope1',
        },
        {
          name: '范围2排放',
          path: '/dashboard/scope2',
        },
        {
          name: '范围3排放',
          path: '/dashboard/scope3',
        },
        {
          name: '行业对标',
          path: '/dashboard/industry',
        }
      ]
    },
    {
      name: ' 数据計算',
      path: '/co2',
      routes: [
        {
          name: '数据录入',
          path: '/co2/template',
          component: './Co2/Template',
        },
        {
          name: '核算模型',
          path: '/co2/model',
        },
        {
          name: '排放因子',
          path: '/co2/factor',
        }
      ]
    },
    {
      name: '报告生成',
      path: '/report',
    },
    {
      name: '碳咨询',
      path: '/consult',
    },
    {
      name: '绿色交易',
      path: '/transaction',
      routes: [
        {
          name: '碳积分',
          path: '/transaction/credit',
        },
        {
          name: '绿色电力',
          path: '/transaction/power',
        }
      ]
    },
    {
      name: '主页管理',
      path: '/admin',
      routes: [
        {
          name: '企业信息',
          path: '/admin/setting',
          component: './Admin/Setting',
        },
        {
          name: '目标设定',
          path: '/admin/goal',
        }
      ]
    },
  ],
  npmClient: 'yarn',
});

