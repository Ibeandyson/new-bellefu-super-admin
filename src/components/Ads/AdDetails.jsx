import React from 'react'
import { Row, Col, Card } from "react-bootstrap"
import { MdLocationOn } from "react-icons/md"
import { GiReceiveMoney } from "react-icons/gi"
import { IoIosTime } from "react-icons/io"
import { AiFillPhone, AiFillEye } from "react-icons/ai"
import { FaSlackHash } from "react-icons/fa"

export default function AdDetails() {
    return (
        <div>
            <Row>
                <Col>
                <Card className="border-0">
                <Card.Header
						className="border-0"
						style={{ backgroundColor: "#76ba1b" }}>
						<b style={{ color: "white" }}> Details</b>
					</Card.Header>
                    <Card.Body>    
                        <Row>
                            <Col xm={12} sm={12} md={12} lg={6} xl={6} >
                                <div className="mt-3">
                              <MdLocationOn style={styles.icon} className="mr-3"/> <span style={styles.text}><b>Location</b></span>
                              </div>
                             <p className="ml-5">Jos, Plateau</p>
                            </Col>
                            <Col xm={12} sm={12} md={12} lg={6} xl={6} >
                                <div className="mt-3">
                              <GiReceiveMoney style={styles.icon} className="mr-3"/> <span style={styles.text}><b>Price</b></span>
                              </div>
                             <p className="ml-5 ">$300</p>
                            </Col>
                            <Col xm={12} sm={12} md={12} lg={6} xl={6} >
                                <div className="mt-3">
                              <IoIosTime style={styles.icon} className="mr-3"/> <span style={styles.text}><b>Posted</b></span>
                              </div>
                             <p className="ml-5">2 months ago</p>
                            </Col>
                            <Col xm={12} sm={12} md={12} lg={6} xl={6} >
                                <div className="mt-3">
                              <AiFillPhone style={styles.icon} className="mr-3"/> <span style={styles.text}><b>Phone Number</b></span>
                              </div>
                             <p className="ml-5 ">09033275449</p>
                            </Col>
                            <Col xm={12} sm={12} md={12} lg={6} xl={6} >
                                <div className="mt-3">
                              <AiFillEye style={styles.icon} className="mr-3"/> <span style={styles.text}><b>Ad Views</b></span>
                              </div>
                             <p className="ml-5">123</p>
                            </Col>
                            <Col xm={12} sm={12} md={12} lg={6} xl={6} >
                                <div className="mt-3">
                              <FaSlackHash style={styles.icon} className="mr-3"/> <span style={styles.text}><b>Ad ID</b></span>
                              </div>
                             <p className="ml-5 ">23</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Card className="border-0 mt-4">
                <Card.Header
						className="border-0"
						style={{ backgroundColor: "#76ba1b" }}>
						<b style={{ color: "white" }}>Ad Discription</b>
					</Card.Header>
                    <Card.Body>    
                     <Row>
                     <Col xm={12} sm={12} md={12} lg={6} xl={6} >
                     <span style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum cupiditate quos, illo dolorem rerum, magni repellendus eius commodi nemo aperiam ex. Accusamus eum esse qui at aperiam libero inventore modi!</span>
                         </Col>
                     </Row>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </div>
    )
}

const styles  = {
    icon: {
     color: "#ffa500",
     fontSize: "30px"
    },
    text: {
        fontSize: "15px"
    }
}