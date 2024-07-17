import services from '@/services/admin-infos';
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProConfigProvider, ProFormText } from "@ant-design/pro-components";
import { history, useModel } from '@umijs/max';
import { Tabs, TabsProps, theme } from "antd";
import { useEffect, useState } from "react";

const { signInAdminInfos } = services.AdminInfosController;

type LoginType = 'account' | 'email';

const LoginPage: React.FC = () => {
  const { adminInfo, setAdminInfoToken } = useModel('global');

  useEffect(() => {
    if (adminInfo?.valid_flg === 1) history.push('/');
  }, []);

  const onFinish = async (values: any) => {
    const data = await signInAdminInfos(values);
    if (data?.token) {
      setAdminInfoToken(data?.token);
      window.location.reload();
    };
  }

  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('account');

  const items: TabsProps['items'] = [
    {
      key: 'account',
      label: 'Account',
    },
    {
      key: 'email',
      label: 'Email',
    },
  ];

  return (
    <ProConfigProvider
      dark
    >
      <div style={{
        backgroundColor: 'white',
        height: '100vh',
      }}>
        <LoginFormPage
          onFinish={onFinish}
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title='碳译'
          subTitle='Carbon Cipher'
          containerStyle={{
            backgroundColor: 'rgba(0, 0, 0,0.65)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Tabs items={items} centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)} />

          {loginType === 'account' && (
            <>
              <ProFormText
                name='manager_id'
                placeholder=''
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} style={{
                    color: token.colorBgBase,
                  }} />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Account !',
                  },
                ]} />
              <ProFormText.Password
                name="password"
                placeholder=''
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} style={{
                    color: token.colorBgBase,
                  }} />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Password !',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'email' && (
            <>
              <ProFormText
                name='mail_add'
                placeholder=''
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={'prefixIcon'} style={{
                    color: token.colorBgBase,
                  }} />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Email !',
                  },
                ]} />
              <ProFormText.Password
                name="password"
                placeholder=''
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} style={{
                    color: token.colorBgBase,
                  }} />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Password !',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 60,
            }}
          >
            <a
              style={{
                float: 'left',
              }}
            >
              SSO Login
            </a>
            <a
              style={{
                float: 'right',
              }}
            >
              Forgot Password?
            </a>
          </div>
        </LoginFormPage>
      </div>
    </ProConfigProvider>

  );
};

export default LoginPage;
