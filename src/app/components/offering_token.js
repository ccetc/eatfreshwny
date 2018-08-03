import Image from './image'
import React from 'react'

const OfferingToken = ({ photo, title }) => (
  <div className="offering-token">
    <div className="offering-token-photo">
      <Image src={ photo } title={ title } transforms={{ fit: 'cover', w: 32, h: 32 }} />
    </div>
    <div className="offering-token-title">
      { title }
    </div>
  </div>
)

export default OfferingToken
