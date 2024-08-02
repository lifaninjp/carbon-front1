import { MONTH_SELECT } from "@/constants";
import { FIELD_NAMES } from "@/constants/locale";
import industryAttributeInfoDetails from "@/services/industry-attribute-info-details";
import organizationMsts from "@/services/organization-msts";
import scopeDatas from "@/services/scope-datas";
import { waitTime } from "@/utils/common";
import { CloudDownloadOutlined, CloudUploadOutlined, DeleteOutlined, DownloadOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ModalForm, ProColumns, ProForm, ProFormField, ProFormItem, ProFormSelect, ProFormText, ProFormUploadButton, ProTable } from "@ant-design/pro-components";
import { useLocation, useModel } from "@umijs/max";
import { useRequest } from "ahooks";
import { Alert, Button, Descriptions, Divider, Form, Typography, Upload, message } from "antd";
import type { DescriptionsProps } from 'antd';
import dayjs from 'dayjs';
import { Decimal } from 'decimal.js';
import React, { useState } from "react";
import { read, utils, writeFile } from 'xlsx';


const { getIndustryAttributeInfoDetails, createIndustryAttributeInfoDetail, updateIndustryAttributeInfoDetail, importIndustryAttributeInfoDetails } = industryAttributeInfoDetails.IndustryScopeInfoDetailssController;
const { getOrganizationMsts } = organizationMsts.OrganizationMsts
const { getScopeDatas } = scopeDatas.ScopeDatasController

type TableListItem = {
  _id: string,
  company_id: string,
  organization_id: string,
  industry_info_id: string,
  counterparty_nm: string,
  kind_cd: string,
  kind_type_nm: string,
  activity_unit: string,
  activity_store: number,
  activity_area: number,
  activity_period: number,
  emission_factor: number,
  emission_factor_unit: string,
  ghg_emission: number,
  scope_status_cls: number,
  scope_cls: string,
  category_cls: string,
  category_nm: string,
  fiscal_y: string,
  monthly: string,
  target_id: string,
  updatedAt: Date,
  organization_nm: string;
  instituition: string;
};

