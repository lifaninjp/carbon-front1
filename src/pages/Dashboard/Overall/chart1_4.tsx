import { ProCard } from '@ant-design/pro-components';
import { DualAxes } from '@ant-design/plots';

const Chart1_4: React.FC = () => {
  const chartConfig = {
    xField: 'month',
    data: [
      { key: 0, month: '12月', "排放量": 815.3, "占比": 815.3 / 3579.3 },
      { key: 1, month: '7月', "排放量": 365.0, "占比": 365.0 / 3579.3 },
      { key: 2, month: '9月', "排放量": 361.7, "占比": 361.7 / 3579.3 },
      { key: 3, month: '3月', "排放量": 334.3, "占比": 334.3 / 3579.3 },
      { key: 4, month: '5月', "排放量": 332.9, "占比": 332.9 / 3579.3 },
      { key: 5, month: '11月', "排放量": 327.4, "占比": 327.4 / 3579.3 },
      { key: 6, month: '8月', "排放量": 287.4, "占比": 287.4 / 3579.3 },
      { key: 7, month: '10月', "排放量": 210.7, "占比": 210.7 / 3579.3 },
      { key: 8, month: '6月', "排放量": 186.7, "占比": 186.7 / 3579.3 },
      { key: 9, month: '4月', "排放量": 165.8, "占比": 165.8 / 3579.3 },
      { key: 10, month: '1月', "排放量": 124.8, "占比": 124.8 / 3579.3 },
      { key: 11, month: '2月', "排放量": 67.3, "占比": 67.3 / 3579.3 },
    ],
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
          fill: (d: any) => (d.key === 0 ? '#E24B26' : '#5B8FF9')
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
            labelFormatter: (d: any) => `${(d * 100).toFixed(0)}%`
          }
        },
        tooltip: {
          items: [{ channel: 'y', valueFormatter: (d: any) => `${(d * 100).toFixed(2)}%` }],
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
