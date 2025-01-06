declare namespace IndustryAttributeInfoDetailsAPI {
  interface IndustryAttributeInfoDetail {
    _id: string;
    company_id: string;
    organization_id: string;
    industry_info_id: string;
    counterparty_nm?: string;
    item_nm?: string;
    logistics_company_nm?: string;
    kind_cd: string;
    kind_type_nm: string;
    activity_unit: string;
    activity_amount?: number;
    activity_energy?: number;
    energy_cls?: number;
    activity_weight?: number;
    activity_distance?: number;
    activity_ratio?: number;
    activity_people?: number;
    activity_period?: number;
    activity_area?: number;
    activity_store?: number;
    emission_factor: number;
    emission_factor_unit: string;
    ghg_emission: number;
    scope_status_cls: number;
    scope_cls: string;
    category_cls: string;
    category_nm: string;
    fiscal_y: string;
    monthly: string;
    target_id: string;
    updatedAt: Date;
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
    company_id: string;
    organization_id: string;
    industry_info_id: string;
    scope_cls: string;
    category_cls: string;
    category_nm: string;
    fiscal_y: string;
    monthly: string;
    counterparty_nm?: string;
    item_nm?: string;
    logistics_company_nm?: string;
    kind_cd?: string;
    kind_type_nm?: string;
    activity_unit?: string;
    activity_amount?: number;
    activity_energy?: number;
    energy_cls?: number;
    activity_weight?: number;
    activity_distance?: number;
    activity_ratio?: number;
    activity_people?: number;
    activity_period?: number;
    activity_area?: number;
    activity_store?: number;
    emission_factor?: number;
    emission_factor_unit?: string;
    ghg_emission?: number;
    create_prg_id?: string;
  }

  interface UpdateAttributeInfoDetailsInput {
    organization_id?: string;
    monthly?: string;
    counterparty_nm?: string;
    item_nm?: string;
    logistics_company_nm?: string;
    kind_cd?: string;
    kind_type_nm?: string;
    activity_unit?: string;
    activity_amount?: number;
    activity_energy?: number;
    energy_cls?: number;
    activity_weight?: number;
    activity_distance?: number;
    activity_ratio?: number;
    activity_people?: number;
    activity_period?: number;
    activity_area?: number;
    activity_store?: number;
    emission_factor?: number;
    emission_factor_unit?: string;
    ghg_emission?: number;
    create_prg_id?: string;
    valid_flg?: number;
  }

  interface ImportIndustryAttributeInfoDetailsInput {
    importArray: Array<CreateAttributeInfoDetailsInput>;
  }

  interface filterGghByScope {
    company_id?: string;
    fiscal_y?: string;
    top_n?: number;
  }

  interface GhgByScope {
    scope_cls?: string;
    unit?: string;
    ghg?: number;
  }

  interface GhgByScope3 {
    category_cls?: string;
    content?: string;
    ghg?: number;
  }

  interface GhgByCat {
    scope_cls?: string;
    category_cls?: string;
    ghg?: number;
    ghg_percent?: number;
  }

  interface GhgByMonth {
    month?: string;
    "排放量"?: number;
    "占比"?: number;
  }

  interface GhgByOgn {
    ogn?: string;
    inst?: string;
    ghg_percent?: number;
  }

  interface GhgByKindType {
    kind_type?: string;
    "排放量"?: number;
    "占比"?: number;
  }

  interface GhgByParty {
    counterparty_nm?: string;
    "排放量"?: number;
    "占比"?: number;
  }
}