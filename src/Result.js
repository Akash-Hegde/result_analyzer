import React, { Component } from 'react';
import './App.css';
import CanvasJSReact from './canvasjs.react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const SecondPage = props => {
    const location = useLocation();
	console.log(location.state.detail); 

}; 


class Result extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
		render() {
			
			let result1 = this.props.location.state['detail'];
			let result = JSON.parse(result1);
			//console.log(result)
			
			var subjects = result[0];
			var sub_code =[]
			
			let arr = Object.keys(subjects);
			
			arr.forEach(function(item) {
				sub_code[item]=0	
			});
			
			for (var i=2;i<result.length;i++){
				
				for (var j=0;j<arr.length;j++){
					let x = result[i];
					let y = arr[j]
					
					if(x[y] == 'NE' || x[y] == 'F') {
						sub_code[y]= sub_code[y] + 1;
					}
				}
			}



			var gradesArr=['S','A','B','C','D','E','F','NE']
			var gradesDict = {
				'S' : 0,
				'A' : 0,
				'B' : 0,
				'C' : 0,
				'D' : 0,
				'E' : 0,
				'F' : 0,
				'NE' : 0
			}

			for (var i=3; i<result.length; i++) {
				for (var j=0; j<arr.length; j++) {
					let x = result[i];
					let y = arr[j]

					gradesDict[x[y]] = gradesDict[x[y]] + 1
				}
			}
			console.log(gradesDict)
			var graphData = []
			arr.forEach(function(item) {
				let subject = subjects[item]
				var dict = {'label':subject,'y':sub_code[item]}
				graphData.push(dict)		
			});

			var eachSubGrades = {}
			
			arr.forEach(function(item) {
				
				eachSubGrades[item] = {
					'S' : 0,
					'A' : 0,
					'B' : 0,
					'C' : 0,
					'D' : 0,
					'E' : 0,
					'NE' : 0,
					'F' : 0
				}
				
			});


			for (var i=3; i<result.length; i++) {
				for (var j=0; j<arr.length; j++) {
					let y = arr[j]
					let x = result[i]
					
					eachSubGrades[y][x[y]] = eachSubGrades[y][x[y]] + 1
				}
			}
			console.log(subjects)
			var graphData1 = []
			gradesArr.forEach(function(item){
				// let subject = subjects[item]
				var graphDataForSub = []
				for(var i=0; i<arr.length; i++){
					let subject = subjects[arr[i]]
					var dictForSub = {label :subject,y:eachSubGrades[arr[i]][item]}
					graphDataForSub.push(dictForSub)
				}

				graphDataForSub.push(dictForSub)

				var dict1 = {
					type: "stackedColumn100",
					name: item,
					showInLegend: true,
					//color: "#D4AF37",
					dataPoints : graphDataForSub
				}

				graphData1.push(dict1)
			})

			console.log(eachSubGrades)

			var graphData2 = []

			gradesArr.forEach(function(item){
				var dict2 = { label: item , y: gradesDict[item] }
				graphData2.push(dict2)
			})

			console.log(graphData2)
			console.log(graphData)

			const options = {
			title: {
				text: "NO of Fails"
			},
			animationEnabled: true,
			axisX: {
				labelAngle: 30,
				labelWrap: true,
				labelFontSize: 10,
				labelAutoFit: true
			},
			width:600,
			height:400,
			data: [
			{
				
				type: "column",
				dataPoints: graphData
			}
			]
		}
		const options1 = {
			animationEnabled: true,
			title:{
				text: "Grades for each subject"
			},
			width:600,
			height:400,
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
					fontSize: 16,
					itemclick: this.toggleDataSeries
			},
			toolTip: {
				shared: true
			},
			data: graphData1
		}
		
		const options2 = {
			animationEnabled: true,
			title:{
				text: "Uniformly distributed graph "
			},
			// axisX: {
			// 	valueFormatString: "MMM"
			// },
			// axisY: {
			// 	title: "NO of grades",
			// 	// prefix: "$",
			// 	includeZero: false
			// },
			width:600,
			height:400,
			data: [{
				
				type: "spline",
				dataPoints:graphData2
			}]
		}

		return (
		<div>
			
			<div className='myele'>
			<CanvasJSChart options = {options} />
			</div>
			
			<div className='myele'>
			<CanvasJSChart options = {options1} />
			</div>
			
			<div className='myele'>
			
			<CanvasJSChart options = {options2} />
			
		</div>
		</div>
		);
	}
}

export default Result;