import React, {Component} from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
import * as api from "../../api/api";

class DeliveryRateChartComponent extends Component {

    constructor(){
        super()
        this.state = {
            data2: []
        }
    }

    componentDidMount() {
        api.dashboardsPerformance()
            .then(res => {
                //console.log({dashboardsPerformance: res.data.results})
                this.setState({data2: res.data.results})
                console.log(this.state.data2)

            })
            .catch(error => {
                console.log({dashboardsPerformance: error})
            })
    }

    setChartData(){
        $('#deliveryRateChartLoading').show()
        $('#deliveryRateChart').hide()

        setTimeout(function () {
            var ctx = document.getElementById('deliveryRateChart');

            //there is error : "Cannot read property 'data2' of undefined"
            console.log(this.state.data2);


            /*for(var i = 0; i< this.state.data2.length; i++){

            }*/

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Delivery Rate',
                            data: [50, 40, 98, 100],
                            yAxisID: 'y-axis-1',
                            fill: false,
                            type: 'line',
                            boirderColor: '#239B56',
                            backgroundColor: '#239B56',
                        },
                        {
                            label: 'Unfulfilled',
                            data: [50, 20, 40],
                            backgroundColor: 'black'
                        },
                        {
                            label: 'In Transit',
                            data: [40, 70, 30],
                            backgroundColor: '#76D7C4'
                        },
                        {
                            label: 'Delivered',
                            data: [10, 10, 30],
                            backgroundColor: '#21618C'
                        },
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{ stacked: true }],
                        yAxes: [{ stacked: true },
                            {
                                id: 'y-axis-1',
                                position: 'right',
                                ticks: {
                                    beginAtZero: true,
                                    callback: function(value, index, values) {
                                        return value + '%';
                                    }
                                }
                            }]
                    }
                }
            });

        }, 0)
        $('#deliveryRateChartLoading').hide()
        $('#deliveryRateChart').show()
    }

    render(){
        return (
            <div>
                <div>
                    <canvas id="deliveryRateChart" style={{height: '100ph'}}/>
                    {this.setChartData()}
                </div>
                <div id="deliveryRateChartLoading" className={"text-center"}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>

    );
    }
}

export default DeliveryRateChartComponent
