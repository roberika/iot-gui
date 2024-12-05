import { useState } from 'react'
import './App.css'

function Records() {

  return (
    <div className='records'>
    <p className='content-title'>
        Measurement Records
    </p>
    <div className='flex flex-row'>
        <div>
            <div className='card card-background'>
                <p>DHT Left</p>
            </div>
            <div className='card card-background'>
                <div className='flex flex-row'>
                  <p>One</p>
                  <p>One</p>
                </div>
                <p>Create React App does not support custom PostCSS configurations and is incompatible with many important tools in the PostCSS ecosystem, like `postcss-import`. We highly recommend using Vite, Parcel, Next.js, or Remix instead of Create React App. They provide an equivalent or better developer experience but with more flexibility, giving you more control over how Tailwind and PostCSS are configured.</p>
            </div>
        </div>
        <div>
            <div className='card card-background'>
                <p>DHT Right</p>
            </div>
            <div className='card card-background'>
                <div className='flex flex-row'>
                  <p>One</p>
                  <p>One</p>
                </div>
                <p>Create React App does not support custom PostCSS configurations and is incompatible with many important tools in the PostCSS ecosystem, like `postcss-import`. We highly recommend using Vite, Parcel, Next.js, or Remix instead of Create React App. They provide an equivalent or better developer experience but with more flexibility, giving you more control over how Tailwind and PostCSS are configured.</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Records
