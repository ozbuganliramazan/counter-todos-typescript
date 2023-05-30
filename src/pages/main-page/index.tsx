import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function MainPage() {
  const [counter, setCount] = useState<number>(0);
  return (
    <>
      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">Main Page</h1>
      </div>
      <Row>
        <Col sm={4}>
          <Button onClick={()=>setCount(counter + 1) } variant="primary" className="w-100">+1</Button>
        </Col>
        <Col sm={4} className="text-center">
            <h1>{counter}</h1>
        </Col>
        <Col sm={4}>
          <Button onClick={()=>setCount(counter - 1)} variant="primary" className="w-100">-1</Button>
        </Col>
      </Row>
    </>
  );
}
