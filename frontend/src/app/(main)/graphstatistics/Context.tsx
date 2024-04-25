import { createContext, useContext } from "react";
import { GraphProps } from "./page";

interface GraphContextProps {
  graphData: GraphProps | undefined;
  setGraphData: React.Dispatch<React.SetStateAction<GraphProps | undefined>>;
}

export const GraphContext = createContext< GraphContextProps | undefined >(undefined);

export function useGraphContext() {
  const graphContext = useContext(GraphContext);

  if (graphContext === undefined) {
    throw new Error("useGraphContext must be used with a GraphContext")
  }

  return graphContext;
}

export default GraphContext;