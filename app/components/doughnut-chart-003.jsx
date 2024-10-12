"use client";
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart003() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'ผู้ติดเชื้อแต่ละจังหวัด',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          // เพิ่มสีอื่น ๆ ตามต้องการ
        ],
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost/dv-w12/api/covid3/');
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      // จัดเตรียมข้อมูลสำหรับกราฟ
      const labels = jsonData.map(item => item.province_of_onset);
      const values = jsonData.map(item => item.confirmed_count);

      setData({
        labels: labels,
        datasets: [
          {
            ...data.datasets[0],
            data: values,
          },
        ],
      });
    }
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ผู้ติดเชื้อแต่ละจังหวัด',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
