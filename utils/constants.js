export const JWT_SECRET = "Shop-Management";
export const drawerWidth = 240;

export const COLOR_1 = "#3e82f7"; // blue
export const COLOR_2 = "#04d182"; // cyan
export const COLOR_3 = "#ff6b72"; // volcano
export const COLOR_4 = "#ffc107"; // gold
export const COLOR_5 = "#a461d8"; // purple
export const COLOR_6 = "#fa8c16"; // orange
export const COLOR_7 = "#17bcff"; // geekblue

export const COLORS = [
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7,
];

export const apexPieChartDefaultOption = {
  colors: [...COLORS],
  plotOptions: {
    pie: {
      size: 50,
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: "",
            fontSize: "18px",
            fontFamily: "Roboto",
            fontWeight: "bold",
            color: "#1a3353",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
        size: "87%",
      },
    },
  },
  labels: [],
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
};
