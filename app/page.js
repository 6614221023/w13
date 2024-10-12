import Image from "next/image";
import { PieChart001 } from "./components/pie-chart-001";
import { BarChart002 } from "./components/bar-chart-002";
import { DoughnutChart003 } from "./components/doughnut-chart-003";
import { BubbleChart004 } from './components/bubble-chart-004';
import { LineChart005 } from "./components/line-chart-005";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <PieChart001 /> 
    </div>
      <div className= "z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <BarChart002 />
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <DoughnutChart003 />
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex my-10">
        <BubbleChart004 />
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex" >
        <LineChart005 />
      </div>
      
    </main>
    
  );
}