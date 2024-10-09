import React, {useCallback, useEffect, useState} from 'react'
import '../css/Timer.css'
import Input from '../component/Input'
import Button from '../component/Button'

function Timer() {
  const [timeOut, setTimeOut] = useState(true)
  const [startView, setStartView] = useState(true)
  const [stopBool, setStopBool] = useState(true)

  const [second, setSecond] = useState(0)
  const [minuts, setMinuts] = useState(0)
  const [hour, setHour] = useState(0)

  const [recodeSecond, setRecodeSecond] = useState(0)
  const [recodeMinute, setRecodeMinure] = useState(0)
  const [recodeHour, setRecodeHour] = useState(0)

  const [secondInput, setSecondInput] = useState()
  const [minutsInput, setMinutsInput] = useState()
  const [hourInput, setHourInput] = useState()

  const changeSecond = event => {
    setSecondInput(parseInt(event.target.value))
  }
  const changeMinuts = event => {
    setMinutsInput(parseInt(event.target.value))
  }
  const changeHour = event => {
    setHourInput(parseInt(event.target.value))
  }

  const reduceSecond = () => setSecond(second => Math.max(second - 1, 0))
  const reduceMinuts = () => setMinuts(minuts => Math.max(minuts - 1, 0))
  const reduceHour = () => setHour(hour => Math.max(hour - 1), 0)

  const secondTimer = String(second).padStart(2, 0)
  const minutsTimer = String(minuts).padStart(2, 0)
  const hourTimer = String(hour).padStart(2, 0)

  const resetInput = () => {
    setSecondInput()
    setMinutsInput()
    setHourInput()
  }

  const timeSecondDelay = useCallback(() => {
    setTimeout(() => {
      reduceMinuts()
      setSecond(59)
    }, 1000)
  }, [])
  const timeMinutesDelay = useCallback(() => {
    setTimeout(() => {
      reduceHour()
      setMinuts(59)
    }, 1000)
  }, [])

  const timerStart = () => {
    if (
      secondInput === undefined ||
      minutsInput === undefined ||
      hourInput === undefined
    ) {
      alert('시/분/초를 입력해주세요.')
      resetInput()
    } else if (secondInput > 59 || minutsInput > 59 || hourInput > 59) {
      alert('최대 59까지 입력 가능합니다.')
      resetInput()
    } else if (secondInput < 0 || minutsInput < 0 || hourInput < 0) {
      alert('최소 0까지 입력 가능합니다.')
      resetInput()
    } else {
      setTimeOut(true)
      setSecond(secondInput)
      setMinuts(minutsInput)
      setHour(hourInput)
      setRecodeSecond(secondInput)
      setRecodeMinure(minutsInput)
      setRecodeHour(hourInput)
    }
  }
  const timeStop = () => {
    setStopBool(stopBool => !stopBool)
  }
  const timeReset = () => {
    setStopBool(true)
    setTimeOut(false)
    setStartView(true)
    resetInput()
  }

  useEffect(() => {
    let reduce
    if (stopBool === true) {
      reduce = setInterval(reduceSecond, 1000)
      return () => clearInterval(reduce)
    } else {
      return () => clearInterval(reduce)
    }
  })

  useEffect(() => {
    if (second === 0) {
      timeSecondDelay()
      if (minuts === 0) {
        timeMinutesDelay()
        if (hour === 0) {
          setTimeOut(false)
          setStartView(false)
          resetInput()
        }
      }
    }
  }, [second, minuts, hour, timeSecondDelay, timeMinutesDelay])

  useEffect(() => {
    setStartView(true)
  }, [])

  return (
    <div className="timerDiv">
      {timeOut ? (
        <div className="timerTrueDiv">
          <h1>{`${hourTimer} : ${minutsTimer} : ${secondTimer}`}</h1>
          <div className="timerControlButton">
            <Button
              className={'timerStopButton'}
              name={stopBool ? 'STOP' : 'RESTART'}
              onClick={timeStop}
            />
            <Button className={'timerResetButton'} name={'RESET'} onClick={timeReset} />
          </div>
        </div>
      ) : (
        <div className="timerFalseDiv">
          <div>{startView ? <h1>00 : 00 : 00</h1> : <h1>TIME OUT!!!</h1>}</div>
          <div>
            {!startView && (
              <p>Recode - {`${recodeHour}h : ${recodeMinute}m : ${recodeSecond}s`}</p>
            )}
          </div>
          <div>
            <div className="timerInputDiv">
              <Input
                className={'timerHourInput'}
                type={'number'}
                value={hourInput || ''}
                placeholder={'00(시)'}
                onChange={changeHour}
              />
              <Input
                className={'timerMinutsInput'}
                type={'number'}
                value={minutsInput || ''}
                placeholder={'00(분)'}
                onChange={changeMinuts}
              />
              <Input
                className={'timerSecondInput'}
                value={secondInput || ''}
                type={'number'}
                placeholder={'00(초)'}
                onChange={changeSecond}
              />
            </div>
            <div>
              <Button
                className={'timerStartButton'}
                name={'START'}
                onClick={timerStart}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Timer
