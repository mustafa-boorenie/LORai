import React from 'react'

function ResponseView(props) {
  return (
    <>
    {props.map((item) => {
      <div key={item.id}>
        <h2>Score {item.score}</h2>
          <p>{item.firstPositive}</p>
          <p>{item.firstNegative}</p>
          <p>{item.finalPositive}</p>
          <h2>Goal</h2>
          <p>{item.goals}</p>

      </div>

    })}

    </>
  )
}

export default ResponseView