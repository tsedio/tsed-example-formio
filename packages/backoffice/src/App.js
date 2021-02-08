import { Button, Loader } from '@project/shared'
import React from 'react'

function App () {
  return (
    <div className="App">
      <main className="container content__default">
        APP

        <div>
          <Button>Click</Button>
        </div>
        <Loader/>
      </main>
    </div>
  )
}

export default App
