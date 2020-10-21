import React from "react";
import { Card } from "react-bootstrap";
import { GiReceiveMoney } from "react-icons/gi"

export default function TotalIcomeInfo() {
	return (
		<div>
			<Card 	className="border-0">
				<Card.Header
					className="border-0"
					style={{ backgroundColor: "#76ba1b" }}>
                         <GiReceiveMoney style={styles.icon}  className="mr-4"/>
					<b style={{ color: "white" }}>Total Income</b>
				</Card.Header>
                <Card.Body className="pb-0 pt-1">
                <div  className="text-center">
                <label style={styles.text}><b>$2500</b></label>
                </div>                  
                </Card.Body>
			</Card>
		</div>
	);
}


const styles = {
   icon: {
      fontSize:"20px",
      color: "#ffa500",
      backgroundColor: "whitesmoke",
      borderRadius: "50px",
      padding: "2px"
   },
   text: {
      opacity:"0.7",
      fontSize: "1em"
   }
}