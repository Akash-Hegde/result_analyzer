import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import Navbar from "./Components/Navbar";
import Section from "./Components/Section";
import TeamBehind from "./Components/TeamBehind";
import dummyText from "./DummyText";
import "./App.css";
// import Result from "./Result";
// import { browserHistory } from "react-router";
// import { useHistory } from 'react-router-dom';
// import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink  } from 'reactstrap';


class ExcelReader extends Component {

  // routeChange=()=> {
  //   let path = `newPath`;
  //   let history = useHistory();
  //   history.push(path);
  // }
 

  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e) {
    var file1 = document.getElementById("file1");
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
    file1.style.visibility = "visible";
  };
  
  afterSetStateFinished (value) {
    this.props.history.push({pathname : "/Result",state : { detail: value }});
    // console.log(this.props.history);
    
  };

  handleFile() {
    
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, 
        // console.log(JSON.stringify(this.state.data, null, 2)));
        () => {
          this.afterSetStateFinished(JSON.stringify(this.state.data, null, 2));
      });
    };
 
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

  render() {
    return (
      <div>
        <div className="App">
        <Navbar />
        <div className='Frontpagebg'></div>
            <strong className='rit_compo'>RIT RESULT ANALYSER</strong>
            <hr className='rit_compo1'></hr>
            <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
            
            <input type='submit' className="form-control1" id ="file1" value="Process File" onClick={this.handleFile} />
              
        
        

        {/* Guys there are five sections presently ... i dont think we'll need them all..
            Fill the sections . replace 'dummyText' by the text u want to replace in subtitle and 
             edit them in css file. the id of the respective section is present in the section
             To edit the section in css file do : eg '#section {font : alsalskf}'  and stuff 
             Also u can do put className='name' in section tag and edit in css by doing 
             .name{font : 'alskdjf} .Also we dont need full screen for each section ..U can edit that
            using 'height' property in css i think (figure that out )*  ..Also there is a dark option in 
            section ..its not required ..u can edit it out to put any colour of your choice.
            Also try to edit to edit the graph page if u can..its in Result.js file .
            Try to edit and style the navbar also .. u can edit it in Navbar.js
            

            call me if u have any doubts ,, 
            U can also refer to this site for styling :https://jecc.ac.in/kturesultanalysis/

            also remember me to delete this comment before submitting.
        */}
        <Section
          title="ABOUT"
          subtitle="We found that the teaching faculty of our institutions still perform most of the post-result analysis by hand due to the limitations and lack of computer software’s and tools available to them. This primarily leads to human errors and the analysis being really tedious, time consuming and it also limits the different analysis which could be done on the available data. So we came up with a  solution to this problem which is in the form of  a web application which does the work quickly without any errors This Web Application aims to eliminate these issues and allow the faculty to perform the analysis on their computer which not only saves time but also help them in dealing with large amounts of data. This application primarily aims to visualize data in the form of graphs to analyse and extract all the information from results and to check the accuracy of the test paper evaluation. Performing these tasks for large amounts of data is pretty time consuming. We aim to overcome these drawbacks with our application which may allow the faculty to relay more on software’s to perform their tasks. Therefore easing out the work load on them "
          dark={true}
          id="section1"
        />
        <Section
          title="FEATURES"
          subtitle="The result is printed in excel sheet from the examination department, that excel sheet should be provided as input to our application by choosing it from your system and hit the process file button which will do the necessary pre processing and display the analysis in the next page 
          The analysis contains a bar graph of how many number of students failed in each subject and we can also compare number of student failed in each subject so you will get the exact number of student failed in each subject and next we have a bar graph which shows how many number of students have acquired a particular grade in each subject and that is also comparable. At the end we have a uniform distribution graph which shows grade V/S number of students in overall which include all the subject, it helps us to find the efficiency of evaluation "
          dark={false}
          id="section2"
        />
        <TeamBehind
          title="TEAM BEHIND"
          subtitle={dummyText}
          dark={true}
          id="section3"
        />
        
        
      </div>
    </div>
       
      

    )
  }
}

export default ExcelReader;


