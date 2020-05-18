import React from "react";

export default function TeamBehind({ title, id }) {
    return (
      <div className="teamBehind">
        <div className="section-content" id={id}>
         <center className="centb"> <h1>{title}</h1></center>
         <hr className="hr"></hr>
        <div id ="teambehind">
        <p>
            ADITYA KUMARASWAMY [1MS17IS007]
          </p>
          <p>
            AKASH K HEGDE      [1MS17IS011]
          </p>
          <p>
            AKASH S TONSE      [1MS17IS012]
          </p>
          <p>
            BHARATH KUMAR      [1MS17IS0xx]
          </p>
        </div>
          
        </div>
      </div>
    );
  }
  
