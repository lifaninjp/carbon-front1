declare namespace IndustryAttributeMstsAPI {
  interface IndustryAttributeMst {
    _id: string;
    industry_cls_nm: string;
    industry_attribute_id: string;
  }

  interface IndustryAttributeMsts {
    totalCount: number;
    industryAttributeMsts: Array<Record<IndustryAttributeMst>>;
  }

  interface FilterAttributeMstsInput {
    valid_flg?: number;
    page?: number;
    perPage?: number;
  }

  interface CreateIndustryAttributeMstInput {
    industry_cls_nm?: string;
    create_prg_id?: string;
  }

  interface UpdateIndustryAttributeMstInput {
    industry_cls_nm?: string;
    valid_flg?: number;
  }

}