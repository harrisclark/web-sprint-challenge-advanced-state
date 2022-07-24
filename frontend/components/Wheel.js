import React from 'react'
import { connect } from 'react-redux';
//import { useContext } from 'redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel(props) {
  const { wheel } = props;

  const handleClockWise = () => {
    if (wheel === 5) {
      props.moveClockwise(-5)
    } else {
      props.moveClockwise(1)
    }
  }

  const handleCounterWise = () => {
    if (wheel === 0) {
      props.moveCounterClockwise(-5)
    } else {
      props.moveCounterClockwise(1)
    }
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`cog${wheel===0?' active':''}`} style={{ "--i": 0 }}>{`${wheel===0?'B':''}`}</div>
        <div className={`cog${wheel===1?' active':''}`} style={{ "--i": 1 }}>{`${wheel===1?'B':''}`}</div>
        <div className={`cog${wheel===2?' active':''}`} style={{ "--i": 2 }}>{`${wheel===2?'B':''}`}</div>
        <div className={`cog${wheel===3?' active':''}`} style={{ "--i": 3 }}>{`${wheel===3?'B':''}`}</div>
        <div className={`cog${wheel===4?' active':''}`} style={{ "--i": 4 }}>{`${wheel===4?'B':''}`}</div>
        <div className={`cog${wheel===5?' active':''}`} style={{ "--i": 5 }}>{`${wheel===5?'B':''}`}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={handleCounterWise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={handleClockWise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

// const mapToProps = (state) => {
//   return {
//     wheel: state.wheel
//   }
// }


export default connect(st => st, {moveClockwise,moveCounterClockwise})(Wheel)