const Co2ManagePage: React.FC = () => {

  const { adminInfo } = useModel("global");
  const { state: { industryScopeInfo } }: { state: any } = useLocation();
  const { industry_info_id, scope_cls, category_cls, department, active_data, description, category_nm, title, fiscal_y, company_id } = industryScopeInfo;

  const industryAttributeInfoDetailsRes = useRequest(
    async (args) => await getIndustryAttributeInfoDetails({ industry_info_id, scope_cls, category_cls, valid_flg: 1, fiscal_y, perPage: 99999, ...args }),
    { ready: true }
  )
  const [filterObj, setFilterObj] = useState({ industry_info_id, scope_cls, category_cls, valid_flg: 1, fiscal_y });

  const dataSource = industryAttributeInfoDetailsRes?.data?.industryAttributeInfoDetails;

  const organizationMstsRes = useRequest(
    async () => await getOrganizationMsts({ company_id, valid_flg: 1, perPage: 9999 }),
    { ready: true }
  )
  const organizationMstsData = organizationMstsRes?.data?.organizationMsts as OrganizationMstsAPI.OrganizationMst[];

  const scopeDatasRes = useRequest(
    async () => await getScopeDatas({ scope_id: scope_cls, sub_scope_id: category_cls, is_show_all: 1 }),
    { ready: true }
  )
  const scopeData = scopeDatasRes?.data?.scopeDatas[0] as ScopeDatasAPI.ScopeData;

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '想定関連部署',
      children: department,
    },
    {
      key: '2',
      label: '活動量データ',
      children: active_data,
    },
    {
      key: '3',
      label: 'SCOPEの説明',
      children: description,
    }
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '時期',
      dataIndex: 'fiscal_y',
      renderText: (text, record, index) => `${record?.fiscal_y}-${record?.monthly}`,
    },
    {
      title: '事業',
      dataIndex: 'instituition',
    },
    {
      title: '事業所',
      dataIndex: 'organization_nm',
    },
    {
      title: '相手先',
      dataIndex: 'counterparty_nm',
    },
    {
      title: '種類',
      dataIndex: 'kind_type_nm',
      search: false
    },
    {
      title: '活動量単位',
      dataIndex: 'emission_factor_unit',
      search: false
    },
    {
      title: '活動量（店舗）',
      dataIndex: 'activity_store',
      search: false
    },
    {
      title: '活動量（面積）',
      dataIndex: 'activity_area',
      search: false
    },
    {
      title: '活動量（期間）',
      dataIndex: 'activity_period',
      search: false
    },
    {
      title: '排出係数',
      dataIndex: 'emission_factor',
      search: false
    },
    {
      title: 'GHG排出量[t-CO2e]',
      dataIndex: 'ghg_emission',
      search: false
    },
    {
      title: '更新時間',
      dataIndex: 'updatedAt',
      renderText: (text, record, index) => dayjs(text).format('YYYY-MM-DD'),
      search: false
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      render: (text, record, _, action) => [
        <UpdateModal
          adminInfo={adminInfo}
          organizationMstsData={organizationMstsData}
          scopeData={scopeData}
          industryAttributeInfoDetailsRes={industryAttributeInfoDetailsRes}
          itemData={record}
        />,
        <DeleteModal industryAttributeInfoDetailsRes={industryAttributeInfoDetailsRes} _id={record._id} />
      ],
    }
  ];

  return (
    <div style={{
      backgroundColor: '#eee',
      padding: 20,
    }}>
      <Descriptions title={`${scope_cls}・${category_nm}（${title}）`} items={items} column={1} bordered />
      <Divider />
      <ProTable
        columns={columns}
        rowKey="id"
        search={false}
        pagination={{
          defaultPageSize: 10,
        }}
        headerTitle="SCOPEデータ"
        dataSource={dataSource}
        toolBarRender={() => [
          <CreatModal
            adminInfo={adminInfo}
            industryScopeInfo={industryScopeInfo}
            organizationMstsData={organizationMstsData}
            scopeData={scopeData}
            industryAttributeInfoDetailsRes={industryAttributeInfoDetailsRes}
          />,
          <FilterModal
            industryScopeInfo={industryScopeInfo}
            organizationMstsData={organizationMstsData}
            scopeData={scopeData}
            industryAttributeInfoDetailsRes={industryAttributeInfoDetailsRes}
            setFilterObj={setFilterObj}
          />,
          <ExcelUpload adminInfo={adminInfo} industryScopeInfo={industryScopeInfo} organizationMstsData={organizationMstsData} scopeData={scopeData} industryAttributeInfoDetailsRes={industryAttributeInfoDetailsRes} />,
          <ExcelDownload dataSource={dataSource} columns={columns} />,
          <TemplateDownload />

        ]}
        scroll={{ x: 1300 }}
      />
    </div>
  )
}

