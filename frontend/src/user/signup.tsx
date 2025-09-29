import { useState } from 'react'
import '../root.css'

export default function Signup() {
  const [name, setName] = useState("")
  const [passwd, setPasswd] = useState("")

  async function OnCreate() {
    const data = { username: name, passwd: passwd }
    const res = await fetch("http://localhost:8000/api/createUser", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    console.log(await res.json());
  }

  return (
    <div>
      <div id="Container">
        <h3>Please Enter your Information</h3>
        <form>
          <label htmlFor="nameInp">Name</label>
          <input type="text" title='nameInp' id="nameInp" onChange={e => setName(e.target.value)} />

          <label htmlFor="passInp">Password</label>
          <input type="text" title='passInp' id="passInp" onChange={e => setPasswd(e.target.value)} />

          <input type="button" value="Create Account" onClick={OnCreate} />
        </form>
      </div>
    </div>
  )
}
