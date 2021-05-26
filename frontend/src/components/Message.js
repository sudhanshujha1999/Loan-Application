import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true)
  setTimeout(() => setShow(false), 5000)
  if (show) {
    return (
      <Alert style={{ alignSelf: 'center' }} variant={variant}>
        {children}
      </Alert>
    )
  } else {
    return <Alert style={{ display: 'none' }} variant={variant}></Alert>
  }
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