const CreatModal: React.FC<{
  adminInfo: any,
  industryScopeInfo: any,
  organizationMstsData: OrganizationMstsAPI.OrganizationMst[],
  scopeData: ScopeDatasAPI.ScopeData,
  industryAttributeInfoDetailsRes: any
}> =
  ({ adminInfo, industryScopeInfo, organizationMstsData, scopeData, industryAttributeInfoDetailsRes }) => {
    const [form] = Form.useForm<{
      monthly: string;
      organization_id: string;
      counterparty_nm: string;
      kind_cd: string;
      kind_type_nm: string;
      emission_factor: number;
      activity_store: number;
      activity_area: number;
      activity_period: number;
      activity_unit: string;
      emission_factor_unit: string;
    }>();
    const { industry_info_id, company_id, fiscal_y, scope_cls, category_cls, category_nm } = industryScopeInfo;
    const kindCdKey = Form.useWatch('kind_cd', form);
    return (
      <ModalForm<{
        monthly: string;
        organization_id: string;
        counterparty_nm: string;
        kind_cd: string;
        kind_type_nm: string;
        emission_factor: number;
        activity_store: number;
        activity_area: number;
        activity_period: number;
        activity_unit: string;
        emission_factor_unit: string;
      }>
        title="記録を追加する"
        trigger={
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            記録を追加
          </Button>
        }
        style={{ marginBottom: -150 }}
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          cancelText: "キャンセル",
          okText: "完了"
        }}
        submitTimeout={1000}
        onFinish={async (values) => {
          const emissionFactor = new Decimal(values.emission_factor);
          const activityAmount = new Decimal(kindCdKey.includes('Store') ? values.activity_store : values.activity_area * values.activity_period)
          const createRes = await createIndustryAttributeInfoDetail({
            create_prg_id: adminInfo?.manager_id,
            industry_info_id,
            company_id,
            fiscal_y,
            scope_cls,
            category_cls,
            category_nm,
            ghg_emission: emissionFactor.times(activityAmount).toNumber(),
            ...values
          });
          if (createRes.target_id) {
            message.success("追加成功");
            industryAttributeInfoDetailsRes.refresh();
          }
          await waitTime(1000);
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width="xl"
            name="monthly"
            label="時期"
            placeholder="時期"
            options={MONTH_SELECT.map(i => ({ label: `${fiscal_y}-${i}`, value: i }))}
            rules={[{ required: true, message: '必須' }]}
          />
          <ProFormSelect
            width="xl"
            name="organization_id"
            label="事業 - 事業所"
            placeholder="事業 - 事業所"
            options={organizationMstsData?.map(i => ({ label: `${i.instituition} - ${i.organization_nm}`, value: i.organization_id }))}
            rules={[{ required: true, message: '必須' }]}
          />
          <ProFormText
            width="xl"
            name="counterparty_nm"
            label="相手先"
            placeholder="店名"
            rules={[{ required: true, message: '必須' }]}
          />
          <ProFormSelect
            width="xl"
            name="kind_cd"
            label="種類"
            placeholder="種類"
            options={[
              {
                label: <span>店舗ベース</span>,
                value: '1',
                options: scopeData?.type_lists
                  ?.filter(i => i.id.includes('Store'))
                  .map((i) => ({ label: i.name, value: i.id })),
              },
              {
                label: <span>床面積ベース</span>,
                value: '2',
                options: scopeData?.type_lists
                  ?.filter(i => i.id.includes('Area'))
                  .map((i) => ({ label: i.name, value: i.id })),
              },
            ]}
            onChange={(value: any) => {
              const typeItem = scopeData?.type_lists?.find(i => i.id === value);
              form.setFieldsValue({
                kind_type_nm: typeItem?.name,
                emission_factor: typeItem?.emission_value,
                activity_unit: value.includes('Store') ? '店舗' : 'm2',
                emission_factor_unit: value.includes('Store') ? "t-CO2e/店舗" : "t-CO2e/m2"
              })
            }}
            rules={[{ required: true, message: '必須' }]}
            showSearch
            extra={kindCdKey ? `t-CO2e/${kindCdKey.includes('Store') ? "店舗" : "m2"} に基づいて計算してください` : ''}
          />
          <ProFormText
            width="xl"
            name="emission_factor"
            label="排出係数"
            disabled={!kindCdKey?.includes('Other')}
            placeholder=""
            rules={[{ required: true, message: '必須' }]}
          />
          {kindCdKey?.includes('Store') && <ProFormText
            width="xl"
            name="activity_store"
            label="活動量（店舗）"
            placeholder="店舗"
            rules={[{ required: true, message: '必須' }]}
          />}
          {kindCdKey?.includes('Area') && <><ProFormText
            width="xl"
            name="activity_area"
            label="活動量（面積）"
            placeholder="床面積[m2]"
            rules={[{ required: true, message: '必須' }]}
          />
            <ProFormText
              width="xl"
              name="activity_period"
              label="活動量（期間）"
              placeholder="使用期間[年]"
              rules={[{ required: true, message: '必須' }]}
            /></>}
        </ProForm.Group>
        <ProFormItem name="kind_type_nm" />
        <ProFormItem name="activity_unit" />
        <ProFormItem name="emission_factor_unit" />

      </ModalForm>
    );
  }

