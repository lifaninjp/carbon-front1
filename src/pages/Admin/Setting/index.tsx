import goalInfoServices from '@/services/goal-infos';
import orgMstServices from '@/services/organization-msts';
import { EditFilled, } from '@ant-design/icons';
import { EditableProTable, ModalForm, ProCard, ProForm, ProFormDigit, ProTable, createIntl } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Divider, Form, Select, Space, Statistic, Tag, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

const { Text, Title } = Typography;
const { getGoalInfo, createGoalInfo, updateGoalInfo } = goalInfoServices.GoalInfosController;
const { getOrganizationMsts, updateOrganizationMst, createOrganizationMst, deleteOrganizationMst } = orgMstServices.OrganizationMsts

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export type TableListItem = {
  key: string,
  organization_nm?: string;
  instituition?: string;
};

const SettingPage: React.FC = () => {
  const [tabPosition, setTabPosition] = useState("2024");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [goalInfo, setGoalInfo] = useState<GoalInfosAPI.GoalInfo>({});
  const [orgMsts, setOrgMsts] = useState<any>([]);
  const [orgMstsCount, setOrgMstsCount] = useState<number>();
  const { adminInfo } = useModel('global')

  useEffect(() => {
    (
      async () => {
        const goalInfoRes = await getGoalInfo({ company_id: adminInfo?.company_id, fiscal_y: '2024' });
        setGoalInfo(goalInfoRes);
      }
    )()
  }, []);

  const onSelectChange = async (value: any) => {
    setTabPosition(value);
    const res = await getGoalInfo({ company_id: adminInfo?.company_id, fiscal_y: value });
    setGoalInfo(res)
  }

  const EditGoalInfoModal: React.FC<{ goalInfo: GoalInfosAPI.GoalInfo }> = ({ goalInfo }) => {
    const [form] = Form.useForm<{
      scope1_target_value: number;
      scope2_target_value: number;
      scope3_target_value: number;
      annual_sales_target_value: number;
    }>();
    return (
      <ModalForm<{
        scope1_target_value: number;
        scope2_target_value: number;
        scope3_target_value: number;
        annual_sales_target_value: number;
      }>
        title={`${tabPosition}年の年間目標`}
        trigger={
          <Button type="dashed" size="large">
            <EditFilled />
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
        onFinish={async (values) => {
          await waitTime(1000);
          if (!goalInfo) {
            const newGoalInfoId = await createGoalInfo({
              company_id: adminInfo?.company_id,
              fiscal_y: tabPosition,
              create_prg_id: adminInfo?.manager_id,
              ...values
            })
            if (newGoalInfoId) message.success("更新成功");
          } else {
            const res = await updateGoalInfo({ goalInfoId: goalInfo._id }, values);
            if (res.message === '更新成功') {
              message.success(res.message);
            } else if (res.message === '更新失败') {
              message.error(res.message);
            }
          }
          const fetchRes = await getGoalInfo({ company_id: adminInfo?.company_id, fiscal_y: tabPosition });
          if (fetchRes) setGoalInfo(fetchRes);
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="scope1_target_value"
            label="Scope 1"
            initialValue={goalInfo.scope1_target_value}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="scope2_target_value"
            label="Scope 2"
            initialValue={goalInfo.scope2_target_value}

          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="scope3_target_value"
            label="Scope 3"
            initialValue={goalInfo.scope3_target_value}

          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="annual_sales_target_value"
            label="年間売上"
            initialValue={goalInfo.annual_sales_target_value}

          />
        </ProForm.Group>
      </ModalForm>
    )
  }

  const DeleteOrgMstModal: React.FC<{ rowKey: string }> = ({ rowKey }) => {
    const [form] = Form.useForm<{
      rowKey: string;
    }>();
    return (
      <ModalForm<{
        rowKey: string;
      }>
        title={<Title level={4}>このアイテムを削除しますか？</Title>}
        trigger={
          <a key="delete">
            削除
          </a>
        }
        form={form}
        modalProps={{
          destroyOnClose: true,
          centered: true,
          confirmLoading: true,
          cancelText: "キャンセル",
          okText: "確定"
        }}
        onFinish={async () => {
          const deleteCount = await deleteOrganizationMst({ organizationMstId: rowKey });
          await waitTime(500);
          if (deleteCount) window.location.reload();
          return true;
        }}
      >
      </ModalForm>
    )
  }

  return (
    <>
      <ProCard.Group title={<h2>年間目標</h2>} extra={
        <Space style={{ marginBlockEnd: 16 }}>
          <Select
            size='large'
            value={tabPosition}
            onChange={(value) => onSelectChange(value)}
            popupMatchSelectWidth={false}
            options={["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"].map(i => ({
              value: i,
              label: i
            }))}
          />
          <EditGoalInfoModal goalInfo={goalInfo} />
        </Space>}>
        <ProCard>
          <Statistic title="年間売上（百万円）" value={goalInfo.annual_sales_target_value} precision={2} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="目標設定・Scope1" value={goalInfo.scope1_target_value} suffix={<Text code>t-CO2e</Text>} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="目標設定・Scope2" value={goalInfo.scope2_target_value} suffix={<Text code>t-CO2e</Text>} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="目標設定・Scope3" value={goalInfo.scope3_target_value} suffix={<Text code>t-CO2e</Text>} />
        </ProCard>
      </ProCard.Group>

      <Divider dashed />
      <ProCard.Group title={<h2>組織設定</h2>}>
        <EditableProTable<TableListItem>
          bordered
          columns={[
            { title: "事業所", dataIndex: "organization_nm" },
            { title: "事業", dataIndex: "instituition" },
            {
              title: '操作',
              valueType: 'option',
              key: 'option',
              render: (text, record, _, action) => [
                <a
                  key="editable"
                  onClick={() => {
                    action?.startEditable?.(record.key);
                  }}
                >
                  編集
                </a>,
                <DeleteOrgMstModal rowKey={record.key} key="delete" />
              ],
            }
          ]}
          request={async (params, sorter, filter) => {
            const { current = 1, pageSize = 10, ...input } = params;
            const orgMstsRes = await getOrganizationMsts({ company_id: adminInfo?.company_id, page: current - 1, perPage: pageSize, ...input });
            const orgMstsTableData = orgMstsRes.organizationMsts?.map(item => ({ key: item._id, organization_nm: item.organization_nm, instituition: item.instituition }));
            setOrgMsts(orgMstsTableData);
            setOrgMstsCount(orgMstsRes.totalCount);
            return Promise.resolve({
              data: orgMstsTableData,
              success: true,
            });
          }}
          dataSource={orgMsts}
          onChange={setOrgMsts}
          rowKey="key"
          search={{
            layout: 'vertical',
            defaultCollapsed: false,
          }}
          recordCreatorProps={
            {
              position: 'bottom',
              record: () => ({ key: "createKey" }),
            }
          }
          editable={{
            type: 'single',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              const { index, key, ...updateInput } = data;
              if (key === "createKey") {
                await createOrganizationMst({ company_id: adminInfo?.company_id, create_prg_id: adminInfo?.manager_id, ...updateInput });
                window.location.reload();
              }
              await updateOrganizationMst({ organizationMstId: key }, updateInput);
              await waitTime(1000);
            },
            onChange: setEditableRowKeys,
            onlyOneLineEditorAlertMessage: "同時に編集できるのは1行のみ",
            onlyAddOneLineAlertMessage: "同時に追加できるのは1行のみ",
            actionRender: (row, config, defaultDom) => [
              defaultDom.save,
              defaultDom.cancel,
            ]
          }}
          pagination={{
            pageSize: 10,
            total: orgMstsCount,
          }}
        />
      </ProCard.Group>

    </>
  );
};

export default SettingPage;