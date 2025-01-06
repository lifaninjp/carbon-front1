import { PageContainer, ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Divider } from 'antd';
import Chart1 from './chart1';
import Chart1_2 from './chart1_2';
import Chart1_3 from './chart1_3';
import Chart1_4 from './chart1_4';
import Chart1_5 from './chart1_5';
import Chart1_6 from './chart1_6';
import Chart1_7 from './chart1_7';

const DashboardPage: React.FC = () => {
  return (
    <PageContainer>
      <ProCard.Group title={<h3>2024年度温室气体排放量</h3>}>
        <Chart1 />
      </ProCard.Group>
      <Divider dashed />
      <ProCard.Group title={<h3>范围三 2024年度温室气体排放量</h3>}>
        <Chart1_2 />
      </ProCard.Group>
      <Divider dashed />
      <ProCard.Group title={<h3>各范围及类别排放量</h3>}>
        <Chart1_3 />
      </ProCard.Group>
      <Divider dashed />
      <ProCard.Group title={<h3>月度碳排放数据展示和对比</h3>}>
        <Chart1_4 />
      </ProCard.Group>
      <Divider dashed />
      <ProCard.Group title={<h3>不同部门/事业线排放情况</h3>}>
        <Chart1_5 />
      </ProCard.Group>
      <Divider dashed />
      <ProCard.Group title={<h3>商品类比排放量及占比</h3>}>
        <Chart1_6 />
      </ProCard.Group>
      <Divider dashed />
      <ProCard.Group title={<h3>供应商排放量及占比</h3>}>
        <Chart1_7 />
      </ProCard.Group>
    </PageContainer>
  );
};

export default DashboardPage;
