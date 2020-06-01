import React, { Component } from "react";
import { bubble as Menu } from "react-burger-menu";
import './App.css';

class SideBar extends Component {
  constructor(props){
    super();
  }
  
  render(){
    return (
      // Pass on our props
      <Menu pageWrapId={"page-wrap"} outerContainerId={"App1"} width={ '260px' }>
        <ul id='sidenav'>
  
          <li className="menu-item" id='litagspace'>Current Batch
            
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

          <li className="menu-item" id='litagspace'>Previous Batch
            
            <ul>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem1-1')}> SEM 1 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem2-1')}> SEM 2 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem3-1')}> SEM 3 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem4-1')}> SEM 4 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem5-1')}> SEM 5 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem6-1')}> SEM 6 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem7-1')}> SEM 7 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem8-1')}> SEM 8 </a>
              </li>
            </ul>
          </li>

          <li className="menu-item" id='litagspace'>Compare Batch
            
            <ul>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem1-c')}> SEM 1 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem2-c')}> SEM 2 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem3-c')}> SEM 3 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem4-c')}> SEM 4 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem5-c')}> SEM 5 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem6-c')}> SEM 6 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem7-c')}> SEM 7 </a>
              </li>
              <li>
                <a className="menu-item" onClick={(evt) => this.props.func('sem8-c')}> SEM 8 </a>
              </li>
            </ul>
          </li>
        

        </ul>
        
      </Menu>
    );
  }

  
};

export default SideBar;