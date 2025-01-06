import { Dropdown, MenuProps } from 'antd';
import { IdcardOutlined, LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';

const AvartarNode = (props: any) => {
  const { removeAdminInfoToken } = useModel('global');

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === "logout") {
      removeAdminInfoToken();
      window.location.reload();
    } else if(key === 'profile') {
      history.push('/profile');
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <IdcardOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log out',
    }
  ]

  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick
        }
        }
      >
        {props.avartarDom}
      </Dropdown>
    </>
  );
};

export default AvartarNode;
