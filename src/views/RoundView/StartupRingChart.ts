import * as d3 from 'd3';
import { RoundViewState } from '.';
import RingChart from '../../chart/RingChart';

export default class StartupRingChart extends RingChart<RoundViewState> {
  updateState(state: RoundViewState): void {
    const selectedround = state.roundFunding.find(
      funding => funding.round === state.round
    );

    var color = d3
    .scaleOrdinal()
    .domain(state.roundFunding.map(funding=>funding.round))
    .range(d3.schemeDark2);

    this.setRing(state.roundFunding.map(funding => {
      return {
        key: funding.round,
        value: funding.mean_funding,
        color: color(funding.round) as string
         
      }
    }))



  }
}

