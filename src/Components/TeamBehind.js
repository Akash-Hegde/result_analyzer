import React from "react";
import "../styles.css";

export default function TeamBehind({ title, id }) {
    return (
      <div className="teamBehind">
        <div className="section-content" id={id}>
         <center className="centb"> <h1>{title}</h1></center>
         <hr className="hr"></hr>
        <div id ="teambehind">
          <br />
        <p>
            PROJECT GUIDE : <a id = 'linktoLinkedIn' href="http://www.msrit.edu/department/faculty-detail.html?dept=ise&ID=7">Dr. Megha. P. Arakeri</a> 
          </p>  <br />
        <p>
            ADITYA K - 1MS17IS007
          </p>
          <p>
            AKASH K HEGDE      - 1MS17IS011
          </p>
          <p>
            AKASH S TONSE      - 1MS17IS012
          </p>
          <p>
            M BHARAT KUMAR      - 1MS17IS059
          </p>
         
        </div>
          
        </div>
      </div>
    );
  }
  
