import React from 'react';
import echarts from 'echarts';

export default class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state={
            height:this.props.height,
            options:this.props.options
        };
        this.chart=null
    }
    componentDidMount = () =>{
        this.displayData();
        // 窗口大小改变时改变图表大小
         window.addEventListener("resize", this._chartResize);
    }
    componentDidUpdate = () =>{
        this.displayData();
    }
    componentWillUnmount = () =>{
        window.removeEventListener("resize", this._chartResize);
    }
    displayData(){
        this.chart = echarts.init(this.refs.chart);
        this.chart.setOption(this.state.options);
    }
    /**
     * 改变图表大小函数
     */
    _chartResize = () =>{
        if(this.chart){
            this.chart.resize();
        }
    }
    render = () => {
        return (
              <div ref="chart" style={{width:"100%",height:this.state.height}}></div>
        )
    }
}