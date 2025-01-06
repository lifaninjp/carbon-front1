declare namespace GoalInfosAPI {
  interface GoalInfo {
    _id?: string;
    fiscal_y?: string;
    scope1_target_value?: number;
    scope2_target_value?: number;
    scope3_target_value?: number;
    annual_sales_target_value?: number;
  }

  interface GetOneInput {
    company_id?: string;
    fiscal_y?: string;
  }

  interface CreateGoalInfoInput {
    company_id?: string;
    create_prg_id?: string;
    fiscal_y?: string;
    scope1_target_value?: number;
    scope2_target_value?: number;
    scope3_target_value?: number;
    annual_sales_target_value?: number;
  }

  interface UpdateGoalInfoInput {
    scope1_target_value?: number;
    scope2_target_value?: number;
    scope3_target_value?: number;
    annual_sales_target_value?: number;
  }
}