const UpdateModal: React.FC<{
  adminInfo: any,
  organizationMstsData: OrganizationMstsAPI.OrganizationMst[],
  scopeData: ScopeDatasAPI.ScopeData,
  industryAttributeInfoDetailsRes: any,
  itemData: IndustryAttributeInfoDetailsAPI.IndustryAttributeInfoDetail
}> =
  ({ adminInfo, organizationMstsData, scopeData, industryAttributeInfoDetailsRes, itemData }) => {
    const [form] = Form.useForm<{
      monthly: string;
      organization_id: string;
      counterparty_nm: string;
      kind_cd: string;
      kind_type_nm: string;
      emission_factor: number;
      activity_store: number;
      activity_area: number;
      activity_period: number;
      activity_unit: string;
      emission_factor_unit: string;
    }>();
    const { _id, fiscal_y, monthly, organization_id, counterparty_nm, kind_cd, emission_factor, activity_store, activity_area, activity_period } = itemData;
    const kindCdKey = Form.useWatch('kind_cd', form);
    return (
      <ModalForm<{
        monthly: string;
        organization_id: string;
        counterparty_nm: string;
        kind_cd: string;
        kind_type_nm: string;
        emission_factor: number;
        activity_store: number;
        activity_area: number;
        activity_period: number;
        activity_unit: string;
        emission_factor_unit: string;
      }>
        title="記録を編集する"
        trigger={
          <a>編集</a>
        }
        style={{ marginBottom: -150 }}
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          cancelText: "キャンセル",
          okText: "完了"
        }}
        submitTimeout={1000}
        onFinish={async (values) => {
          if (kindCdKey.includes('Store')) {
            values.activity_area = 0;
            values.activity_period = 0;
          } else {
            values.activity_store = 0;
          }
          const emissionFactor = new Decimal(values.emission_factor);
          const activityAmount = new Decimal(kindCdKey.includes('Store') ? values.activity_store : values.activity_area * values.activity_period)
          const updateRes = await updateIndustryAttributeInfoDetail({ _id }, {
            create_prg_id: adminInfo?.manager_id,
            ghg_emission: emissionFactor.times(activityAmount).toNumber(),
            ...values
          });
          message.success(updateRes?.message);
          industryAttributeInfoDetailsRes.refresh();
          await waitTime(1000);
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width="xl"
            name="monthly"
            label="時期"
            placeholder="時期"
            options={MONTH_SELECT.map(i => ({ label: `${fiscal_y}-${i}`, value: i }))}
            rules={[{ required: true, message: '必須' }]}
            initialValue={monthly}
          />
          <ProFormSelect
            width="xl"
            name="organization_id"
            label="事業 - 事業所"
            placeholder="事業 - 事業所"
            options={organizationMstsData?.map(i => ({ label: `${i.instituition} - ${i.organization_nm}`, value: i.organization_id }))}
            rules={[{ required: true, message: '必須' }]}
            initialValue={organization_id}

          />
          <ProFormText
            width="xl"
            name="counterparty_nm"
            label="相手先"
            placeholder="店名"
            rules={[{ required: true, message: '必須' }]}
            initialValue={counterparty_nm}
          />
          <ProFormSelect
            width="xl"
            name="kind_cd"
            label="種類"
            placeholder="種類"
            options={[
              {
                label: <span>店舗ベース</span>,
                value: '1',
                options: scopeData?.type_lists
                  ?.filter(i => i.id.includes('Store'))
                  .map((i) => ({ label: i.name, value: i.id })),
              },
              {
                label: <span>床面積ベース</span>,
                value: '2',
                options: scopeData?.type_lists
                  ?.filter(i => i.id.includes('Area'))
                  .map((i) => ({ label: i.name, value: i.id })),
              },
            ]}
            onChange={(value: any) => {
              const typeItem = scopeData?.type_lists?.find(i => i.id === value);
              form.setFieldsValue({
                kind_type_nm: typeItem?.name,
                emission_factor: typeItem?.emission_value,
                activity_unit: value.includes('Store') ? '店舗' : 'm2',
                emission_factor_unit: value.includes('Store') ? "t-CO2e/店舗" : "t-CO2e/m2"
              })
            }}
            rules={[{ required: true, message: '必須' }]}
            initialValue={kind_cd}
            showSearch
            extra={kindCdKey ? `t-CO2e/${kindCdKey.includes('Store') ? "店舗" : "m2"} に基づいて計算してください` : ''}
          />
          <ProFormText
            width="xl"
            name="emission_factor"
            label="排出係数"
            disabled={!kindCdKey?.includes('Other')}
            placeholder=""
            rules={[{ required: true, message: '必須' }]}
            initialValue={emission_factor}
          />
          {kindCdKey?.includes('Store') && <ProFormText
            width="xl"
            name="activity_store"
            label="活動量（店舗）"
            placeholder="店舗"
            rules={[{ required: true, message: '必須' }]}
            initialValue={activity_store}
          />}
          {kindCdKey?.includes('Area') && <><ProFormText
            width="xl"
            name="activity_area"
            label="活動量（面積）"
            placeholder="床面積[m2]"
            rules={[{ required: true, message: '必須' }]}
            initialValue={activity_area}
          />
            <ProFormText
              width="xl"
              name="activity_period"
              label="活動量（期間）"
              placeholder="使用期間[年]"
              rules={[{ required: true, message: '必須' }]}
              initialValue={activity_period}
            /></>}
        </ProForm.Group>
        <ProFormItem name="kind_type_nm" />
        <ProFormItem name="activity_unit"/>
        <ProFormItem name="emission_factor_unit"/>

      </ModalForm>
    );
  }

