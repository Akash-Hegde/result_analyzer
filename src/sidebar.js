import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

class SideBar extends Component {
  constructor(props){
    super();
  }
  
  render(){
    return (
      // Pass on our props
      <Menu pageWrapId={"page-wrap"} outerContainerId={"App1"}>
        <ul id='sidenav'>
  
          <li>
            <a className="menu-item" > VIEW BY SEMESTER </a>
            <ul>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem1')}> SEM 1 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem2')}> SEM 2 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem3')}> SEM 3 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem4')}> SEM 4 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem5')}> SEM 5 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem6')}> SEM 6 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem7')}> SEM 7 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem8')}> SEM 8 </a>
              </li>
            </ul>
          </li>
        
          <li>
            <a className="menu-item" href="/burgers">Input usn</a>
            
              <li>
                <input type='text'/>
              </li>
              
          </li>
        
          {/* <li>
            <a className="menu-item" href="/pizzas">Pizzas</a>
          </li>
          
          <li>
            <a className="menu-item" href="/desserts">Desserts </a>
          </li>   */}
        
        </ul>
      </Menu>
    );
  }

  
};

export default SideBar;