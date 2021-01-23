import { SubsectorViewState } from '.';
import RingChart from '../../chart/RingChart';

export default class StartupRingChart extends RingChart<SubsectorViewState> {
  updateState(state: SubsectorViewState): void {
    const selectedCountry = state.countriesFunding.find(
      funding => funding.country === state.country
    );

    if (selectedCountry) {
      this.setRing([
        {
          key: state.country,
          value: selectedCountry?.num
        },
        {
          key: 'Other countries',
          value: state.cntAllFunding - selectedCountry?.num
        }
      ]);
    } else {
      this.setRing([
        {
          key: 'All countries',
          value: state.cntAllFunding
        }
      ]);
    }
  }
}
