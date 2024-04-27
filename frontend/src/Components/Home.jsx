import React from "react";
import './Home.css';
import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
  } from "react-resizable-panels";
import CommonComponent from "./CommonComponent/CommonComponent";
import UserData from "./CommonComponent/userData/userData";

const Home = () => {
    return(
        <div className="container">
            <PanelGroup direction="vertical" className="inner-container">
                <Panel>
                {/* Outer group top section */}
                    <PanelGroup direction="horizontal" className='hori'>
                    {/* left inner section */}
                        <Panel defaultSize={0} minSize={0} maxSize={40} ></Panel>
                        <PanelResizeHandle /> 
                                         
                        <Panel defaultSize={30} minSize={30} maxSize={70} >
                            <CommonComponent number={1} name="child1" />
                        </Panel>
                        <PanelResizeHandle /> 
                    {/* right inner section */}
                        <Panel defaultSize={70} minSize={30}  maxSize={70}>
                            <CommonComponent number={2} name="child2" />
                        </Panel>
                        <PanelResizeHandle />

                        <Panel defaultSize={0} minSize={0} maxSize={80} ></Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle />
                 {/* Outer group bottom section */}
                <Panel defaultSize={40} minSize={20}  maxSize={40}>
                    <CommonComponent number={3} name="child3" />
                </Panel>
                <Panel defaultSize={0} minSize={0} maxSize={40} ></Panel>
                    <PanelResizeHandle /> 
            </PanelGroup>

            {/* user Data section */}
            <UserData />


        </div>
    )
}

export default Home;