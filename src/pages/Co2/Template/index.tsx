import { CAT_INDEX, YEARS_SELECT } from "@/constants";
import { ModalForm, ProForm, ProFormGroup, ProFormSelect, ProFormText, ProList } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import industryAttributeInfosServices from '@/services/industry-attribute-infos';
import industryAttributeMstsServices from '@/services/industry-attribute-msts';
import industryScopeInfosServices from '@/services/industry-scope-infos';
import scopeDataServices from '@/services/scope-datas';
import { Link, useModel } from "@umijs/max";
import { useEffect, useState } from "react";
import { Button, Form, Segmented, Space, Tag, Typography, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SafetyOutlined } from "@ant-design/icons";
import { waitTime } from "@/utils/common";

const { getIndustryAttributeInfo, updateIndustryAttributeInfo, createIndustryAttributeInfo } = industryAttributeInfosServices.IndustryAttributeInfosController;
const { getIndustryAttributeMsts } = industryAttributeMstsServices.IndustryAttributeMstsController;
const { getIndustryScopeInfos, updateIndustryScopeInfo, createIndustryScopeInfo } = industryScopeInfosServices.IndustryScopeInfosController;
const { getScopeDatas } = scopeDataServices.ScopeDatasController;

const { Text, Title } = Typography;

const segmentOptions = [{ label: "上流", value: "upplevel" }, { label: "生産", value: "product" }, { label: "下流", value: "downlevel" }].map((item: any) => ({
  label: (
    <div style={{ padding: 4 }}>
      <Text style={{ fontSize: "20px" }} type='secondary'>{item.label}</Text>
    </div>
  ),
  value: item.value,
}));

type TableListItem = {
  _id?: string;
  industry_info_id: string;
  scope_cls?: string;
  category_cls?: string;
  category_nm?: string;
  category?: string;
  title?: string;
  department?: string;
  active_data?: string;
};

