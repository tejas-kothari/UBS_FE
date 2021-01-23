import { SubsectorViewState } from ".";
import BarChart from "../../chart/BarChart";

export default class FundingBarChart extends BarChart<SubsectorViewState> {
    updateState(state: SubsectorViewState): void {
        this.addBars([
            {
                key: 'test',
                value: 123
            },
            {
                key: 'test2',
                value: 123
            }
        ]);
    }
}