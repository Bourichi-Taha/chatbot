import React from 'react'
import "../assets/css/welcome.css"
const Welcome = () => {
  const dataCol = [
    "Titre", "Author", "Rating", "Category", "Status"
  ]
  const dataRow = [ [
    "Scaling Lean: Mastering the Key Metrics for Startup Growth","Ash Maurya","5.0","Design & UX","<button><div>Take Book</div></button>"
  ], [
    "Scaling Lean: Mastering the Key Metrics for Startup Growth","Ash Maurya","5.0","Design & UX","<button><div>Take Book</div></button>"
  ], [
    "Scaling Lean: Mastering the Key Metrics for Startup Growth","Ash Maurya","5.0","Design & UX","<button><div>Take Book</div></button>"
  ], [
    "Scaling Lean: Mastering the Key Metrics for Startup Growth","Ash Maurya","5.0","Design & UX","<button><div>Take Book</div></button>"
  ], [
    "Scaling Lean: Mastering the Key Metrics for Startup Growth","Ash Maurya","5.0","Design & UX","<button><div>Take Book</div></button>"
  ]]
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <table>
        <thead>
          <tr>
            {
              dataCol.map((c, ind) => {
                return (
                  <th key={ind}>{c}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            dataRow.map((arr,index)=>{
              return (
                <tr key={index}>
                  {
                    arr.map((item,index2)=>{
                      if (item.startsWith("<")) {
                        return(
                          <td key={index2} dangerouslySetInnerHTML={{ __html: item }}/>
                        )
                      }
                      return(
                        <td key={index2}>{item}</td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Welcome