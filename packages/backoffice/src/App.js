import { Button, Loader, oneOfIsActive } from '@project/shared'
import React from 'react'
import { useSelector } from 'react-redux'

function App () {
  const isActive = useSelector(oneOfIsActive('auth', 'loader'))

  return (
    <div className="App">
      <main className="container content__default">
        APP

        <div>
          <Button>Click</Button>
        </div>
        <Loader isActive={isActive}/>
      </main>
    </div>
  )
}

export default App
