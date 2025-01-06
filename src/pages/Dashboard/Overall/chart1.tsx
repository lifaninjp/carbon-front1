import { getGhgByScope } from '@/services/industry-attribute-info-details/IndustryattributeInfoDetailsController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Divider } from 'antd';

const Chart1: React.FC = () => {
  const { adminInfo } = useModel("global");
  const ghgByScopeRes = useRequest(
    async () => await getGhgByScope({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )

  const columns: ProColumns<any>[] = [
    {
      width: 100,
      title: '温室气体排放类别',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'scope_cls',
      valueType: 'text',
    },
    {
      width: 100,
      title: '单位（二氧化碳当量）',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'unit',
      valueType: 'text',
    },
    {
      width: 100,
      title: '2024年度排放量',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'ghg',
      valueType: 'digit',
    },
  ];

  return (
    <ProTable<any>
      bordered
      options={false}

      columns={columns}
      request={async (params, sorter, filter) => {
        return Promise.resolve({
        });
      }}
      dataSource={ghgByScopeRes?.data}
      rowKey="key"
      search={false}
    />
  );
};

export default Chart1;
