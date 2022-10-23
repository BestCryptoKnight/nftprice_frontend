import React, { useEffect } from 'react'

const SalesChart = (props) => {
    useEffect(() => {
        (async () => {
            const { createChart } = await import('lightweight-charts');
            const chartOptions = {
                layout: {
                    textColor: 'black',
                    background: { type: 'solid', color: 'white' },
                },
            }
            const chart = createChart(
                document.getElementById('chart-panel'),
                chartOptions,
            )
            const areaSeries = chart.addAreaSeries({
                lineColor: '#00AC4F',
                topColor: '#00AC4F',
                bottomColor: 'white',
            })
            chart.applyOptions({
                timeScale: {
                    fixLeftEdge: true,
                    fixRightEdge: true,
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0, // leave some space for the legend
                        bottom: 0,
                    },
                },
                crosshair: {
                    // hide the horizontal crosshair line
                    horzLine: {
                        visible: true,
                        labelVisible: true,
                    },
                    // hide the vertical crosshair label
                    vertLine: {
                        labelVisible: false,
                    },
                },
                // hide the grid lines
                grid: {
                    vertLines: {
                        visible: false,
                    },
                    horzLines: {
                        visible: false,
                    },
                },
            })
            let data;

            data = props.sales.map(({ Date, sales, price, volume }) => ({ time: Date, sales, value: price, volume }))
            areaSeries.setData(data)

            let temp = 0, temp0 = 0;
            for (var i = 0; i < data.length; i++) {
                data[i].volume > temp && (temp = data[i].volume)
                data[i].value > temp0 && (temp0 = data[i].value)
            }

            temp0 += temp0 < 10 ? 1 : temp0 < 20 ? 3 : 1;
            let n = temp0 < 10 ? 6 : temp0 < 20 ? 5 : 3;

            let data2 = [],
                obj
            for (var j = 0; j < data.length; j++) {
                const dateStr = dateToString(data[j].time)
                if (data[j].volume === 0) {
                    obj = {
                        time: dateStr,
                        value: 0,
                    }
                } else {
                    obj = {
                        time: dateStr,
                        value: (data[j].volume / temp) * temp0 / n,
                    }
                }
                data2.push(obj)
            }

            const histogramSeries = chart.addHistogramSeries({
                autoscaleInfoProvider: () => ({
                    priceRange: {
                        minValue: 0,
                        maxValue: temp0,
                    },
                }),
                color: '#00AC4F',
                priceScaleId: 'right',
                priceLineVisible: false,
            })
            // histogramSeries.applyOptions({
            //     base: 0,
            //     lastValueVisible: false
            // })


            histogramSeries.setData(data2)

            const container = document.getElementById('chart-panel')

            function dateToString(date) {
                return `${date.year}-${date.month}-${date.day}`
            }

            const toolTipWidth = 80
            const toolTipHeight = 80
            const toolTipMargin = 15

            // Create and style the tooltip html element
            const toolTip = document.createElement('div')
            toolTip.style = `width: 120px; height: 88px; position: absolute; display: none; padding: 10px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 999; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 5px;font-family: 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
            toolTip.style.background = 'white'
            toolTip.style.color = '#00AC4F'
            toolTip.style.borderColor = '#00AC4F'
            container.appendChild(toolTip)

            // update tooltip
            chart.subscribeCrosshairMove((param) => {
                if (
                    param.point === undefined ||
                    !param.time ||
                    param.point.x < 0 ||
                    param.point.x > container.clientWidth ||
                    param.point.y < 0 ||
                    param.point.y > container.clientHeight
                ) {
                    toolTip.style.display = 'none'
                } else {
                    const dateStr = dateToString(param.time)
                    toolTip.style.display = 'block'
                    const price = param.seriesPrices.get(areaSeries)
                    let volume, sales;
                    for (var i = 0; i < data.length; i++) {
                        if (dateToString(data[i].time) === dateStr) {
                            sales = data[i].sales;
                            volume = data[i].volume;
                        }
                    }
                    toolTip.innerHTML = `
                    <div style="font-size: 12px; color: ${'#00AC4F'}">
                        price: <i class="fab fa-ethereum"></i>${Math.round(100 * price) / 100}
                    </div>
                    <div style="font-size: 12px; color: ${'#00AC4F'}">
                        Volume: ${Math.round(100 * volume) / 100}
                    </div>
                    <div style="font-size: 12px; color: ${'#00AC4F'}">
                        Sales: ${Math.round(100 * sales) / 100}
                    </div>
                    <div style="font-size: 12px; color: ${'#00AC4F'}">
                        Date: ${dateStr}
                    </div>`

                    const y = param.point.y
                    let left = param.point.x + toolTipMargin
                    if (left > container.clientWidth - toolTipWidth) {
                        left = param.point.x - toolTipMargin - toolTipWidth
                    }

                    let top = y + toolTipMargin
                    if (top > container.clientHeight - toolTipHeight) {
                        top = y - toolTipHeight - toolTipMargin
                    }

                    toolTip.style.left = param.point.x + 'px'
                    toolTip.style.top = param.point.y + 'px'
                }
            })


            chart.timeScale().fitContent()

            return () => chart.remove()

        })()
    }, [])

    return (
        <div className="">
            <div
                id="chart-panel"
                className='chart-panel'
            ></div>
        </div>
    )

}

export default SalesChart;
