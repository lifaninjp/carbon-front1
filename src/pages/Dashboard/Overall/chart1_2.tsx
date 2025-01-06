import { getGhgByScope3 } from '@/services/industry-attribute-info-details/IndustryattributeInfoDetailsController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';

const Chart1_2: React.FC = () => {
  const { adminInfo } = useModel("global");
  const ghgByScope3Res = useRequest(
    async () => await getGhgByScope3({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )
  const columns: ProColumns<any>[] = [
    {
      width: 100,
      title: '类别',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'category_cls',
      valueType: 'text',
    },
    {
      width: 100,
      title: '内容',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'content',
      valueType: 'text',
    },
    {
      width: 100,
      title: '2024年度排放量（单位：吨 二氧化碳当量）',
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
          dataSource={ghgByScope3Res?.data}
          rowKey="key"
          search={false}
        />
  );
};

export default Chart1_2;
