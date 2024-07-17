declare namespace IndustryAttributeInfoDetailsAPI {
  interface IndustryAttributeInfoDetail {
    _id: string,
    company_id: string,
    organization_id: string,
    industry_info_id: string,
    counterparty_nm: string,
    item_nm: string,
    kind_cd: string,
    kind_type_nm: string,
    activity_unit: string,
    activity_amount: number,
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
    updatedAt: Date
    organization_nm: string;
    instituition: string;
  }

  interface IndustryAttributeInfoDetails {
    totalCount: number;
    industryAttributeInfoDetails: Array<Record<IndustryAttributeInfoDetail>>;
  }

  interface FilterAttributeInfoDetailsInput {
    valid_flg: number;
    industry_info_id: string;
    scope_cls: string;
    category_cls: string;
    page?: number;
    perPage?: number;
    fiscal_y?: string;
    monthly_gte?: string,
    monthly_lte?: string,
  }

  interface CreateAttributeInfoDetailsInput {
    company_id: string,
    organization_id: string,
    industry_info_id: string,
    scope_cls: string,
    category_cls: string,
    category_nm: string,
    fiscal_y: string,
    monthly: string,
    counterparty_nm?: string,
    item_nm?: string,
    kind_cd?: string,
    kind_type_nm?: string,
    activity_unit?: string,
    activity_amount?: number,
    emission_factor?: number,
    emission_factor_unit?: string,
    ghg_emission?: number,
    create_prg_id?: string;
  }

  interface UpdateAttributeInfoDetailsInput {
    organization_id?: string,
    monthly?: string,
    counterparty_nm?: string,
    item_nm?: string,
    kind_cd?: string,
    kind_type_nm?: string,
    activity_unit?: string,
    activity_amount?: number,
    emission_factor?: number,
    emission_factor_unit?: string,
    ghg_emission?: number,
    create_prg_id?: string;
    valid_flg?: number;
  }

  interface ImportIndustryAttributeInfoDetailsInput {
    importArray: Array<CreateAttributeInfoDetailsInput>;
  }

}