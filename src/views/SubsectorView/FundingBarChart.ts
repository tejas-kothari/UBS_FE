import { SubsectorViewState } from '.';
import BarChart from '../../chart/BarChart';

export default class FundingBarChart extends BarChart<SubsectorViewState> {
  updateState(state: SubsectorViewState): void {
    const selectedCountry = state.countriesFunding.find(
      funding => funding.country === state.country
    );

    if (selectedCountry) {
      this.setBars([
        {
          key: state.country,
          value: selectedCountry?.mean_funding
        },
        {
          key: 'All countries',
          value: state.meanAllFunding
        }
      ]);
    } else {
      this.setBars([
        {
          key: 'All countries',
          value: state.meanAllFunding
        }
      ]);
    }
  }
}
