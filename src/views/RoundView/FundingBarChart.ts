import { SubsectorViewState } from '.';
import BarChart from '../../chart/BarChart';

export default class FundingBarChart extends BarChart<SubsectorViewState> {
  updateState(state: SubsectorViewState): void {
    const selectedCountry = state.countriesFunding.find(
      funding => funding.round === state.country
    );

    if (selectedCountry) {
      this.setBars([
        {
          key: state.country,
          value: selectedCountry?.mean_funding,
          color: '#d95f02'
        },
        {
          key: 'All countries',
          value: state.meanAllFunding,
          color: '#1b9e77'
        }
      ]);
    } else {
      this.setBars([
        {
          key: 'All countries',
          value: state.meanAllFunding,
          color: '#1b9e77'
        }
      ]);
    }
  }
}
