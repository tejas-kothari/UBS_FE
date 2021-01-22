export default interface CompanyFunding {
    announced_on: string;
    investment_type: string;
    investor_count: number;
    lead_investor_uuids: string;
    org_uuid: string;
    raised_amount_usd: number;
    investors: FundingInvestor[];
}

export interface FundingInvestor {
    investment_count: number;
    logo_url: string;
    name: string;
    uuid: string;
}