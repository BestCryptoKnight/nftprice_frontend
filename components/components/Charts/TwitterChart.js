import React from "react";
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

class TwitterChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: this.props.name,
                data: this.props.data
            }],
            options: {
                colors: this.props.color,
                chart: {
                    type: 'area',
                    stacked: false,
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: this.props.title,
                    align: 'left'
                },
                fill: {
                    type: 'gradient',
                    colors: this.props.color,
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return val;
                        },
                    },
                    title: {
                        text: this.props.ylabel
                    },
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val) {
                            return val;
                            // return val.toLocaleString('en-US')
                        }
                    }
                }
            },


        };
    }



    render() {
        return (


            <div id="chart" className="apex-chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
            </div>


        );
    }
}

export default TwitterChart;
