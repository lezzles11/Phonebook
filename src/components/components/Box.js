import React from "react"

const Heading = ({ heading }) => {
    return (
      <div>
        <h2>{heading}</h2> 
      </div>
    )
  }
  
  const Paragraph = ({ paragraph }) => {
    return (
      <div> 
        <p>{paragraph}</p> 
      </div> 
    )
  }

  const PersonInput = ({ personInput }) => {
      const 
  }

  const Box = ({ heading, paragraph }) => {
      return (
          <div>
              <Heading heading={heading}/>
              <Paragraph paragraph={paragraph}/>
          </div> 
      )
  }
  export default Box