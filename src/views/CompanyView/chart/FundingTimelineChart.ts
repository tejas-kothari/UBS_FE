import TimelineChart from '../../../chart/TimelineChart';
import { CompanyFundingTimelineState } from '../CompanyFundingTimeline';

export default class FundingTimelineChart extends TimelineChart<
  CompanyFundingTimelineState
> {
  updateState(state: CompanyFundingTimelineState): void {
    this.addItems(
      state.companyFunding.map(funding => {
        return {
          name: funding.investment_type
            .split('_')
            .map(str => str.charAt(0).toUpperCase() + str.slice(1))
            .join(' '),
          color: '#FF0000',
          date: new Date(funding.announced_on)
        };
      })
    );
  }
}
