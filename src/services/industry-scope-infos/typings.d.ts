declare namespace IndustryScopeInfosAPI {
  interface IndustryScopeInfo {
    _id: string;
    industry_info_id: string;
    scope_cls: string;
    category_cls: string;
    category_nm: string;
    category: string;
    title: string;
    department: string;
    active_data: string;
  }

  interface IndustryScopeInfos {
    totalCount: number;
    industryScopeInfos: Array<Record<IndustryScopeInfo>>;
  }

  interface FilterScopeInfosInput {
    valid_flg: number;
    industry_info_id: string;
    page?: number;
    perPage?: number;
  }

  interface CreateScopeInfosInput {
    industry_info_id?: string;
    scope_cls?: string;
    category_cls?: string;
    year?: string;
    create_prg_id?: string;
  }

  interface UpdateScopeInfosInput {
    valid_flg?: number;
  }

}