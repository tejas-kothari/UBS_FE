import * as d3 from 'd3';
import { FeaturesViewState } from '.';
import RingChart from '../../chart/RingChart';

export default class FeaturesRingChart extends RingChart<FeaturesViewState> {
  updateState(state: FeaturesViewState): void {
    const data = Object.entries<number>(state.data[state.selectedModel]).sort(
      ([key1, value1], [key2, value2]) => value2 - value1
    );

    //Set maximum for sector showed 
    const threshold = 6;
    const color = d3
      .scaleOrdinal()
      .domain([
        ...Object.keys(data.filter((val, index) => index < threshold)),
        'Others'
      ])
      .range(d3.schemeDark2);
    
    //Put all small values into others
    const others = {
      key: 'Others',
      value: data
        .filter((val, index) => index >= threshold)
        .reduce((prev, [key, value]) => prev + (value as number), 0),
      color: color('Others') as string,
      hideLabel: true
    };

    
    this.setRing([
      ...data
        .filter((val, index) => index < threshold)
        .map(([key, value]) => {
          return {
            key,
            value: value as number,
            color: color(key) as string,
            hideLabel: true
          };
        }),
      others
    ]);
  }
}
