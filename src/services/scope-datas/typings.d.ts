declare namespace ScopeDatasAPI {
  interface ScopeData {
    _id: string;
    scope_id: string;
    sub_scope_id: string;
    sub_scope_name: string;
    category: string;
    title: string;
    department: string;
    active_data: string;
    year: string;
    buy_from_lists: FromList[];
    type_lists: FromList[];
    item_list: FromList[];
  }

  interface ScopeDatas {
    totalCount: number;
    scopeDatas: Array<Record<ScopeData>>;
  }

  interface FromList {
    id: string;
    name: string;
    unit: string;
    emission_value: number;
    scope_and_category: string;
  }

  interface FilterScopeDatasInput {
    category?: string;
    scope_id?: string;
    sub_scope_id?: string;
    year?: string;
    page?: number;
    perPage?: number;
    is_show_all?: number;
  }
}