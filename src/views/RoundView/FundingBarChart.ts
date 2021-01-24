import { RoundViewState } from '.';
import BarChart from '../../chart/BarChart';

export default class FundingBarChart extends BarChart<RoundViewState> {
  updateState(state: RoundViewState): void {
    const selectedround = state.roundFunding.find(
      funding => funding.round === state.round
    );

    if (selectedround) {
      this.setBars([
        {
          key: state.round,
          value: selectedround?.mean_funding,
          color: '#d95f02'
        },
        {
          key: 'All rounds',
          value: state.meanAllFunding,
          color: '#1b9e77'
        }
      ]);
    } else {
      this.setBars([
        {
          key: 'All Rounds',
          value: state.meanAllFunding,
          color: '#1b9e77'
        }
      ]);
    }
  }
}
