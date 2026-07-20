import { Col, Row } from 'react-bootstrap'

export default function CheckoutSteps(props: {
  step1?: boolean
  step2?: boolean
  step3?: boolean
  step4?: boolean
}) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Login</Col>
      <Col className={props.step2 ? 'active' : ''}>Datos de envío </Col>
      <Col className={props.step3 ? 'active' : ''}>Pagos</Col>
      <Col className={props.step4 ? 'active' : ''}>Orden</Col>
    </Row>
  )
}
