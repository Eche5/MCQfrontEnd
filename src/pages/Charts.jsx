import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

const courseData = [
  { course: "Anatomy", value: 60, color: "#FF5733" },
  { course: "Physiology", value: 20, color: "#33FF57" },
  { course: "Biochemistry", value: 20, color: "#A233FF" },
];

const Charts = () => {
  return (
    <div className="control-pane">
      <AccumulationChartComponent
        title="Course Totals"
        legendSettings={{ visible: true, position: "Bottom" }}
        enableSmartLabels={true}
        enableAnimation={false}
        center={{ x: "50%", y: "50%" }}
        enableBorderOnMouseMove={false}
        tooltip={{
          enable: true,
          format: "<b>${point.x}</b><br>percentage: <b>${point.y}%</b>",
          header: "",
        }}
      >
        <Inject
          services={[
            AccumulationLegend,
            AccumulationTooltip,
            AccumulationDataLabel,
          ]}
        />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataSource={courseData}
            name="Courses"
            xName="course"
            yName="value"
            dataLabel={{
              visible: true,
              position: "Inside",
              name: "value",
              font: { fontWeight: "600" },
              connectorStyle: { length: "20px", type: "Curve" },
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default Charts;
