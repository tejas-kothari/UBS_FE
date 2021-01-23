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
          value: selectedCountry.num,
          color: '#d95f02'
        },
        {
          key: 'Other countries',
          value: state.cntAllFunding - selectedCountry.num,
          color: '#1b9e77'
        }
      ]);
    } else {
      this.setRing([
        {
          key: 'All countries',
          value: state.cntAllFunding,
          color: '#1b9e77'
        }
      ]);
    }
  }
}
