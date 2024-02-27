import React from 'react'

const SlugPage = ({params}, context) => {
    console.log(params, context)
    const url = params.slug
    const con = context
  return (
    
    <div>{`${url}, ${con}`} hello</div>
  )
}

export default SlugPage