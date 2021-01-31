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
          value: selectedCountry?.mean_funding,     //Prepare states for selecting country
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
