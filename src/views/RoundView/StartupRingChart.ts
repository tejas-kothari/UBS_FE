import * as d3 from 'd3';
import { RoundViewState } from '.';
import RingChart from '../../chart/RingChart';

export default class StartupRingChart extends RingChart<RoundViewState> {
  updateState(state: RoundViewState): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedround = state.roundFunding.find(
      funding => funding.round === state.round
    );

    if (state.roundFunding.length === 0) return;

    var color = d3
      .scaleOrdinal()
      .domain([...state.roundFunding.map(funding => funding.round), 'Others'])
      .range(d3.schemeDark2);

    const threshold = 1000;
    const roundFunding = state.roundFunding;
    const others = {
      key: 'Others',
      value: roundFunding
        .filter(round => round.num < threshold)
        .reduce((prev, cur) => {
          prev += cur.num;
          return prev;
        }, 0),
      color: color('Others') as string
    };

    this.setRing([
      ...roundFunding
        .filter(round => round.num >= threshold)
        .map(funding => {
          return {
            key: funding.round,
            value: funding.num,
            color: color(funding.round) as string
          };
        }),
      others
    ]);
  }
}
