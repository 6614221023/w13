"use client";
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: 'Confirmed Cases by Province',
    },
  },
};

export async function getData() {
  const res = await fetch('http://localhost/dv-w12/api/coivd2/');
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  const jsonData = await res.json();
  console.log("JSON Data Structure:", jsonData); // ตรวจสอบข้อมูลที่ได้
  return jsonData;
}

export function BarChart002() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Confirmed Cases',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log("Fetched data:", jsonData); // ตรวจสอบข้อมูลที่ได้
      const newData = {
        labels: jsonData ? jsonData.map(item => item.province) : [],
        datasets: [
          {
            label: 'Confirmed Cases',
            data: jsonData ? jsonData.map(item => item.confirmed_count) : [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      };
      
      setData(newData);
      console.log("Data for chart:", newData); // ตรวจสอบข้อมูลที่จะส่งไปยังกราฟ
    }
    fetchData();
  }, []);

  return <Bar options={options} data={data} style={{ height: '400px', width: '600px' }} />;
}
