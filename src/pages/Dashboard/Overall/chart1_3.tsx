import { ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Pie } from '@ant-design/plots';

const Chart1_3: React.FC = () => {

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
      valueType: 'text',
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

  const dataSource = [
    {
      scope_cls: "Scope2",
      category_cls: "",
      ghg: 5.94,
      ghg_percent: 5.17,
    },
    {
      scope_cls: "Scope3",
      category_cls: "Category1",
      ghg: 3529.98,
      ghg_percent: 78.46,
    },
    {
      scope_cls: "Scope3",
      category_cls: "Category3",
      ghg: 0.91,
      ghg_percent: 5.02,
    },
    {
      scope_cls: "Scope3",
      category_cls: "Category4",
      ghg: 31.38,
      ghg_percent: 5.87,
    },
    {
      scope_cls: "Scope3",
      category_cls: "Category6",
      ghg: 12.15,
      ghg_percent: 5.34,
    },
    {
      scope_cls: "Scope3",
      category_cls: "Category7",
      ghg: 5.11,
      ghg_percent: 0.14,
    }
  ];

  const chartConfig = {
    data: dataSource.map(item => ({type: `${item.scope_cls} ${item.category_cls && 'C'+item.category_cls.slice(item.category_cls.length-1)}`, value: item.ghg_percent})),
    height: 500,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      position: 'outside',
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        rowPadding: 5,
      },
    },
  };

  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard gutter={16} ghost>
        <ProCard colSpan={14} style={{ height: 500 }}>
          <ProTable<any>
            bordered
            options={false}
            columns={columns}
            request={async (params, sorter, filter) => {
              return Promise.resolve({
              });
            }}
            dataSource={dataSource}
            rowKey="key"
            search={false}
          />
        </ProCard>
        <ProCard colSpan={8} style={{ height: 500 }}>
          <Pie {...chartConfig} />
        </ProCard>
      </ProCard>
    </ProCard>



  );
};

export default Chart1_3;
