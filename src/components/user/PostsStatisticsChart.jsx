import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

export default function PostsStatisticsChart({ data }) {
  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Line
            data={data}
            width={100}
            height={50}
            style={{ color: "red" }}
            options={{
              title: {
                display: true,
                text: "Ad Posts Statistics",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
