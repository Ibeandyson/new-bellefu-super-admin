import React from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const state = {
	labels: ["January", "February", "March", "April", "May"],
	datasets: [
		{
			label: "Rainfall",
			backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
			hoverBackgroundColor: [
				"#501800",
				"#4B5000",
				"#175000",
				"#003350",
				"#35014F"
			],
			data: [65, 59, 80, 81, 56]
		}
	]
};

export default function WeeklyUsersChart() {
	return (
		<div>
			<Card className="border-0">
				<Card.Body>
					<Pie
						data={state}
						options={{
							title: {
								display: true,
								text: "Weekly users",
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