const DeleteModal: React.FC<{ industryAttributeInfoDetailsRes: any, _id: string }> = ({ industryAttributeInfoDetailsRes, _id }) => {
  return (
    <ModalForm
      title={<Typography.Title level={4}>このアイテムを削除しますか？</Typography.Title>}
      trigger={
        <a>削除</a>
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
        await updateIndustryAttributeInfoDetail({ _id }, { valid_flg: 0 });
        message.success("删除成功");
        industryAttributeInfoDetailsRes?.refresh();
        return true;
      }}
    >
    </ModalForm>
  );
}

const ExcelUpload: React.FC<{ adminInfo: any, industryScopeInfo: any, organizationMstsData: any, scopeData: ScopeDatasAPI.ScopeData, industryAttributeInfoDetailsRes: any }> = ({ adminInfo, industryScopeInfo, organizationMstsData, scopeData, industryAttributeInfoDetailsRes }) => {
  const { industry_info_id, company_id, fiscal_y, scope_cls, category_cls, category_nm } = industryScopeInfo;

  function upload(file: any) {
    return new Promise(resolve => {
      const reader = new FileReader;
      reader.readAsArrayBuffer(file);
      reader.onload = e => {
        resolve(e.target?.result);
      }
    })
  }

  const handleUpload = async (info: any) => {
    if (info.file.status === 'done') {
      const file = info?.file?.originFileObj;
      message.success(`${file.name} file uploaded successfully`);
      const reader = await upload(file);
      const workbook = read(reader, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = utils.sheet_to_json(sheet);
      const errorList = [];
      const payload = [];
      for (let i = 0; i < sheetData.length; i++) {
        const currentError: { [key: string]: string } = { "行番号": String(i + 2) };
        const line = sheetData[i] as any;
        const monthly = Number(line["月"]) || 0;
        if (monthly > 12 || monthly === 0) {
          currentError["月"] = "△";
        }
        const organization_id = organizationMstsData?.find((item: any) => item.organization_nm === line["事業所"] && item.instituition === line["事業"])?.organization_id;
        if (!organization_id) {
          currentError["事業/事業所"] = "△";
        }
        const counterparty_nm = String(line["相手先"]);
        if (!counterparty_nm) currentError["相手先"] = "△";
        const kind_type_nm = line["種類"];
        const currentScopeData = scopeData?.type_lists?.find(item => item.name === kind_type_nm);
        if (!currentScopeData) currentError["種類"] = "△";
        const activity_store = Number(line["活動量（店舗）"]) || 0;
        const activity_area = Number(line["活動量（面積）"]) || 0;
        const activity_period = Number(line["活動量（期間）"]) || 0;
        if (activity_store === 0 && activity_area === 0 && activity_period === 0) {
          currentError["活動量（店舗）"] = "△";
          currentError["活動量（面積）"] = "△";
          currentError["活動量（期間）"] = "△";
        }

        if (Object.keys(currentError).length === 1) {
          const kind_cd = currentScopeData?.id;
          const emission_factor = currentScopeData?.emission_value as number;
          const emissionFactor = new Decimal(emission_factor);
          let activityAmount = new Decimal(0);
          if (activity_store > 0) {
            activityAmount = new Decimal(activity_store);
          } else {
            activityAmount = new Decimal(activity_area * activity_period);
          }
          payload.push({
            create_prg_id: adminInfo?.manager_id,
            industry_info_id,
            company_id,
            fiscal_y,
            scope_cls,
            category_cls,
            category_nm,
            monthly: MONTH_SELECT[monthly - 1],
            organization_id,
            counterparty_nm,
            kind_cd,
            kind_type_nm,
            emission_factor,
            activity_store,
            activity_area,
            activity_period,
            activity_unit: `${activity_store > 0 ? "店舗" : "m2"}`,
            emission_factor_unit: `${activity_store > 0 ? "t-CO2e/店舗" : "t-CO2e/m2"}`,
            ghg_emission: emissionFactor.times(activityAmount).toNumber(),
          })
        } else {
          errorList.push(currentError);
        }
      }
      if (errorList.length > 0) {
        const header = ["行番号", "月", "事業/事業所", "相手先", "種類", "活動量（店舗）", "活動量（面積）", "活動量（期間）"];
        const wscols = header.map(i => ({ width: 25 }));
        const worksheet = utils.json_to_sheet(errorList, { header });
        worksheet["!cols"] = wscols;
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, "エラー詳細.xlsx");
      } else {
        const data = await importIndustryAttributeInfoDetails({ importArray: payload });
        industryAttributeInfoDetailsRes.refresh();
      }
    }
  }

  return (
    <Upload
      name="file"
      onChange={handleUpload}
      showUploadList={false}
    >
      <Button icon={<CloudUploadOutlined />}>Excelアップロード</Button>
    </Upload>
  );
}

