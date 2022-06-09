import { ChartType, TooltipItem } from 'chart.js';
import { Sale } from 'src/redux/sales/salesSlice';


const daysLabels: string[] = [];
for (let i = 1; i < 32; i++) {
  daysLabels.push(String(i));
}
export const salesGraphConfig = ( selectedPeriod: number, sales?: Sale[], monthsLabels?: unknown[]) => {
  return {
    salesData: {
      labels: selectedPeriod === 3 ? daysLabels : monthsLabels,
      datasets: [
        {
          label: 'Sales',
          data: sales?.map((s: Sale) => s.quantitySold),
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        },
        {
          label: 'Profit',
          data: sales?.map((s: Sale) => {
            const profit = s.revenue! - (s.sourcePrice! + s.totalTax!);
            return profit;
          }),
          backgroundColor: '#16537e',
          borderColor: '#16537e',
          borderWidth: 1
        }
      ]
    },
    salesOptions: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const
        },
        title: {
          display: true,
          text: 'Sales and Profit Chart'
        },
        tooltip: {
          callbacks: {
            title: (context: TooltipItem<ChartType>[]) => {
              return context[0].label;
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            text: selectedPeriod === 4 ? 'Period in months of a year' : 'Period in days of a month',
            display: true
          }
        },
        y: {
          min: 0,
          max: 10000
        }
      }
    }
  };
};


export const affiliatesGraphConfig = ( selectedPeriod: number, data?: Sale[], monthsLabels?: unknown[]) => {
  return {
    affiliatesData: {
      labels: selectedPeriod === 3 ? daysLabels : monthsLabels,
      datasets: [
        {
          label: 'Affiliates Stats',
          data: [],
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        },
        // {
        //   label: 'Profit',
        //   data: [],
        //   backgroundColor: '#16537e',
        //   borderColor: '#16537e',
        //   borderWidth: 1
        // }
      ]
    },
    affiliatesOptions: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const
        },
        title: {
          display: true,
          text: 'Affiliates Statistics Chart'
        },
        tooltip: {
          callbacks: {
            title: (context: TooltipItem<ChartType>[]) => {
              return context[0].label;
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            text: selectedPeriod === 4 ? 'Period in months of a year' : 'Period in days of a month',
            display: true
          }
        },
        y: {
          min: 0,
          max: 10000
        }
      }
    }
  };
};

