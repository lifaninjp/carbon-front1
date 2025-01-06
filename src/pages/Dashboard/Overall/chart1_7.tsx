import { ProCard, ProFormSelect } from '@ant-design/pro-components';
import { DualAxes } from '@ant-design/plots';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { getGhgByParty } from '@/services/industry-attribute-info-details/IndustryattributeInfoDetailsController';
import { useState } from 'react';

const Chart1_7: React.FC = () => {
  const { adminInfo } = useModel("global");
  const [selectTopN, setSelectTopN] = useState<number>(10);

  const ghgByParty = useRequest(
    async () => await getGhgByParty({ company_id: adminInfo?.company_id, fiscal_y: '2023', top_n: selectTopN }),
    { ready: true, refreshDeps: [selectTopN] }
  )

  const chartConfig = {
    xField: 'counterparty_nm',
    data: ghgByParty?.data,
    legend: {
      color: {
        itemMarker: 'rect'
      }
    },
    children: [
      {
        type: 'interval',
        yField: '排放量',
        style: {
          fill: (d: any, index: any) => (index === 0 ? '#E24B26' : '#5B8FF9')
        }
      },
      {
        type: 'line',
        yField: '占比',
        scale: { color: { relations: [['占比', '#fdae6b']] } },
        axis: {
          y: {
            position: 'right',
            grid: null,
            labelFormatter: (d: any) => `${d.toFixed(0)}%`
          }
        },
        tooltip: {
          items: [{ channel: 'y', valueFormatter: (d: any) => `${d.toFixed(2)}%` }],
        },
        style: { lineWidth: 2 },
      },
    ],
  };

  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard gutter={16} ghost>
        <ProCard style={{ height: 700 }} extra={<ProFormSelect
          width="sm"
          name="top_n"
          label="数値入力（TopN）"
          options={[5, 10, 15, 20].map(i => ({ label: i, value: i }))}
          fieldProps={{
            value: selectTopN,
            style: { width: "100px" },
            onChange: (value) => setSelectTopN(value),
          }}
        />}>
          <DualAxes {...chartConfig} />
        </ProCard>
      </ProCard>
    </ProCard>



  );
};

export default Chart1_7;