const ExcelDownload: React.FC<{ dataSource: any, columns: ProColumns<TableListItem>[] }> = ({ dataSource, columns }) => {
  const headers = columns.slice(0, columns.length - 2).map(i => i.title);
  const wscols = columns.slice(0, columns.length - 2).map(i => ({ width: 25 }));
  const data = dataSource?.reduce((previous: any, current: any) => {
    const obj: { [key: string]: string } = {};
    for (let i = 0; i < columns.length - 2; i++) {
      const title = columns[i].title as string;
      const dataIndex = columns[i].dataIndex as string;
      if (dataIndex === "fiscal_y") {
        obj[title] = `${current[dataIndex]}-${current["monthly"]}`;
      } else {
        obj[title] = current[dataIndex]
      }
    }
    previous.push(obj);
    return previous;
  }, [])
  const handleDownloadClick = () => {
    const worksheet = utils.json_to_sheet(data, { header: (headers as string[]) });
    worksheet["!cols"] = wscols;
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    writeFile(workbook, "scopeData.xlsx");
  }

  return (
    <Button onClick={handleDownloadClick} type="dashed" icon={<CloudDownloadOutlined />}>
      記録ダウンロード
    </Button>
  )
}

const TemplateDownload: React.FC<any> = () => {
  const header = ["月", "事業", "事業所", "相手先", "種類", "活動量（店舗）", "活動量（面積）", "活動量（期間）"];
  const wscols = header.map(i => ({ width: 25 }));
  const handleDownloadClick = () => {
    const worksheet = utils.json_to_sheet([], { header });
    worksheet["!cols"] = wscols;
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    writeFile(workbook, "template.xlsx");
  }

  return (
    <Button onClick={handleDownloadClick} type="dashed" icon={<DownloadOutlined />}>
      テンプレート
    </Button>
  )
}

