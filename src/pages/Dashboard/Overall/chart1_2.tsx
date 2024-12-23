import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Divider } from 'antd';

const Chart1_2: React.FC = () => {

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

  const dataSource = [
    {
      category_cls: "类别1",
      content: "购买的产品/服务(库存商品)",
      ghg: 3529.98
    },
    {
      category_cls: "类别3",
      content: "燃料和能源-范围1和2中未包含的相关活动",
      ghg: 0.81
    },
    {
      category_cls: "类别4&9",
      content: "外购物流运输(上游+下游)",
      ghg: 31.38
    },
    {
      category_cls: "类别6",
      content: "商务旅行",
      ghg: 12.15
    },
    {
      category_cls: "类别7",
      content: "员工通勤",
      ghg: 5.11
    },
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

export default Chart1_2;
