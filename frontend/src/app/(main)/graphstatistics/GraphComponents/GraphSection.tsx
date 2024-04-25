
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale} from 'chart.js/auto';  // Must import CategoryScale and LinearScale
import { useGraphContext } from '../Context';

Chart.register(CategoryScale, LinearScale);  // Must register CategoryScale and LinearScale, else NotFoundError will be thrown

const GraphSection = () => {
  const { graphData, setGraphData } = useGraphContext();

  return (
    <div className="h-90/100">
      <Bar
        data={{         
          labels: graphData?.graphLabels,

          datasets: [
            {
              label: "Number of Rooms Booked",
              data: graphData?.graphValues,
              backgroundColor: ["gray"],
              borderColor: "black",
              borderWidth: 5
            },
          ]
        }}
        height={300}
        width={500}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  )
}

export default GraphSection