const FilterModal: React.FC<{
  industryScopeInfo: any,
  organizationMstsData: OrganizationMstsAPI.OrganizationMst[],
  scopeData: ScopeDatasAPI.ScopeData,
  industryAttributeInfoDetailsRes: any,
  setFilterObj: any
}> =
  ({ industryScopeInfo, organizationMstsData, scopeData, industryAttributeInfoDetailsRes, setFilterObj }) => {
    const [form] = Form.useForm<{
      monthly_gte: string;
      monthly_lte: string;
      organization_id: string;
      counterparty_nm: string;
      kind_cd: string;
      kind_type_nm: string;
    }>();
    const { fiscal_y, industry_info_id, scope_cls, category_cls } = industryScopeInfo;
    return (
      <ModalForm<{
        monthly_gte: string;
        monthly_lte: string;
        organization_id: string;
        counterparty_nm: string;
        kind_cd: string;
        kind_type_nm: string;
      }>
        title="検索"
        trigger={
          <Button
            key="button"
            icon={<SearchOutlined />}
            type="dashed"
          >
            検索
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
          industryAttributeInfoDetailsRes.run(values)
          setFilterObj({ industry_info_id, scope_cls, category_cls, valid_flg: 1, fiscal_y, perPage: 99999, ...values });
          return true;
        }}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              <Button
                key="extra-reset"
                onClick={() => {
                  props.reset();
                }}
              >
                重置
              </Button>,
            ];
          },
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            name="monthly_gte"
            label="時期"
            placeholder="開始時期"
            options={MONTH_SELECT.map(i => ({ label: `${fiscal_y}-${i}`, value: i }))}
          />
          <ProFormSelect
            name="monthly_lte"
            label=" "
            placeholder="終了時期"
            options={MONTH_SELECT.map(i => ({ label: `${fiscal_y}-${i}`, value: i }))}
          />
          <ProFormSelect
            width="xl"
            name="organization_id"
            label="事業 - 事業所"
            placeholder="事業 - 事業所"
            options={organizationMstsData?.map(i => ({ label: `${i.instituition} - ${i.organization_nm}`, value: i.organization_id }))}
          />
          <ProFormText
            width="xl"
            name="counterparty_nm"
            label="相手先"
            placeholder="店名"
          />
          <ProFormSelect
            width="xl"
            name="kind_cd"
            label="種類"
            placeholder="種類"
            options={scopeData?.type_lists?.map(i => ({ label: i.name, value: i.id }))}
            onChange={(value: any) => {
              const typeItem = scopeData?.type_lists?.find(i => i.id === value);
              form.setFieldsValue({ kind_type_nm: typeItem?.name })
            }}
            showSearch
          />
        </ProForm.Group>
      </ModalForm>
    );
  }

export default Co2ManagePage;