import React from 'react'
import { Card, Row, Image, Col } from'react-bootstrap'
import pic from "../images/pic.jpg"
import { IoIosTime, IoMdMailOpen } from "react-icons/io"
import { AiFillPhone } from "react-icons/ai"

export default function UserAdInfo() {
    return (
        <div>
           <Card className="border-0 ">
                <Card.Header
						className="border-0"
						style={{ backgroundColor: "#76ba1b" }}>
						<b style={{ color: "white" }}>Advertiser Info</b>
					</Card.Header>
                    <Card.Body>    
                     <Row>
                     <Col xm={12} sm={12} md={12} lg={12} xl={12} className="text-center" >
                     <Image src={pic} style={styles.avater}  roundedCircle/>
                         </Col>
                         <Col xm={12} sm={12} md={12} lg={12} xl={12}  className="text-center mt-2" >
                            <p><b>Ibe Andyson Andrew</b></p>
                         </Col>
                         <Col xm={12} sm={12} md={12} lg={12} xl={12}  className="text-center mt-2" >
                                <div >
                              <IoIosTime style={styles.icon} className="mr-3"/> <span style={styles.text}><b>2 months ago</b></span>
                              </div>
                            </Col>
                            <Col xm={12} sm={12} md={12} lg={12} xl={12}  className="text-center mt-2" >
                                <div>
                              <AiFillPhone style={styles.icon} className="mr-3"/> <span style={styles.text}><b>09033275449</b></span>
                              </div>
                            </Col>
                            <Col xm={12} sm={12} md={12} lg={12} xl={12}  className="text-center mt-2" >
                                <div>
                              <IoMdMailOpen style={styles.icon} className="mr-3"/> <a href="mailto:ibeandyson123@gmail.com?subject=subject text"><span style={styles.text}><b>Reply By Mail</b></span></a>
                              </div>
                            </Col>
                     </Row>
                    </Card.Body>
                </Card>  
        </div>
    )
}


const styles = {
    avater:{
        height: "100px"
    },
    icon: {
        color: "#ffa500",
        fontSize: "20px"
       },
       text: {
           fontSize: "15px"
       }
   }
