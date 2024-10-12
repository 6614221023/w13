"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
export async function getData(){
  const res = await fetch('http://localhost/dv-w12/api/covid/')
  if (!res.ok){
    throw new Error("Failed to get data")
  }
  return res.json()
}


export function LineChart005() {
  const [data,setData] = useState({
    labels : [],
    datasets  : [
      {
        label: 'Dataset 1',
        data : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
  });


  useEffect(() => {
    async function fetchData(){
      const jsonData = await getData()
      console.log(jsonData)
      setData({
        labels : jsonData ? jsonData.map(item => item.notified_monthname): [],
        datasets  : [
          {
            label: 'Dataset 1',
            data : jsonData ? jsonData.map(item => item.confirmed_count): [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]        
      })
    }
    fetchData()
  },[])


  return <Line options={options} data={data} />;
}
