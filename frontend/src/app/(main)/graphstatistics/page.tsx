"use client";
import React, { useEffect, useState } from "react";
import { GraphContext } from "./Context";
import Sortbars from "./GraphComponents/Sortbars";
import GraphSection from "./GraphComponents/GraphSection";

export interface GraphProps {
  graphLabels: string[];
  graphValues: number[];
}

const GraphStatisticsPage = () => {

  const [graphData, setGraphData] = useState< GraphProps | undefined>({ graphLabels: [], graphValues: [] });

  return (
    <GraphContext.Provider value={{graphData, setGraphData}}>
      <div className="flex flex-col h-full">
        {/* Graph Section */}
        <div className="h-full flex flex-col bg-white-50/80 backdrop-blur-lg rounded-xl border border-neutral-200 p-4 m-4">
          <div className="h-10/100 flex flex-row justify-between">
            <Sortbars />
          </div>
          <GraphSection />   
        </div>
      </div>
    </GraphContext.Provider>
  );
};

export default GraphStatisticsPage;