const Co2TemplatePage: React.FC = () => {
  const { adminInfo } = useModel("global");
  const [selectYear, setSelectYear] = useState<string>("2023");
  const [scopeCatogry, setScopeCatogry] = useState<string>("upplevel");
  const [industryInfoId, setIndustryInfoId] = useState<string>("");

  const industryAttributeInfoRes = useRequest(
    async () => await getIndustryAttributeInfo({ valid_flg: 1, company_id: adminInfo?.company_id, fiscal_y: selectYear }),
    {
      onSuccess: (value) => { setIndustryInfoId(value.target_id) },
      refreshDeps: [selectYear]
    }
  )

  const industryAttributeMstsRes = useRequest(async () => await getIndustryAttributeMsts({ valid_flg: 1, perPage: 999 }), {
    manual: true
  })

  const industryScopeInfosRes = useRequest(async () => {
    const res = await getIndustryScopeInfos({ industry_info_id: industryInfoId, valid_flg: 1, perPage: 999 });
    return {
      total: res.totalCount,
      list: res?.industryScopeInfos?.filter(item => item.category === scopeCatogry)
    }
  }, { refreshDeps: [industryInfoId, scopeCatogry], ready: !!industryInfoId })

  const scopeInfolistData: any = industryScopeInfosRes?.data?.list?.map((item: TableListItem) => ({
    title: item.title,
    subTitle: <Space><Tag color="#5BD8A6">{item.scope_cls}</Tag><Tag hidden={!item.category_nm}>{item.category_nm}</Tag></Space>,
    actions: [
      <Link to={`manage/cat${Number(item.scope_cls?.slice(-1)) < 3 ? ['0', '10', '11'][Number(item.scope_cls?.slice(-1))] : CAT_INDEX[Number(item.category_cls?.slice(-2))]}`} state={{ industryScopeInfo: item }}>編集</Link>,
      <DeleteScopeInfoModal _id={item._id} industryScopeInfosRes={industryScopeInfosRes} />
    ],
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    content: (
      <Space direction="vertical" style={{ marginTop: "-10px", marginBlockEnd: "-30px", minHeight: "200px" }}>
        <Text style={{ fontSize: "12px" }}>想定関連部署： {item.department}</Text>
        <Text style={{ fontSize: "12px" }}>活動量データ： {item.active_data}</Text>
        {/* <img
          width={180}
          style={{ marginBlockStart: "20px" }}
          src="http://management.cc-dashboards.com/scopes/SCOPE3CAT01.svg"
        /> */}
      </Space>
    ),
  }));

  // Request ScopeData
  const scopeDataRes = useRequest(async () =>
    await getScopeDatas({ category: scopeCatogry, year: "2022", perPage: 999 })
    , { refreshDeps: [scopeCatogry], ready: !!industryInfoId })

  // Filter Scope Select Data
  const diffScopeData = [];
  for (const scopeData of scopeDataRes?.data?.scopeDatas || []) {
    if (!industryScopeInfosRes?.data?.list.find((item: any) => item.scope_cls === scopeData.scope_id && item.category_cls === scopeData.sub_scope_id)) {
      diffScopeData.push(scopeData)
    }
  }

  useEffect(() => {
    industryAttributeMstsRes.run();
  }, [])


  return (<div
    style={{
      backgroundColor: '#eee',
      padding: 40,
    }}
  >
    <ProFormGroup size={"small"}>
      <ProFormSelect
        width="sm"
        name="fiscal_y"
        label="数値入力"
        options={YEARS_SELECT.map(i => ({ label: i, value: i }))}
        fieldProps={{
          value: selectYear,
          style: { width: "100px" },
          onChange: (value) => setSelectYear(value),
        }}
      />
      {
        industryAttributeInfoRes?.data ?
          <>
            <Tag icon={<SafetyOutlined />} color="processing" style={{ padding: "4px", marginBlockStart: "2px" }}>{industryAttributeInfoRes?.data?.specify_industry_nm}</Tag>
            <UpdateAttributeModal industryAttributeInfoRes={industryAttributeInfoRes} />
            <DeleteAttributeModal industryAttributeInfoRes={industryAttributeInfoRes} />
          </>
          :
          <>
            <CreatAttributeModal adminInfo={adminInfo} industryAttributeMstsRes={industryAttributeMstsRes} industryAttributeInfoRes={industryAttributeInfoRes} selectYear={selectYear} />
          </>
      }
    </ProFormGroup>
    {industryAttributeInfoRes?.data &&
      <>
        <Segmented
          options={segmentOptions}
          block
          style={{ height: "50px", marginBottom: "10px" }}
          onChange={setScopeCatogry}
        ></Segmented>
        <ProFormGroup size={"small"}>
          <CreatScopeInfoModal diffScopeData={diffScopeData} adminInfo={adminInfo} industryInfoId={industryInfoId} industryScopeInfosRes={industryScopeInfosRes} />
        </ProFormGroup>
        <ProList<any>
          ghost
          grid={{ gutter: 10, column: 3 }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            avatar: {},
            content: {},
            actions: { cardActionProps: "actions" },
          }}
          dataSource={scopeInfolistData}
        />
      </>
    }
  </div>)
}

const CreatAttributeModal: React.FC<{ adminInfo: any, industryAttributeMstsRes: any, industryAttributeInfoRes: any, selectYear: string }> =
  ({ adminInfo, industryAttributeMstsRes, industryAttributeInfoRes, selectYear }) => {
    const [form] = Form.useForm<{
      industry_attribute_id: string;
      specify_industry_nm: string;
    }>();
    return (
      <ModalForm<{
        industry_attribute_id: string;
        specify_industry_nm: string;
      }>
        title="業界を追加する"
        trigger={
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            業界を追加
          </Button>
        }
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          cancelText: "キャンセル",
          okText: "完了"
        }}
        submitTimeout={1000}
        onFinish={async (values) => {
          await waitTime(1000);
          const createRes = await createIndustryAttributeInfo({ create_prg_id: adminInfo?.manager_id, company_id: adminInfo?.company_id, fiscal_y: selectYear, ...values });
          if (createRes.target_id) {
            message.success("追加成功");
            industryAttributeInfoRes.refresh();
          }
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name="industry_attribute_id"
            label="テンプレート"
            options={industryAttributeMstsRes?.data?.industryAttributeMsts?.map((item: any) => ({ label: item.industry_cls_nm, value: item.industry_attribute_id }))}
          />
          <ProFormText
            width="md"
            name="specify_industry_nm"
            label="業界名"
            rules={[{ required: true, message: '必須', }]}
          />
        </ProForm.Group>
      </ModalForm>
    );
  }

