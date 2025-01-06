declare namespace IndustryAttributeInfosAPI {
  interface IndustryAttributeInfo {
    _id: string;
    company_id: string;
    industry_attribute_id: string;
    specify_industry_nm: string;
    fiscal_y: string;
    target_id: string;
    company_nm: string;
  }

  interface IndustryAttributeInfos {
    totalCount: number;
    industryAttributeInfos: Array<Record<IndustryAttributeInfo>>;
  }

  interface FilterAttributeInfoInput {
    valid_flg: number;
    company_id?: string;
    fiscal_y: string;
  }

  interface FilterAttributeInfosInput {
    valid_flg?: number;
    company_id?: string;
    page?: number;
    perPage?: number;
  }

  interface CreateIndustryAttributeInfoInput {
    company_id: string;
    industry_attribute_id: string;
    specify_industry_nm: string;
    fiscal_y: string;
    create_prg_id?: string;
  }

  interface UpdateIndustryAttributeInfoInput {
    specify_industry_nm?: string;
    valid_flg?: number;
  }

}