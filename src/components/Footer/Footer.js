import React from 'react'

const Footer = (props) => {
  const {isAdminPage} = props;
  return (
    <footer className={`${isAdminPage?'display-none':''}`}>
        <h5>
          2023 <span>comfySloth</span>
        </h5>
        <h5>
          ALL rights reserved
        </h5>
      </footer>
  )
}

export default Footer