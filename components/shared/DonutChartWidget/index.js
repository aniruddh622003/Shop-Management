import { Card, Typography } from "@mui/material";
import { apexPieChartDefaultOption } from "utils/constants";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const defaultOption = apexPieChartDefaultOption;

const DonutChartWidget = (props) => {
  const {
    width,
    height,
    title,
    extra,
    bodyClass,
    data,
    // customOptions,
    // series,
    // labels,
  } = props;

  const labels = data?.map((item) => item[props.label]) ?? [];
  const series = data?.map((item) => item[props.series]) ?? [];
  const colors = data?.map((item) => item.color) ?? [];

  let options = defaultOption;
  options.labels = labels;
  options.plotOptions.pie.donut.size = "65%";
  // options.plotOptions.pie.donut.labels.total.label = title;
  // if (!title) {
  options.plotOptions.pie.donut.labels.show = false;
  // }
  if (data) {
    options = { ...options, colors };
  }

  return (
    Chart && (
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" component="div" mb={3}>
          {title}
        </Typography>
        <div className={`text-center ${bodyClass}`}>
          <Chart
            type="donut"
            options={options}
            series={series}
            width={width}
            height={height}
          />
          {extra}
        </div>
      </Card>
    )
  );
};

DonutChartWidget.propTypes = {
  series: PropTypes.array.isRequired,
  labels: PropTypes.array,
  title: PropTypes.string,
  extra: PropTypes.element,
  bodyClass: PropTypes.string,
};

DonutChartWidget.defaultProps = {
  series: [],
  labels: [],
  title: "",
  height: 250,
  width: "100%",
};

export default DonutChartWidget;
