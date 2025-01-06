import { ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Pie } from '@ant-design/plots';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { getGhgByCat } from '@/services/industry-attribute-info-details/IndustryattributeInfoDetailsController';

const Chart1_3: React.FC = () => {
  const { adminInfo } = useModel("global");
  const ghgByCatRes = useRequest(
    async () => await getGhgByCat({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )

  const columns: ProColumns<any>[] = [
    {
      width: 100,
      title: '范围',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'scope_cls',
      valueType: 'text',
    },
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
      title: '排放量（t）',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'ghg',
      valueType: 'digit',
    },
    {
      width: 100,
      title: '排放量占比（%）',
      hideInSearch: true,
      sorter: false,
      dataIndex: 'ghg_percent',
      valueType: 'percent',
    },
  ];

  const chartConfig = {
    data: ghgByCatRes?.data?.map(item => ({type: `${item.scope_cls} ${item.category_cls && 'C'+item.category_cls.slice(item.category_cls.length-1)}`, value: item.ghg_percent})),
    angleField: 'value',
    colorField: 'type',
    height: 400,
    label: {
      text: 'value',
      position: 'spider',
      fontSize: 12,
    },
    legend: {
      color: {
        title: false,
        position: 'left',
        rowPadding: 5,
      },
    },
  };

  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard gutter={16} ghost>
        <ProCard colSpan={8} style={{ height: 900 }}>
          <ProTable<any>
            bordered
            options={false}
            columns={columns}
            request={async (params, sorter, filter) => {
              return Promise.resolve({
              });
            }}
            dataSource={ghgByCatRes?.data}
            rowKey="key"
            search={false}
          />
        </ProCard>
        <ProCard colSpan={16} style={{ top: 200 }}>
          <Pie {...chartConfig} />
        </ProCard>
      </ProCard>
    </ProCard>



  );
};

export default Chart1_3;
