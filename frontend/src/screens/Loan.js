import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './loan.css'
// //  Child components
import Message from '../components/Message'
import LoanAmountForm from '../components/LoanAmountForm/LoanAmountForm'
import LoanDetails from '../components/LoanDetails/LoanDetails'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
//  Axios for AJAX calls
import Axios from 'axios'
//  Root component - Loan

const Loan = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  //check if user is logged in
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/login')
    } else {
      setName(userInfo.name)
      setEmail(userInfo.email)
      setPhoneNumber(userInfo.phoneNumber)
    }
  }, [props.history, userInfo])

  //  Values
  const [loanAmount, setLoanAmount] = useState(500)
  const [loanDuration, setLoanDuration] = useState(6)
  const [loanDetails, setLoanDetails] = useState()
  const [errorMessage, setErrorMessage] = useState(
    'Something went wrong. Please try again.'
  )
  const [cacheAmountList, setCacheAmountList] = useState(
    JSON.parse(localStorage.getItem('loan-amount-cache'))
  )
  const [address, setAddress] = useState('')
  const [success, setSuccess] = useState(false)
  //  Flags
  const [displayFlag, setDisplayFlag] = useState(0)

  //  Function to get details from cache or API
  const getLoanDetails = (loanAmount, loanDuration) => {
    if (loanAmount && loanDuration) {
      //  Pre loader
      setDisplayFlag(1)
      //  Check if details exist in cache, if yes display without calling API
      if (localStorage.getItem('loan-amount-cache')) {
        if (cacheAmountList[loanAmount + '-' + loanDuration]) {
          setLoanDetails(cacheAmountList[loanAmount + '-' + loanDuration].data)

          setDisplayFlag(2)
          return
        }
      }
      //  Call API for details
      let url =
        'https://ftl-frontend-test.herokuapp.com/interest?amount=' +
        loanAmount +
        '&numMonths=' +
        loanDuration
      Axios.get(url)
        .then((response) => {
          //  Check response for error, if error change displayFlag and display error
          if (response.data.status) {
            setErrorMessage('Invalid Request')
            setDisplayFlag(3)
          }
          //  If valid response, change displayFlag and display details
          else {
            //  Cache response
            let loanAmountCache = {}
            if (localStorage.getItem('loan-amount-cache')) {
              loanAmountCache = JSON.parse(
                localStorage.getItem('loan-amount-cache')
              )
            }
            loanAmountCache[loanAmount + '-' + loanDuration] = {
              amount: loanAmount,
              duration: loanDuration,
              data: response.data,
            }
            localStorage.setItem(
              'loan-amount-cache',
              JSON.stringify(loanAmountCache)
            )
            //  Set state to update sidebar
            setCacheAmountList(
              JSON.parse(localStorage.getItem('loan-amount-cache'))
            )
            //  Display details
            setLoanDetails(response.data)
            setDisplayFlag(2)
          }
        })
        .catch((error) => {
          //  If API fails, display error
          setErrorMessage(error.message)
          setDisplayFlag(3)
        })
    }
  }

  //  Change displayFlag to take user back to LoanAmountForm
  const displayForm = () => {
    setDisplayFlag(0)
  }

  const displayMessage = () => {
    setSuccess(true)
  }

  //  Render

  //  Variable to hold content as per displayFlag
  let displayContent = null
  //  For displayFlag - 0, Show LoanAmountForm component
  if (displayFlag === 0) {
    displayContent = (
      <LoanAmountForm
        getLoanDetails={getLoanDetails}
        changeName={(e) => setName(e.target.value)}
        changeEmail={(e) => setEmail(e.target.value)}
        changeNumber={(e) => setPhoneNumber(e.target.value)}
        changeAddress={(e) => setAddress(e.target.value)}
        changeLoanAmount={(e) => setLoanAmount(e.target.value)}
        changeLoanDuration={(e) => setLoanDuration(e.target.value)}
        name={name}
        email={email}
        phoneNumber={phoneNumber}
        address={address}
        loanAmount={loanAmount}
        loanDuration={loanDuration}
      ></LoanAmountForm>
    )
  }
  //  For displayFlag - 1, Show Preloader
  else if (displayFlag === 1) {
    displayContent = (
      <div>
        <div className='text-center mt-5'>
          <div className='spinner-border text-primary' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    )
  }
  //  For displayFlag - 2, Show LoanDetails component - Loan Details
  else if (displayFlag === 2) {
    displayContent = (
      <LoanDetails
        user={userInfo}
        name={name}
        email={email}
        phoneNumber={phoneNumber}
        address={address}
        loanDetails={loanDetails}
        displayForm={displayForm}
        displayMessage={displayMessage}
      ></LoanDetails>
    )
  }
  //  For displayFlag - 0, Show ErrorMessage component - Error
  else if (displayFlag === 3) {
    displayContent = (
      <ErrorMessage
        errorMessage={errorMessage}
        displayForm={displayForm}
      ></ErrorMessage>
    )
  }
  //  Return layout
  return (
    <div>
      {/* Message */}
      {success && (
        <Message variant='success'>Successfully applied for the Loan!</Message>
      )}
      {/* Main content */}
      <div className='content'>
        {/* LoanAmountForm / LoanDetails / ErrorMessage / PreLoader */}
        <div className='container-fluid'>{displayContent}</div>
      </div>
    </div>
  )
}
//  default export
export default Loan
