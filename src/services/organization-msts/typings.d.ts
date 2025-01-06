declare namespace OrganizationMstsAPI {
  interface OrganizationMst {
    _id?: string;
    organization_id?: string;
    organization_nm?: string;
    instituition?: string;
  }

  interface OrganizationMsts {
    totalCount: number;
    organizationMsts: Array<Record<any>>;
  }

  interface FilterOrganizationMstsInput {
    company_id?: string;
    organization_nm?: string;
    instituition?: string;
    page?: number;
    perPage?: number;
    valid_flg?: number;
  }

  interface CreateOrganizationMstInput {
    company_id?: string;
    organization_nm?: string;
    instituition?: string;
    create_prg_id?: string;
  }

  interface UpdateOrganizationMstInput {
    organization_nm?: string;
    instituition?: string;
    create_prg_id?: string;
  }
}