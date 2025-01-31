import { ProCard } from '@ant-design/pro-components';
import { DualAxes } from '@ant-design/plots';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { getGhgByMonth } from '@/services/industry-attribute-info-details/IndustryattributeInfoDetailsController';

const Chart1_4: React.FC = () => {
  const { adminInfo } = useModel("global");
  const ghgByCatRes = useRequest(
    async () => await getGhgByMonth({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )

  const chartConfig = {
    xField: 'month',
    data: ghgByCatRes?.data,
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
        <ProCard style={{ height: 500 }}>
          <DualAxes {...chartConfig} />
        </ProCard>
      </ProCard>
    </ProCard>



  );
};

export default Chart1_4;
