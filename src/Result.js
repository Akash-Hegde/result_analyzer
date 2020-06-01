import React, { Component } from 'react';
import './App.css';
import CanvasJSReact from './canvasjs.react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";
import SideBar from "./sidebar";

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
		this.output = this.output.bind(this)
		this.state = {
            count: 'sem1'
        }
	}
	
	output(evt) {
		// console.log("parent called"+evt);
		this.setState({count: evt})
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
			
			const returnSemData = () => {
				var sem = this.state.count

				switch(sem){
					case "sem1-c" : var semData_1 = result['sem1']
									var semData_2 = result['sem1-1']

									var subjects_1 = semData_1[0]
									var subnames_1 = Object.keys(subjects_1)

									var sub_code1 = []
									var sub_code2 = []

									subnames_1.forEach(function(item) {
										sub_code1[item] = 0;
										sub_code2[item] = 0;
									})

									for(var i=3;i<semData_1.length;i++){
										for(var j=0;j<subnames_1.length;j++){
											
											let x = semData_1[i];
											let y = subnames_1[j]

											let a = semData_2[i];
											let b = subnames_1[j]

							
											if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
												sub_code1[y]= sub_code1[y] + 1;
											}

											if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
												sub_code2[b]= sub_code2[b] + 1;
											}
										}
									}

									var graphData1 = []

										var graph1 = []
											subnames_1.forEach(function(item) {
												let subject = subjects_1[item]
												var dictForSub1 = {label :subject,y:sub_code1[item]}
												graph1.push(dictForSub1)
											})
																					

										var dict1 = {
											type: "column",
											name: 'Current Batch',
											showInLegend: true,
											dataPoints : graph1
										}

										graphData1.push(dict1)

										var graph2 = []
										subnames_1.forEach(function(item) {
											let subject = subjects_1[item]
											var dictForSub1 = {label :subject,y:sub_code2[item]}
											graph2.push(dictForSub1)
										})
										

										var dict2 = {
											type: "column",
											name: "Previous Batch",
											showInLegend: true,
											dataPoints : graph2
										}

										graphData1.push(dict2)

										var options1 = {
											animationEnabled: true,	
											title:{
												text: "Comparison of Backlogs",
												padding :{
													bottom : 10
												},
											},
											width:600,
											height:450,
											axisY : {
												title: "Number of Backlogs",
											},
											axisX : {
												title : 'Subjects',
												labelWrap : true,
												labelFontSize : 10
											},
											toolTip: {
												shared: true
											},
											data: graphData1
									}


									var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

									var gradesDict1 = {
										'S+' : 0,
										'S' : 0,
										'A' : 0,
										'B' : 0,
										'C' : 0,
										'D' : 0,
										'E' : 0,
										'F' : 0,
										'NE' : 0,
										'X' : 0,
										'W' : 0
									}

									var gradesDict2 = {
										'S+' : 0,
										'S' : 0,
										'A' : 0,
										'B' : 0,
										'C' : 0,
										'D' : 0,
										'E' : 0,
										'F' : 0,
										'NE' : 0,
										'X' : 0,
										'W' : 0
									}

									for(var i=3;i<semData_1.length;i++){
										for(var j=0;j<subnames_1.length;j++){
											
											let x = semData_1[i];
											let y = subnames_1[j]

											let a = semData_2[i];
											let b = subnames_1[j]
							
											gradesDict1[x[y]] = gradesDict1[x[y]] + 1

											gradesDict2[a[b]] = gradesDict2[a[b]] + 1
				
										}
				
									}

									var graphData2 = []

										var graph1_2 = []
											gradesArr.forEach(function(item) {
												var dictForSub1 = {label :item,y:gradesDict1[item]}
												graph1_2.push(dictForSub1)
											})
																					

										var dict1 = {
											type: "spline",
											name: 'Current Batch',
											showInLegend: true,
											dataPoints : graph1_2
										}

										graphData2.push(dict1)

										var graph2_2 = []
										gradesArr.forEach(function(item) {
											var dictForSub1 = {label :item,y:gradesDict2[item]}
											graph2_2.push(dictForSub1)
										})
										

										var dict2 = {
											type: "spline",
											name: "Previous Batch",
											showInLegend: true,
											dataPoints : graph2_2
										}

										graphData2.push(dict2)

										var options2 = {
											animationEnabled: true,	
											title:{
												text: "Comparison of Grades",
												padding :{
													bottom : 10
												},
											},
											width:600,
											height:450,
											axisY : {
												title: "Number of Grades",
											},
											axisX : {
												title : 'Grades',
												labelWrap : true,
												labelFontSize : 10
											},
											toolTip: {
												shared: true
											},
											data: graphData2
									}




									var hml1 = {}
									var submarks1 = []

									subnames_1.forEach(function(item) {
										var item1 = item+'M'
										submarks1.push(item1)
									})


									submarks1.forEach(function(item) {
										
										hml1[item] = {
											'Mean Current' : 0,
											'Mean Previous' : 0
										}	
									});

									for(var i=3;i<semData_1.length;i++){
										for(var j=0;j<subnames_1.length;j++){
											
											let x = semData_1[i];
											let y = submarks1[j]
											let a = semData_2[i];
							
											hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
											hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
											
										}

									}

									submarks1.forEach(function(item) {
										hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
										hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
									})

									var submarksArr = ["Mean Current","Mean Previous"]
						
									var graphData1_4 = []
									submarksArr.forEach(function(item){
										var graph1_4 = []
										for(var i=0; i<subnames_1.length; i++){
											let subject = subjects_1[subnames_1[i]]
											var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
											graph1_4.push(dictForSub1)
										}


										var dict1_4 = {
											type: "column",
											name: item,
											showInLegend: true,
											dataPoints : graph1_4
										}

										graphData1_4.push(dict1_4)
									})

									var options3 = {
										animationEnabled: true,	
										title:{
											text: "Comparison of Mean Marks",
											padding :{
												bottom : 10
											},
										},
										width:600,
										height:450,
										axisY : {
											title: "Marks",
											maximum : 100
										},
										axisX : {
											title : 'Subjects',
											labelWrap : true,
											labelFontSize : 10
										},
										toolTip: {
											shared: true
										},
										data: graphData1_4
								}




									return(<div>
										<div className='resultpgHeading'>Semester 1 Comparison</div>
										<CanvasJSChart options = {options1} />
										<hr className = 'resultHr1'/>
										<CanvasJSChart options = {options2} />
										<hr className = 'resultHr1'/>
										<CanvasJSChart options = {options3} />
					
									</div>)

					case "sem2-c" : var semData_1 = result['sem2']
					var semData_2 = result['sem2-1']

					var subjects_1 = semData_1[0]
					var subnames_1 = Object.keys(subjects_1)

					var sub_code1 = []
					var sub_code2 = []

					subnames_1.forEach(function(item) {
						sub_code1[item] = 0;
						sub_code2[item] = 0;
					})

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]

			
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;
							}

							if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
								sub_code2[b]= sub_code2[b] + 1;
							}
						}
					}

					var graphData1 = []

						var graph1 = []
							subnames_1.forEach(function(item) {
								let subject = subjects_1[item]
								var dictForSub1 = {label :subject,y:sub_code1[item]}
								graph1.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "column",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1
						}

						graphData1.push(dict1)

						var graph2 = []
						subnames_1.forEach(function(item) {
							let subject = subjects_1[item]
							var dictForSub1 = {label :subject,y:sub_code2[item]}
							graph2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "column",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2
						}

						graphData1.push(dict2)

						var options1 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Backlogs",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Backlogs",
							},
							axisX : {
								title : 'Subjects',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData1
					}


					var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					var gradesDict2 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

							gradesDict2[a[b]] = gradesDict2[a[b]] + 1

						}

					}

					var graphData2 = []

						var graph1_2 = []
							gradesArr.forEach(function(item) {
								var dictForSub1 = {label :item,y:gradesDict1[item]}
								graph1_2.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "spline",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1_2
						}

						graphData2.push(dict1)

						var graph2_2 = []
						gradesArr.forEach(function(item) {
							var dictForSub1 = {label :item,y:gradesDict2[item]}
							graph2_2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "spline",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2_2
						}

						graphData2.push(dict2)

						var options2 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Grades",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Grades",
							},
							axisX : {
								title : 'Grades',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData2
					}




					var hml1 = {}
					var submarks1 = []

					subnames_1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Mean Current' : 0,
							'Mean Previous' : 0
						}	
					});

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = submarks1[j]
							let a = semData_2[i];
			
							hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
							hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
							
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
						hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
					})

					var submarksArr = ["Mean Current","Mean Previous"]
		
					var graphData1_4 = []
					submarksArr.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames_1.length; i++){
							let subject = subjects_1[subnames_1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					var options3 = {
						animationEnabled: true,	
						title:{
							text: "Comparison of Mean Marks",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
							maximum : 100
						},
						axisX : {
							title : 'Subjects',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}




					return(<div>
						<div className='resultpgHeading'>Semester 2 Comparison</div>
						<CanvasJSChart options = {options1} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options2} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options3} />
	
					</div>)

					case "sem3-c" : var semData_1 = result['sem3']
					var semData_2 = result['sem3-1']

					var subjects_1 = semData_1[0]
					var subnames_1 = Object.keys(subjects_1)

					var sub_code1 = []
					var sub_code2 = []

					subnames_1.forEach(function(item) {
						sub_code1[item] = 0;
						sub_code2[item] = 0;
					})

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]

			
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;
							}

							if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
								sub_code2[b]= sub_code2[b] + 1;
							}
						}
					}

					var graphData1 = []

						var graph1 = []
							subnames_1.forEach(function(item) {
								let subject = subjects_1[item]
								var dictForSub1 = {label :subject,y:sub_code1[item]}
								graph1.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "column",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1
						}

						graphData1.push(dict1)

						var graph2 = []
						subnames_1.forEach(function(item) {
							let subject = subjects_1[item]
							var dictForSub1 = {label :subject,y:sub_code2[item]}
							graph2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "column",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2
						}

						graphData1.push(dict2)

						var options1 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Backlogs",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Backlogs",
							},
							axisX : {
								title : 'Subjects',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData1
					}


					var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					var gradesDict2 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

							gradesDict2[a[b]] = gradesDict2[a[b]] + 1

						}

					}

					var graphData2 = []

						var graph1_2 = []
							gradesArr.forEach(function(item) {
								var dictForSub1 = {label :item,y:gradesDict1[item]}
								graph1_2.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "spline",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1_2
						}

						graphData2.push(dict1)

						var graph2_2 = []
						gradesArr.forEach(function(item) {
							var dictForSub1 = {label :item,y:gradesDict2[item]}
							graph2_2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "spline",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2_2
						}

						graphData2.push(dict2)

						var options2 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Grades",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Grades",
							},
							axisX : {
								title : 'Grades',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData2
					}




					var hml1 = {}
					var submarks1 = []

					subnames_1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Mean Current' : 0,
							'Mean Previous' : 0
						}	
					});

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = submarks1[j]
							let a = semData_2[i];
			
							hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
							hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
							
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
						hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
					})

					var submarksArr = ["Mean Current","Mean Previous"]
		
					var graphData1_4 = []
					submarksArr.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames_1.length; i++){
							let subject = subjects_1[subnames_1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					var options3 = {
						animationEnabled: true,	
						title:{
							text: "Comparison of Mean Marks",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
							maximum : 100
						},
						axisX : {
							title : 'Subjects',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}




					return(<div>
						<div className='resultpgHeading'>Semester 3 Comparison</div>
						<CanvasJSChart options = {options1} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options2} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options3} />
	
					</div>)

					case "sem4-c" : var semData_1 = result['sem4']
					var semData_2 = result['sem4-1']

					var subjects_1 = semData_1[0]
					var subnames_1 = Object.keys(subjects_1)

					var sub_code1 = []
					var sub_code2 = []

					subnames_1.forEach(function(item) {
						sub_code1[item] = 0;
						sub_code2[item] = 0;
					})

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]

			
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;
							}

							if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
								sub_code2[b]= sub_code2[b] + 1;
							}
						}
					}

					var graphData1 = []

						var graph1 = []
							subnames_1.forEach(function(item) {
								let subject = subjects_1[item]
								var dictForSub1 = {label :subject,y:sub_code1[item]}
								graph1.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "column",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1
						}

						graphData1.push(dict1)

						var graph2 = []
						subnames_1.forEach(function(item) {
							let subject = subjects_1[item]
							var dictForSub1 = {label :subject,y:sub_code2[item]}
							graph2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "column",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2
						}

						graphData1.push(dict2)

						var options1 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Backlogs",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Backlogs",
							},
							axisX : {
								title : 'Subjects',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData1
					}


					var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					var gradesDict2 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

							gradesDict2[a[b]] = gradesDict2[a[b]] + 1

						}

					}

					var graphData2 = []

						var graph1_2 = []
							gradesArr.forEach(function(item) {
								var dictForSub1 = {label :item,y:gradesDict1[item]}
								graph1_2.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "spline",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1_2
						}

						graphData2.push(dict1)

						var graph2_2 = []
						gradesArr.forEach(function(item) {
							var dictForSub1 = {label :item,y:gradesDict2[item]}
							graph2_2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "spline",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2_2
						}

						graphData2.push(dict2)

						var options2 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Grades",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Grades",
							},
							axisX : {
								title : 'Grades',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData2
					}




					var hml1 = {}
					var submarks1 = []

					subnames_1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Mean Current' : 0,
							'Mean Previous' : 0
						}	
					});

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = submarks1[j]
							let a = semData_2[i];
			
							hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
							hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
							
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
						hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
					})

					var submarksArr = ["Mean Current","Mean Previous"]
		
					var graphData1_4 = []
					submarksArr.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames_1.length; i++){
							let subject = subjects_1[subnames_1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					var options3 = {
						animationEnabled: true,	
						title:{
							text: "Comparison of Mean Marks",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
							maximum : 100
						},
						axisX : {
							title : 'Subjects',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}




					return(<div>
						<div className='resultpgHeading'>Semester 4 Comparison</div>
						<CanvasJSChart options = {options1} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options2} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options3} />
	
					</div>)

					case "sem5-c" : var semData_1 = result['sem5']
					var semData_2 = result['sem5-1']

					var subjects_1 = semData_1[0]
					var subnames_1 = Object.keys(subjects_1)

					var sub_code1 = []
					var sub_code2 = []

					subnames_1.forEach(function(item) {
						sub_code1[item] = 0;
						sub_code2[item] = 0;
					})

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]

			
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;
							}

							if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
								sub_code2[b]= sub_code2[b] + 1;
							}
						}
					}

					var graphData1 = []

						var graph1 = []
							subnames_1.forEach(function(item) {
								let subject = subjects_1[item]
								var dictForSub1 = {label :subject,y:sub_code1[item]}
								graph1.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "column",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1
						}

						graphData1.push(dict1)

						var graph2 = []
						subnames_1.forEach(function(item) {
							let subject = subjects_1[item]
							var dictForSub1 = {label :subject,y:sub_code2[item]}
							graph2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "column",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2
						}

						graphData1.push(dict2)

						var options1 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Backlogs",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Backlogs",
							},
							axisX : {
								title : 'Subjects',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData1
					}


					var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					var gradesDict2 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

							gradesDict2[a[b]] = gradesDict2[a[b]] + 1

						}

					}

					var graphData2 = []

						var graph1_2 = []
							gradesArr.forEach(function(item) {
								var dictForSub1 = {label :item,y:gradesDict1[item]}
								graph1_2.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "spline",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1_2
						}

						graphData2.push(dict1)

						var graph2_2 = []
						gradesArr.forEach(function(item) {
							var dictForSub1 = {label :item,y:gradesDict2[item]}
							graph2_2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "spline",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2_2
						}

						graphData2.push(dict2)

						var options2 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Grades",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Grades",
							},
							axisX : {
								title : 'Grades',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData2
					}




					var hml1 = {}
					var submarks1 = []

					subnames_1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Mean Current' : 0,
							'Mean Previous' : 0
						}	
					});

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = submarks1[j]
							let a = semData_2[i];
			
							hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
							hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
							
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
						hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
					})

					var submarksArr = ["Mean Current","Mean Previous"]
		
					var graphData1_4 = []
					submarksArr.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames_1.length; i++){
							let subject = subjects_1[subnames_1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					var options3 = {
						animationEnabled: true,	
						title:{
							text: "Comparison of Mean Marks",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
							maximum : 100
						},
						axisX : {
							title : 'Subjects',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}




					return(<div>
						<div className='resultpgHeading'>Semester 5 Comparison</div>
						<CanvasJSChart options = {options1} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options2} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options3} />
	
					</div>)

					case "sem6-c" : var semData_1 = result['sem6']
					var semData_2 = result['sem6-1']

					var subjects_1 = semData_1[0]
					var subnames_1 = Object.keys(subjects_1)

					var sub_code1 = []
					var sub_code2 = []

					subnames_1.forEach(function(item) {
						sub_code1[item] = 0;
						sub_code2[item] = 0;
					})

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]

			
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;
							}

							if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
								sub_code2[b]= sub_code2[b] + 1;
							}
						}
					}

					var graphData1 = []

						var graph1 = []
							subnames_1.forEach(function(item) {
								let subject = subjects_1[item]
								var dictForSub1 = {label :subject,y:sub_code1[item]}
								graph1.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "column",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1
						}

						graphData1.push(dict1)

						var graph2 = []
						subnames_1.forEach(function(item) {
							let subject = subjects_1[item]
							var dictForSub1 = {label :subject,y:sub_code2[item]}
							graph2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "column",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2
						}

						graphData1.push(dict2)

						var options1 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Backlogs",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Backlogs",
							},
							axisX : {
								title : 'Subjects',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData1
					}


					var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					var gradesDict2 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

							gradesDict2[a[b]] = gradesDict2[a[b]] + 1

						}

					}

					var graphData2 = []

						var graph1_2 = []
							gradesArr.forEach(function(item) {
								var dictForSub1 = {label :item,y:gradesDict1[item]}
								graph1_2.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "spline",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1_2
						}

						graphData2.push(dict1)

						var graph2_2 = []
						gradesArr.forEach(function(item) {
							var dictForSub1 = {label :item,y:gradesDict2[item]}
							graph2_2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "spline",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2_2
						}

						graphData2.push(dict2)

						var options2 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Grades",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Grades",
							},
							axisX : {
								title : 'Grades',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData2
					}




					var hml1 = {}
					var submarks1 = []

					subnames_1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Mean Current' : 0,
							'Mean Previous' : 0
						}	
					});

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = submarks1[j]
							let a = semData_2[i];
			
							hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
							hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
							
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
						hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
					})

					var submarksArr = ["Mean Current","Mean Previous"]
		
					var graphData1_4 = []
					submarksArr.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames_1.length; i++){
							let subject = subjects_1[subnames_1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					var options3 = {
						animationEnabled: true,	
						title:{
							text: "Comparison of Mean Marks",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
							maximum : 100
						},
						axisX : {
							title : 'Subjects',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}




					return(<div>
						<div className='resultpgHeading'>Semester 6 Comparison</div>
						<CanvasJSChart options = {options1} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options2} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options3} />
	
					</div>)

					case "sem7-c" : var semData_1 = result['sem7']
					var semData_2 = result['sem7-1']

					var subjects_1 = semData_1[0]
					var subnames_1 = Object.keys(subjects_1)

					var sub_code1 = []
					var sub_code2 = []

					subnames_1.forEach(function(item) {
						sub_code1[item] = 0;
						sub_code2[item] = 0;
					})

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]

			
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;
							}

							if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
								sub_code2[b]= sub_code2[b] + 1;
							}
						}
					}

					var graphData1 = []

						var graph1 = []
							subnames_1.forEach(function(item) {
								let subject = subjects_1[item]
								var dictForSub1 = {label :subject,y:sub_code1[item]}
								graph1.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "column",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1
						}

						graphData1.push(dict1)

						var graph2 = []
						subnames_1.forEach(function(item) {
							let subject = subjects_1[item]
							var dictForSub1 = {label :subject,y:sub_code2[item]}
							graph2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "column",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2
						}

						graphData1.push(dict2)

						var options1 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Backlogs",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Backlogs",
							},
							axisX : {
								title : 'Subjects',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData1
					}


					var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					var gradesDict2 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

							gradesDict2[a[b]] = gradesDict2[a[b]] + 1

						}

					}

					var graphData2 = []

						var graph1_2 = []
							gradesArr.forEach(function(item) {
								var dictForSub1 = {label :item,y:gradesDict1[item]}
								graph1_2.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "spline",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1_2
						}

						graphData2.push(dict1)

						var graph2_2 = []
						gradesArr.forEach(function(item) {
							var dictForSub1 = {label :item,y:gradesDict2[item]}
							graph2_2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "spline",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2_2
						}

						graphData2.push(dict2)

						var options2 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Grades",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Grades",
							},
							axisX : {
								title : 'Grades',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData2
					}




					var hml1 = {}
					var submarks1 = []

					subnames_1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Mean Current' : 0,
							'Mean Previous' : 0
						}	
					});

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = submarks1[j]
							let a = semData_2[i];
			
							hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
							hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
							
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
						hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
					})

					var submarksArr = ["Mean Current","Mean Previous"]
		
					var graphData1_4 = []
					submarksArr.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames_1.length; i++){
							let subject = subjects_1[subnames_1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					var options3 = {
						animationEnabled: true,	
						title:{
							text: "Comparison of Mean Marks",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
							maximum : 100
						},
						axisX : {
							title : 'Subjects',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}




					return(<div>
						<div className='resultpgHeading'>Semester 7 Comparison</div>
						<CanvasJSChart options = {options1} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options2} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options3} />
	
					</div>)

					case "sem8-c" : var semData_1 = result['sem8']
					var semData_2 = result['sem8-1']

					var subjects_1 = semData_1[0]
					var subnames_1 = Object.keys(subjects_1)

					var sub_code1 = []
					var sub_code2 = []

					subnames_1.forEach(function(item) {
						sub_code1[item] = 0;
						sub_code2[item] = 0;
					})

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]

			
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;
							}

							if(a[b] == 'NE' || a[b] == 'F' || a[b] == 'X') {
								sub_code2[b]= sub_code2[b] + 1;
							}
						}
					}

					var graphData1 = []

						var graph1 = []
							subnames_1.forEach(function(item) {
								let subject = subjects_1[item]
								var dictForSub1 = {label :subject,y:sub_code1[item]}
								graph1.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "column",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1
						}

						graphData1.push(dict1)

						var graph2 = []
						subnames_1.forEach(function(item) {
							let subject = subjects_1[item]
							var dictForSub1 = {label :subject,y:sub_code2[item]}
							graph2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "column",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2
						}

						graphData1.push(dict2)

						var options1 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Backlogs",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Backlogs",
							},
							axisX : {
								title : 'Subjects',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData1
					}


					var gradesArr=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					var gradesDict2 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = subnames_1[j]

							let a = semData_2[i];
							let b = subnames_1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

							gradesDict2[a[b]] = gradesDict2[a[b]] + 1

						}

					}

					var graphData2 = []

						var graph1_2 = []
							gradesArr.forEach(function(item) {
								var dictForSub1 = {label :item,y:gradesDict1[item]}
								graph1_2.push(dictForSub1)
							})
																	

						var dict1 = {
							type: "spline",
							name: 'Current Batch',
							showInLegend: true,
							dataPoints : graph1_2
						}

						graphData2.push(dict1)

						var graph2_2 = []
						gradesArr.forEach(function(item) {
							var dictForSub1 = {label :item,y:gradesDict2[item]}
							graph2_2.push(dictForSub1)
						})
						

						var dict2 = {
							type: "spline",
							name: "Previous Batch",
							showInLegend: true,
							dataPoints : graph2_2
						}

						graphData2.push(dict2)

						var options2 = {
							animationEnabled: true,	
							title:{
								text: "Comparison of Grades",
								padding :{
									bottom : 10
								},
							},
							width:600,
							height:450,
							axisY : {
								title: "Number of Grades",
							},
							axisX : {
								title : 'Grades',
								labelWrap : true,
								labelFontSize : 10
							},
							toolTip: {
								shared: true
							},
							data: graphData2
					}




					var hml1 = {}
					var submarks1 = []

					subnames_1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Mean Current' : 0,
							'Mean Previous' : 0
						}	
					});

					for(var i=3;i<semData_1.length;i++){
						for(var j=0;j<subnames_1.length;j++){
							
							let x = semData_1[i];
							let y = submarks1[j]
							let a = semData_2[i];
			
							hml1[y]['Mean Current'] = hml1[y]['Mean Current'] + parseInt(x[y])
							hml1[y]['Mean Previous'] = hml1[y]['Mean Previous'] + parseInt(a[y])
							
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean Current'] = hml1[item]['Mean Current']/(semData_1.length-3);
						hml1[item]['Mean Previous'] = hml1[item]['Mean Previous']/(semData_1.length-3)
					})

					var submarksArr = ["Mean Current","Mean Previous"]
		
					var graphData1_4 = []
					submarksArr.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames_1.length; i++){
							let subject = subjects_1[subnames_1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					var options3 = {
						animationEnabled: true,	
						title:{
							text: "Comparison of Mean Marks",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
							maximum : 100
						},
						axisX : {
							title : 'Subjects',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}




					return(<div>
						<div className='resultpgHeading'>Semester 8 Comparison</div>
						<CanvasJSChart options = {options1} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options2} />
						<hr className = 'resultHr1'/>
						<CanvasJSChart options = {options3} />
	
					</div>)

					default: 
					const sem1Data = result[sem]
					console.log(sem1Data)

					var sem ={
						'sem1' : 'Semester-1 Data',
						'sem2' : 'Semester-2 Data',
						'sem3' : 'Semester-3 Data',
						'sem4' : 'Semester-4 Data',
						'sem5' : 'Semester-5 Data',
						'sem6' : 'Semester-6 Data',
						'sem7' : 'Semester-7 Data',
						'sem8' : 'Semester-8 Data',
						'sem1-1' : 'Semester-1 Data',
						'sem2-1' : 'Semester-2 Data',
						'sem3-1' : 'Semester-3 Data',
						'sem4-1' : 'Semester-4 Data',
						'sem5-1' : 'Semester-5 Data',
						'sem6-1' : 'Semester-6 Data',
						'sem7-1' : 'Semester-7 Data',
						'sem8-1' : 'Semester-8 Data',
					}
					const subjects1 = sem1Data[0]
					const subnames1 = Object.keys(subjects1)
					var sub_code1 = []

					subnames1.forEach(function(item) {
						sub_code1[item] = 0
					})
					
					var backlogArray = []

					for(var i=3;i<sem1Data.length;i++){
						var failed_subjects = ''
						for(var j=0;j<subnames1.length;j++){
							
							let x = sem1Data[i];
							let y = subnames1[j]
							
							if(x[y] == 'NE' || x[y] == 'F' || x[y] == 'X') {
								sub_code1[y]= sub_code1[y] + 1;

								if(failed_subjects.length == 0){
									failed_subjects = failed_subjects + subjects1[y]
								}
								else{
									failed_subjects = failed_subjects + ' , ' + subjects1[y]
								}
							}

							if ( j == (subnames1.length-1) && (failed_subjects.length > 0)){
								backlogArray.push({
									USN : x['USN'],
									Name : x['Name'],
									Section : x['Section'],
									subjects : failed_subjects
								})
							}
						}
					}
					
					const backlogList = backlogArray.map(data => {
						return(
							<div>
								<b>Name</b> : {data.Name} <br />
								<b>USN : </b>{data.USN} <br />
								<b>Section : </b>{data.Section}<br />
								<b>Subjects :	</b> <i>{data.subjects}</i><br /><br /><br />
							</div>
						)
					})

					var graphData1_1 = []
					subnames1.forEach(function(item) {
						let subject = subjects1[item]
						var dict = {'label':subject,'y':sub_code1[item]}
						graphData1_1.push(dict)		
					});

					const options1_1 = {
						title: {
							text: "Number of Backlogs",
							padding :{
								bottom : 10
							},
						},
						axisX : {
							labelWrap : true,
							title : 'Subjects',
							labelFontSize : 12
						},
						axisY : {
							title : 'Number of Students failed'
						},
						animationEnabled: true,
						width:600,
						height:400,
						data: [
						{
							
							type: "column",
							dataPoints: graphData1_1
						}
						]
					}

					var gradesArr1=['S+','S','A','B','C','D','E','F','NE','X','W']

					var gradesDict1 = {
						'S+' : 0,
						'S' : 0,
						'A' : 0,
						'B' : 0,
						'C' : 0,
						'D' : 0,
						'E' : 0,
						'F' : 0,
						'NE' : 0,
						'X' : 0,
						'W' : 0
					}

					for(var i=3;i<sem1Data.length;i++){
						for(var j=0;j<subnames1.length;j++){
							
							let x = sem1Data[i];
							let y = subnames1[j]
			
							gradesDict1[x[y]] = gradesDict1[x[y]] + 1

						}

					}

					var graphData1_3 = []

					gradesArr1.forEach(function(item){
						var dict1_1 = { label: item , y: gradesDict1[item] }
						graphData1_3.push(dict1_1)
					})
					
					const options1_3 = {
						animationEnabled: true,
						title:{
							text: "Uniformly Distributed Graph ",
							padding :{
								bottom : 10
							},
						},
						axisY : {
							title : 'Number of Grades'
						},
						axisX : {
							title : 'Grades'
						},
						width:600,
						height:400,
						data: [{
							
							type: "spline",
							dataPoints:graphData1_3
						}]
					}

					var eachSubGrades1 = {}

					subnames1.forEach(function(item) {
						
						eachSubGrades1[item] = {
							'S+' :0,
							'S' : 0,
							'A' : 0,
							'B' : 0,
							'C' : 0,
							'D' : 0,
							'E' : 0,
							'NE' : 0,
							'F' : 0,
							'X': 0,
							'W' : 0
						}
						
					});

					for(var i=3;i<sem1Data.length;i++){
						for(var j=0;j<subnames1.length;j++){
							
							let x = sem1Data[i];
							let y = subnames1[j]
			
							eachSubGrades1[y][x[y]] = eachSubGrades1[y][x[y]] + 1
						}

					}
					
					var graphData1_2 = []
					gradesArr1.forEach(function(item){
						var graphDataForSub1 = []
						for(var i=0; i<subnames1.length; i++){
							let subject = subjects1[subnames1[i]]
							var dictForSub1 = {label :subject,y:eachSubGrades1[subnames1[i]][item]}
							graphDataForSub1.push(dictForSub1)
						}

						graphDataForSub1.push(dictForSub1)

						var dict1_2 = {
							type: "stackedColumn100",
							name: item,
							showInLegend: true,
							dataPoints : graphDataForSub1
						}

						graphData1_2.push(dict1_2)
					})

					const options1_2 = {
						animationEnabled: true,
						title:{
							text: "Grades for each subject",
							padding :{
								bottom : 10
							},
						},
						axisX : {
							labelWrap : true,
							labelFontSize : 12,
							title : 'Subjects'
						},
						axisY : {
							title : 'Number of grades'
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
						data: graphData1_2
					}

					var hml1 = {}
					var submarks1 = []

					subnames1.forEach(function(item) {
						var item1 = item+'M'
						submarks1.push(item1)
					})


					submarks1.forEach(function(item) {
						
						hml1[item] = {
							'Highest' : 0,
							'Lowest' : 100,
							'Mean' : 0
						}	
					});

					for(var i=3;i<sem1Data.length;i++){
						for(var j=0;j<subnames1.length;j++){
							
							let x = sem1Data[i];
							let y = submarks1[j]
							let k = subnames1[j]
			
							hml1[y]['Mean'] = hml1[y]['Mean'] + parseInt(x[y])

							if(parseInt(x[y]) > hml1[y]['Highest']) {
								hml1[y]['Highest'] = parseInt(x[y])
							}

							if(parseInt(x[y]) < hml1[y]['Lowest'] && x[k]!='NE' && x[k]!='W') {
								hml1[y]['Lowest'] = parseInt(x[y])
							}
						}

					}

					submarks1.forEach(function(item) {
						hml1[item]['Mean'] = hml1[item]['Mean']/(sem1Data.length-3)
					})

					let submarksArr1 = ['Highest','Mean','Lowest']
		
					var graphData1_4 = []
					submarksArr1.forEach(function(item){
						var graph1_4 = []
						for(var i=0; i<subnames1.length; i++){
							let subject = subjects1[subnames1[i]]
							var dictForSub1 = {label :subject,y:hml1[submarks1[i]][item]}
							graph1_4.push(dictForSub1)
						}


						var dict1_4 = {
							type: "column",
							name: item,
							showInLegend: true,
							dataPoints : graph1_4
						}

						graphData1_4.push(dict1_4)
					})

					const options1_4 = {
						animationEnabled: true,	
						title:{
							text: "Highest Mean and Lowest",
							padding :{
								bottom : 10
							},
						},
						width:600,
						height:450,
						axisY : {
							title: "Marks",
						},
						axisX : {
							title : 'Highest Mean Lowest',
							labelWrap : true,
							labelFontSize : 10
						},
						toolTip: {
							shared: true
						},
						data: graphData1_4
				}

			return(<div>
					<div className='resultpgHeading'>{sem[this.state.count]}</div>
					<CanvasJSChart options = {options1_1} />
					<hr className = 'resultHr'/>
					<CanvasJSChart options = {options1_2} />
					<hr className = 'resultHr'/>
					<CanvasJSChart options = {options1_3} />
					<hr className = 'resultHr'/>
					<CanvasJSChart options = {options1_4} />
					<hr className = 'resultHr'/>
					<h1> Backlog Data </h1>
					<div>{backlogList}</div>										
				</div>
				);
				}
		
		}

		return (
		<div>
			<div id="App1">
              <SideBar func={this.output}/>
              <div id="page-wrap"></div>
            </div>
			<div className='myele'>{returnSemData()}</div>
		</div>
		);
	}
}

export default Result;