import Image from './image'
import React from 'react'

const CategoryToken = ({ photo, title }) => (
  <div className="category-token">
    <div className="category-token-photo">
      <Image src={ photo } title={ title } transforms={{ fit: 'cover', w: 32, h: 32 }} />
    </div>
    <div className="category-token-title">
      { title }
    </div>
  </div>
)

export default CategoryToken
