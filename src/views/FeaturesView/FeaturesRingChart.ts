import * as d3 from 'd3';
import { FeaturesViewState } from '.';
import RingChart from '../../chart/RingChart';

export default class FeaturesRingChart extends RingChart<FeaturesViewState> {
  updateState(state: FeaturesViewState): void {
    const data = state.data[state.selectedModel];

    const color = d3
      .scaleOrdinal()
      .domain([...Object.keys(data), 'Others'])
      .range(d3.schemeDark2);

    const threshold = 6;
    const others = {
      key: 'Others',
      value: Object.entries(data)
        .filter((val, index) => index < threshold)
        .reduce((prev, [key, value]) => prev + (value as number), 0),
      color: color('Others') as string
    };

    this.setRing([
      ...Object.entries(data)
        .filter((val, index) => index < threshold)
        .map(([key, value]) => {
          return {
            key,
            value: value as number,
            color: color(key) as string
          };
        }),
      others
    ]);
  }
}
