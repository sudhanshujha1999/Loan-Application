import React from 'react'
import { Form, Button } from 'react-bootstrap'

//  LoanAmountForm component to enter loan amount and duration to get details
const LoanAmountForm = (props) => {
  return (
    <div className='mt-5'>
      <div className='m-auto max-width-form'>
        <h4>Loan Details</h4>
        {/* card */}
        <div style={{ margin: '20px' }} className='card mb-3 bg-light'>
          <div className='card-body'>
            {/* Enter loan amount */}
            <div className='form-group'>
              <label htmlFor='amountRange' className='m-0'>
                <h4 className='font-weight-normal m-0'>Loan Amount :</h4>
              </label>
              <div className='font-weight-light text-md-left text-center'>
                ( Use slider to select an amount between $500 and $5000 )
              </div>
              <div className='d-flex align-items-center mt-2'>
                {/* slider */}
                <div className='w-75'>
                  <input
                    type='range'
                    min={500}
                    max={5000}
                    className='form-control-range'
                    id='amountRange'
                    onChange={props.changeLoanAmount}
                    value={props.loanAmount}
                  />
                </div>
                {/* input read-only */}
                <div className='w-25 pl-2'>
                  <input
                    type='text'
                    className='form-control-range font-size-large'
                    id='amountValue'
                    value={props.loanAmount}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* card */}
        <div style={{ margin: '20px' }} className='card mb-3 bg-light'>
          <div className='card-body'>
            {/* Select loan duration */}
            <div className='form-group'>
              <label htmlFor='durationSelect' className='m-0'>
                <h4 className='font-weight-normal m-0'>Loan Duration :</h4>
              </label>
              <div className='font-weight-light text-md-left text-center'>
                ( Select number of months between 6 to 24 )
              </div>
              {/* select for duration */}
              <div className='mt-3'>
                <select
                  className='form-control font-size-large'
                  id='durationSelect'
                  onChange={props.changeLoanDuration}
                  value={props.loanDuration}
                >
                  <option value='6'>6 months</option>
                  <option value='7'>7 months</option>
                  <option value='8'>8 months</option>
                  <option value='9'>9 months</option>
                  <option value='10'>10 months</option>
                  <option value='11'>11 months</option>
                  <option value='12'>12 months</option>
                  <option value='13'>13 months</option>
                  <option value='14'>14 months</option>
                  <option value='15'>15 months</option>
                  <option value='16'>16 months</option>
                  <option value='17'>17 months</option>
                  <option value='18'>18 months</option>
                  <option value='19'>19 months</option>
                  <option value='20'>20 months</option>
                  <option value='21'>21 months</option>
                  <option value='22'>22 months</option>
                  <option value='23'>23 months</option>
                  <option value='24'>24 months</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <h4>Your Details</h4>
        <Form
          style={{ margin: '20px' }}
          onSubmit={props.getLoanDetails.bind(
            this,
            props.loanAmount,
            props.loanDuration
          )}
        >
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={props.name}
              onChange={props.changeName}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={props.email}
              onChange={props.changeEmail}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='phoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Phone Number'
              value={props.phoneNumber}
              onChange={props.changeNumber}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='address'
              placeholder='Enter your Address'
              value={props.address}
              onChange={props.changeAddress}
              required
            ></Form.Control>
          </Form.Group>
          <div className='text-center'>
            <Button type='submit' variant='primary'>
              SUBMIT
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
//  default export
export default LoanAmountForm
