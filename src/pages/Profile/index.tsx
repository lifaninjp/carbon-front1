import services from '@/services/admin-infos';
import { EditOutlined, LockOutlined, PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Flex, Form, List, Typography, message } from "antd";
import React, { useEffect } from 'react';

const { getAdminInfo, updateAdminInfo, resetPassword } = services.AdminInfosController;

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ProfilePage: React.FC = () => {
  const { adminInfo, adminInfoFull, setAdminInfoFull } = useModel('global')

  useEffect(() => {
    (
      async () => {
        const res = await getAdminInfo({ adminInfoId: adminInfo._id });
        if (res?.valid_flg === 1) setAdminInfoFull(res);
      }
    )()
  }, []);

  const { manager_full_nm, mail_add, company_nm, company_id, manager_id, tel_no } = adminInfoFull;

  const data = [
    {
      title: '氏名',
      desc: manager_full_nm
    },
    {
      title: 'ID',
      desc: manager_id
    },
    {
      title: '企業名',
      desc: company_nm
    },
    {
      title: '企業ID',
      desc: company_id
    },
    {
      title: 'Email',
      desc: mail_add
    },
    {
      title: '電話番号',
      desc: tel_no
    },
  ];

  const { Title } = Typography;

  return (
    <List
      itemLayout="horizontal"
      bordered
      size="large"
      header={<Title level={3} style={{ textAlign: "center" }}>プロフィール</Title>}
      footer={
        <Flex gap="middle" wrap="wrap" justify="center">
          <EditModal adminInfoFull={adminInfoFull} setAdminInfoFull={setAdminInfoFull} />
          <ResetPasswrdModal managerId={adminInfoFull.manager_id} />
        </Flex>
      }
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={item.desc}
          />
        </List.Item>
      )}
    />
  )
};

const ResetPasswrdModal: React.FC<{ managerId: any }> = ({ managerId }) => {
  const [form] = Form.useForm<{
    old_password: string;
    password: string;
    password_confirm: string;
  }>();
  return (
    <ModalForm<{ old_password: string; password: string, password_confirm: string }>
      title="パスワード変更"
      trigger={
        <Button type="dashed" size="large" style={{ width: "180px" }}>
          <LockOutlined />
          パスワード変更
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        cancelText: "キャンセル",
        okText: "完了"
      }}
      onFinish={async (values) => {
        await waitTime(1000);
        const res = await resetPassword({ manager_id: managerId, ...values });
        message.info(res.message);
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText.Password
          width="md"
          name="old_password"
          label="現在のパスワード"
          rules={[
            {
              required: true,
              message: '現在のパスワードを入力ください',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText.Password
          width="md"
          name="password"
          label="新しいパスワード"
          rules={[
            {
              required: true,
              message: '"新しいパスワードを入力ください',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText.Password
          width="md"
          name="password_confirm"
          label="新しいパスワードをもう一度入力する"
          rules={[
            {
              required: true,
              message: '"新しいパスワードを入力ください',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  )
}

const EditModal: React.FC<{ adminInfoFull: AdminInfosAPI.AdminInfo, setAdminInfoFull: any }> = ({ adminInfoFull, setAdminInfoFull }) => {
  const [form] = Form.useForm<{
    manager_full_nm: string;
    company_nm: string;
    tel_no: string;
  }>();
  return (
    <ModalForm<{
      manager_full_nm: string;
      company_nm: string;
      tel_no: string;
    }>
      title="プロフィール編集"
      trigger={
        <Button type="dashed" size="large" style={{ width: "180px" }}>
          <EditOutlined />
          編集
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        cancelText: "キャンセル",
        okText: "完了"
      }}
      submitTimeout={1000}
      onFinish={async (values) => {
        await waitTime(1000);
        const res = await updateAdminInfo({ adminInfoId: adminInfoFull._id }, values);
        if (res.message === '更新成功') {
          message.success(res.message);
          const fetchRes = await getAdminInfo({ adminInfoId: adminInfoFull._id });
          if (fetchRes) setAdminInfoFull(fetchRes);
        } else if (res.message === '更新失败') {
          message.error(res.message);
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="manager_full_nm"
          label="氏名"
          initialValue={adminInfoFull.manager_full_nm}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="company_nm"
          label="企業名"
          initialValue={adminInfoFull.company_nm}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="tel_no"
          label="電話番号"
          initialValue={adminInfoFull.tel_no}
        />
      </ProForm.Group>
    </ModalForm>
  );
}


export default ProfilePage;