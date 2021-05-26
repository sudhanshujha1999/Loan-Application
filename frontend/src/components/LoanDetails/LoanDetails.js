import React from 'react'
import { Form } from 'react-bootstrap'

//  LoanDetails component to display details received from API
const LoanDetails = (props) => {
  const ApplyHandler = () => {
    let loansList = []
    if (localStorage.getItem('applied-loans')) {
      loansList = JSON.parse(localStorage.getItem('applied-loans'))
    }
    loansList.push({
      userId: props.user._id,
      name: props.name,
      email: props.email,
      phoneNumber: props.phoneNumber,
      address: props.address,
      principalAmount: props.loanDetails.principal.amount,
      interestRate: props.loanDetails.interestRate,
      monthlyPaymentAmount: props.loanDetails.monthlyPayment.amount,
      numPayments: props.loanDetails.numPayments,
    })
    localStorage.setItem('applied-loans', JSON.stringify(loansList))
    props.displayMessage()
    props.displayForm()
  }
  return (
    <div className='m-md-5'>
      <div className='max-width-form m-auto'>
        <h4>Your Details</h4>
        <Form style={{ padding: '20px' }}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={props.name}
              onChange={props.changeName}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={props.email}
              onChange={props.changeEmail}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='phoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Phone Number'
              value={props.phoneNumber}
              onChange={props.changeNumber}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='address'
              placeholder='Enter your Address'
              value={props.address}
              onChange={props.changeAddress}
              disabled
            ></Form.Control>
          </Form.Group>
        </Form>
        <h4>Loan Details</h4>
        {/* card-body */}
        <div className='card-body'>
          <div className='row'>
            {/* Principal Amount */}
            <div className='col-md-6 col-xs-12 mb-3'>
              <div className='card text-center'>
                <div className='card-body'>
                  <h4 className='font-weight-normal m-0'>Principal</h4>
                  <hr />
                  <h4 className='font-weight-normal'>
                    {props.loanDetails.principal.currency === 'USD'
                      ? '$'
                      : props.loanDetails.principal.currency}{' '}
                    {props.loanDetails.principal.amount}
                  </h4>
                </div>
              </div>
            </div>
            {/* Rate of interest */}
            <div className='col-md-6 col-xs-12 mb-3'>
              <div className='card text-center'>
                <div className='card-body'>
                  <h4 className='font-weight-normal'>Interest</h4>
                  <hr />
                  <h4 className='font-weight-normal'>
                    {props.loanDetails.interestRate}
                  </h4>
                </div>
              </div>
            </div>
            {/* Monthly installment amount */}
            <div className='col-md-6 col-xs-12 mb-3'>
              <div className='card text-center'>
                <div className='card-body'>
                  <h4 className='font-weight-normal'>Monthly Installment</h4>
                  <hr />
                  <h4 className='font-weight-normal'>
                    {props.loanDetails.principal.currency === 'USD'
                      ? '$'
                      : props.loanDetails.principal.currency}{' '}
                    {props.loanDetails.monthlyPayment.amount}
                  </h4>
                </div>
              </div>
            </div>
            {/* Number of payments */}
            <div className='col-md-6 col-xs-12 mb-3'>
              <div className='card text-center'>
                <div className='card-body'>
                  <h4 className='font-weight-normal'>No of Payments</h4>
                  <hr />
                  <h4 className='font-weight-normal'>
                    {props.loanDetails.numPayments}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Button to return to LoanAmountForm */}
          <div style={{ marginTop: '20px' }} className='row'>
            <div className='text-center col-md-6 col-xs-12 mb-3'>
              <button
                className='btn btn-primary pl-4 pr-4'
                onClick={props.displayForm}
              >
                <h5 className='font-weight-normal m-0'>Return To Form</h5>
              </button>
            </div>
            <div className='text-center col-md-6 col-xs-12 mb-3'>
              <button
                className='btn btn-primary pl-4 pr-4'
                onClick={ApplyHandler}
              >
                <h5 className='font-weight-normal m-0'>Apply Now</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
//  default export
export default LoanDetails
