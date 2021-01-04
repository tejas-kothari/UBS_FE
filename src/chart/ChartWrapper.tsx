import React, { useRef, useState, useEffect } from 'react';
import D3Chart from './TestChart';

const ChartWrapper = function<T extends D3Chart>(type: { new(el: any): T ;}) {
	const chartArea = useRef(null)
	const [chart, setChart] = useState<T|null>(null)

	useEffect(() => {
		if (!chart) {
			setChart(new type(chartArea.current))
		}
		else {
			chart.update()
		}
	}, [chart, type])

	return (
		<div className="chart-area" ref={chartArea}></div>
	)
}

export default ChartWrapper