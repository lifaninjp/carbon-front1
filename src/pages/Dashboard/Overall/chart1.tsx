import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Divider } from 'antd';

const Chart1: React.FC = () => {

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

  const dataSource = [
    {
      scope_cls: "范围一",
      unit: "吨",
      ghg: 0
    },
    {
      scope_cls: "范围二",
      unit: "吨",
      ghg: 5.94
    },
    {
      scope_cls: "范围三",
      unit: "吨",
      ghg: 3579.42
    }
  ]

  return (
      <ProTable<any>
          bordered
          options={false}
          
          columns={columns}
          request={async (params, sorter, filter) => {
            return Promise.resolve({
            });
          }}
          dataSource={dataSource}
          // onChange={setOrgMsts}
          rowKey="key"
          search={false}
        />
  );
};

export default Chart1;