const UpdateAttributeModal: React.FC<{ industryAttributeInfoRes: any }> = ({ industryAttributeInfoRes }) => {
  const [form] = Form.useForm<{
    specify_industry_nm: string;
  }>();
  return (
    <ModalForm<{
      specify_industry_nm: string;
    }>
      title="業界名を編集する"
      trigger={
        <Button
          key="button"
          icon={<EditOutlined />}
          type="default"
        >
          編集
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        cancelText: "キャンセル",
        okText: "完了"
      }}
      submitTimeout={1000}
      onFinish={async (values) => {
        await waitTime(1000);
        await updateIndustryAttributeInfo({ _id: industryAttributeInfoRes?.data?._id }, values);
        message.success("更新成功");
        industryAttributeInfoRes?.refresh();
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="specify_industry_nm"
          label="業界名"
          rules={[{ required: true, message: '必須', }]}
          initialValue={industryAttributeInfoRes?.data?.specify_industry_nm}
        />
      </ProForm.Group>
    </ModalForm>
  );
}

const DeleteAttributeModal: React.FC<{ industryAttributeInfoRes: any }> = ({ industryAttributeInfoRes }) => {
  return (
    <ModalForm
      title={<Typography.Title level={4}>このアイテムを削除しますか？</Typography.Title>}
      trigger={
        <Button
          key="button"
          icon={<DeleteOutlined />}
          type="default"
        >
          削除
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        cancelText: "キャンセル",
        okText: "確定"
      }}
      submitTimeout={1000}
      onFinish={async () => {
        await waitTime(1000);
        await updateIndustryAttributeInfo({ _id: industryAttributeInfoRes?.data?._id }, { valid_flg: 0 });
        message.success("更新成功");
        industryAttributeInfoRes?.refresh();
        return true;
      }}
    >
    </ModalForm>
  );
}

const CreatScopeInfoModal: React.FC<{ industryInfoId: string, diffScopeData: any, adminInfo: any, industryScopeInfosRes: any }> =
  ({ industryInfoId, diffScopeData, adminInfo, industryScopeInfosRes }) => {
    const [form] = Form.useForm<{
      scopeDataId: string;
    }>();
    return (
      <ModalForm<{
        scopeDataId: string;
      }>
        title="Scopeを追加する"
        trigger={
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            Scopeを追加
          </Button>
        }
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          cancelText: "キャンセル",
          okText: "完了"
        }}
        submitTimeout={1000}
        onFinish={async (values) => {
          const currentScope: any = diffScopeData.find((item: any) => item._id === values.scopeDataId);
          await waitTime(1000);
          const createRes = await createIndustryScopeInfo({
            create_prg_id: adminInfo.manager_id,
            industry_info_id: industryInfoId,
            scope_cls: currentScope.scope_id,
            category_cls: currentScope.sub_scope_id,
            year: currentScope.year
          });
          if (createRes.target_id) {
            message.success("追加成功");
            industryScopeInfosRes.refresh();
          }
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="scopeDataId"
            label="カテゴリ"
            options={diffScopeData?.map((item: any) => (
              { value: item._id, label: `${item.scope_id}・${item.sub_scope_name}(${item.title})` }
            ))}
            rules={[{ required: true, message: '必須' }]}
          />
        </ProForm.Group>
      </ModalForm>
    );
  }

const DeleteScopeInfoModal: React.FC<{ _id: any, industryScopeInfosRes: any }> = ({ _id, industryScopeInfosRes }) => {
  const [form] = Form.useForm<{
    _id: string;
  }>();
  return (
    <ModalForm<{
      _id: string;
    }>
      title={<Title level={4}>このアイテムを削除しますか？</Title>}
      trigger={
        <a>削除</a>
      }
      form={form}
      modalProps={{
        destroyOnClose: true,
        centered: true,
        confirmLoading: true,
        cancelText: "キャンセル",
        okText: "確定"
      }}
      onFinish={async () => {
        await waitTime(1000);
        await updateIndustryScopeInfo({ _id }, { valid_flg: 0 });
        message.success("削除完了");
        industryScopeInfosRes.refresh();
        return true;
      }}
    >
    </ModalForm>
  )
}

export default Co2TemplatePage;