import React from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";


export default function WeeklyUsersChart({data}) {
	return (
		<div>
			<Card className="border-0">
				<Card.Body>
					<Pie
						data={data}
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
