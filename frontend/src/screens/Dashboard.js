import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import Message from '../components/Message'

const CartScreen = (props) => {
  const [loanDetails, setLoanDetails] = useState('')
  //check if user is logged in
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/login')
    }
  }, [props.history, userInfo])

  const allLoansFromStorage = localStorage.getItem('applied-loans')
    ? JSON.parse(localStorage.getItem('applied-loans'))
    : []
  const loansList = allLoansFromStorage.filter(
    (loan) => loan.userId === userInfo._id
  )

  const showLoanDetails = (loan) => {
    setLoanDetails(
      <Card>
        <ListGroup variant='flush'>
          <Row>
            <Col md={6}>
              <ListGroup.Item>Name</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.name}</ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup.Item>Email</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.email}</ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup.Item>Phone Number</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.phoneNumber}</ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup.Item>Address</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.address}</ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup.Item>Principal Amount</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.principalAmount}</ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup.Item>Interest Rate</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.interestRate}</ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup.Item>Monthly Payment Amount</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.monthlyPaymentAmount}</ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup.Item>No. of Payments</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>{loan.numPayments}</ListGroup.Item>
            </Col>
          </Row>
        </ListGroup>
      </Card>
    )
  }

  return (
    <div>
      <h1 style={{ marginLeft: '5%', marginTop: '30px', marginBottom: '30px' }}>
        Loans Applied
      </h1>
      {loansList.length === 0 ? (
        <Message>
          You have not applied for any Loans yet! <Link to='/'>Apply now?</Link>
        </Message>
      ) : (
        <Row style={{ margin: '10px' }}>
          <Col md={8} style={{ marginTop: '50px' }}>
            <Row style={{ padding: '12px 20px' }}>
              <Col className='text-center' md={2}>
                <h4>Sl.No.</h4>
              </Col>
              <Col className='text-center' md={3}>
                <h4>Principal Amount</h4>
              </Col>
              <Col className='text-center' md={3}>
                <h4>Monthly Installment</h4>
              </Col>
              <Col className='text-center' md={2}>
                <h4>No. of Payments</h4>
              </Col>
              <Col className='text-center' md={2}>
                <h4>ROI</h4>
              </Col>
            </Row>
            <hr />
            <ListGroup variant='flush'>
              {loansList.map((loan, index) => (
                <ListGroup.Item key={index}>
                  <Row
                    onClick={() => showLoanDetails(loan)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Col className='text-center' md={2}>
                      {index + 1}.
                    </Col>
                    <Col className='text-center' md={3}>
                      {loan.principalAmount} $
                    </Col>
                    <Col className='text-center' md={3}>
                      {loan.monthlyPaymentAmount} $
                    </Col>
                    <Col className='text-center' md={2}>
                      {loan.numPayments}
                    </Col>
                    <Col className='text-center' md={2}>
                      {loan.interestRate} %
                    </Col>
                  </Row>
                  <hr />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>{loanDetails}</Col>
        </Row>
      )}
    </div>
  )
}

export default CartScreen
