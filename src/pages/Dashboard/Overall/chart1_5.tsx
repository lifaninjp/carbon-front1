import { ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Pie } from '@ant-design/plots';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { getGhgByOgn, getGhgByOgnScope1, getGhgByOgnScope2, getGhgByOgnScope3 } from '@/services/industry-attribute-info-details/IndustryattributeInfoDetailsController';

const Chart1_5: React.FC = () => {
  const { adminInfo } = useModel("global");
  const ghgByOgnRes = useRequest(
    async () => await getGhgByOgn({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )
  const ghgByOgnScope1Res = useRequest(
    async () => await getGhgByOgnScope1({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )
  const ghgByOgnScope2Res = useRequest(
    async () => await getGhgByOgnScope2({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )
  const ghgByOgnScope3Res = useRequest(
    async () => await getGhgByOgnScope3({ company_id: adminInfo?.company_id, fiscal_y: '2023' }),
    { ready: true }
  )

  const chartConfig = {
    data: ghgByOgnRes?.data?.map(item => ({type: `${item.ogn}/${item.inst }`, value: item.ghg_percent})),
    height: 400,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        rowMargin: 10,
      },
    },
  };

  const chartScope1Config = {
    data: ghgByOgnScope1Res?.data?.map(item => ({type: `${item.ogn}/${item.inst }`, value: item.ghg_percent})),
    height: 400,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        rowMargin: 10,
      },
    },
  };

  const chartScope2Config = {
    data: ghgByOgnScope2Res?.data?.map(item => ({type: `${item.ogn}/${item.inst }`, value: item.ghg_percent})),
    height: 400,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        rowMargin: 10,
      },
    },
  };

  const chartScope3Config = {
    data: ghgByOgnScope3Res?.data?.map(item => ({type: `${item.ogn}/${item.inst }`, value: item.ghg_percent})),
    height: 400,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        rowMargin: 10,
      },
    },
  };

  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard gutter={16} ghost>
        <ProCard colSpan={12} title= "总碳排放量" bordered>
          <Pie {...chartConfig} />
        </ProCard>
        <ProCard colSpan={12} title= "范围1总量" bordered>
          <Pie {...chartScope1Config} />
        </ProCard>
      </ProCard>
      <ProCard gutter={16} ghost>
        <ProCard colSpan={12} title= "范围2总量" bordered>
          <Pie {...chartScope2Config} />
        </ProCard>
        <ProCard colSpan={12} title= "范围3总量" bordered>
          <Pie {...chartScope3Config} />
        </ProCard>
      </ProCard>
    </ProCard>



  );
};

export default Chart1_5;
