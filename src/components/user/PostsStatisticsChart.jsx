import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const data = {
	labels: ["January", "February", "March", "April", "May"],
	datasets: [
		{
			label: "Ads",
			fill: false,
			lineTension: 0.5,
			backgroundColor: "rgba(75,192,192,1)",
			borderColor: "rgba(0,0,0,1)",
			borderWidth: 2,
			data: [65, 59, 80, 81, 56]
		}
	]
};
export default function PostsStatisticsChart() {
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
								fontSize: 20
							},
							legend: {
								display: true,
								position: "right"
							}
						}}
					/>
				</Card.Body>
			</Card>
		</div>
	);
}
