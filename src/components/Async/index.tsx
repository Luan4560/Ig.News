import { useEffect, useState } from "react"

export function Async() {
  const [isButtonVisible, setUseIsButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUseIsButtonVisible(true)
    }, 1000)
  }, [])

  return (
    <div>
      <div>Hello World</div>
      {isButtonVisible && <button>Button</button>}
    </div>
  )
}
