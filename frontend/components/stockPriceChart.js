import React, { Component } from 'react'
import { Chart } from 'react-charts'

export default function StockPriceChart(props) {
  let chartData = [];

  if (typeof props.historicalPrices === 'object') {
    if (props.historicalPrices.length) {
      props.historicalPrices.map(historicalPrice => {
        let tempObj = {
          label: `${historicalPrice.name} (${historicalPrice.code})`,
          data: []
        }

        let i = 1;

        [...historicalPrice.instrumentHistory].reverse().map(instrument => {
          tempObj.data.push({
            x: i,
            y: instrument.price
          });

          i++;
        });
        chartData.push(tempObj);
      })
    }
  }

  const data = React.useMemo(
    () => chartData,
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const tooltip = React.useMemo(
    () => ({
      align: 'top',
      anchor: 'auto'
    }),
    []
  )

  return (
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} tooltip={tooltip} />
    </div>
  )
}
