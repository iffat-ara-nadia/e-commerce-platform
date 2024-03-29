import React from 'react'
import { Helmet } from 'react-helmet' // Helmet is used to create customized page

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
      
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to Proshop",
    description: "we sell the best products for cheap",
    keywords: "electronics, buy electronics, cheap electronics"
}

export default Meta
