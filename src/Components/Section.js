import React from "react";
import "../styles.css";


export default function Section({ title, subtitle, dark, id }) {
  return (
    <div className={"section" + (dark ? " section-dark" : "")}>
      <div className="section-content" id={id}>
        <center><h1>{title}</h1></center>
        <hr className="hr"></hr>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
