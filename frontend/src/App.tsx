import { useEffect, useState } from 'react'

function App() {
  useEffect(() => {
    // Set default theme on load
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <h1>Hello World</h1>
  )
}

export default App
