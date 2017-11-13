import {connect} from 'dva';
import { Card, Col, Row } from 'antd';
import constants from '../utils/constants';
import Chart from '../components/base/Chart';

function HomePage({dispatch}){

    let o1 = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} <br/>比例 : {d}%"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['总规2015','总规2025','控规2015','控规2025','文物保护','道路红线']
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'内网访问',
            type:'pie',
            radius : [10,80],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'总规2015'},
                {value:5, name:'总规2025'},
                {value:15, name:'控规2015'},
                {value:25, name:'控规2025'},
                {value:20, name:'文物保护'},
                {value:35, name:'道路红线'}
            ]
        },
        {
            name:'外网访问',
            type:'pie',
            radius : [10, 80],
            center : ['75%', '50%'],
            roseType : 'area',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'总规2015'},
                {value:5, name:'总规2025'},
                {value:15, name:'控规2015'},
                {value:25, name:'控规2025'},
                {value:20, name:'文物保护'},
                {value:35, name:'道路红线'}
            ]
        }
    ]
};

let o2 = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['最高气温','最低气温']
    },
    // toolbox: {
    //     show: true,
    //     feature: {
    //         dataZoom: {
    //             yAxisIndex: 'none'
    //         },
    //         magicType: {type: ['line', 'bar']},
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name:'最高气温',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'最低气温',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
            markPoint: {
                data: [
                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'},
                    [{
                        symbol: 'none',
                        x: '90%',
                        yAxis: 'max'
                    }, {
                        symbol: 'circle',
                        label: {
                            normal: {
                                position: 'start',
                                formatter: '最大值'
                            }
                        },
                        type: 'max',
                        name: '最高点'
                    }]
                ]
            }
        }
    ]
};

    let options = {
        tooltip: {},
        xAxis: {
            data: ["管理员","陈艳平","张三","李四","王五","马六"]
        },
        yAxis: {},
        series: [{
            name: '登录次数',
            type: 'bar',
            data: [15, 20, 36, 10, 10, 20]
        }]
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span="12" >
                    <Card title="登录统计" extra={<a href="#">详情</a>}>
                        <Chart height="300px" options = {options} ></Chart>
                    </Card>
                </Col>
                <Col span="12">
                    <Card title="专题访问统计" extra={<a href="#">详情</a>}>
                        <Chart height="300px" options = {o1} ></Chart>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{marginTop:"10px"}}>
                <Col span="8" >
                    <Card title="登录统计">
                        <Chart height="300px" options = {o1} ></Chart>
                    </Card>
                </Col>
                <Col span="8">
                    <Card title="专题统计">
                        <Chart height="300px" options = {o2} ></Chart>
                    </Card>
                </Col>
                <Col span="8">
                    <Card title="其它统计">
                        <Chart height="300px" options = {options} ></Chart>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default connect()(HomePage);