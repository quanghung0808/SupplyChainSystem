import React, { Suspense } from 'react'
import './App.css'
import mqtt, { IClientOptions } from 'mqtt'

import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/router'
import { useAppDispatch } from './redux/configStore'
import { setForecast } from './redux/forecast/forecastSlice'

const options: IClientOptions = {
  clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
  clean: true,
  keepalive: 1000
}
const url = `ws://localhost:9001/mqtt`

const client = mqtt.connect(url, options)
client.subscribe('prediction/end')
console.log('Client subscribed ')

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  client.on('message', function (topic, message) {
    const data = JSON.parse(message.toString())
    dispatch(setForecast(data))
  })
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
