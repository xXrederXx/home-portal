import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreateUser } from '../util/api'
import { SaveUserId } from '../util/localStorage'

export default function Signup() {
  const [name, setName] = useState("")
  const [passwd, setPasswd] = useState("")
  const [passwdRep, setPasswdRep] = useState("")
  const [error, setError] = useState("")

  async function OnCreate() {
    const res = await CreateUser(name, passwd, passwdRep);
    setError(res.error)
    if (res.error !== "") {
      SaveUserId(res.userId)
    }
  }

  return (
    <div className='fill-view flex items-center justify-center'>
      <div id="Container" className='flex flex-col bg-bg-100 p-8 rounded-xl h-5/6 w-1/2 min-w-80 max-w-4xl'>
        <h1 className='pb-2 font-bold text-center text-3xl'>Sign Up</h1>
        <p className="text-center pb-16">Create your Account</p>
        <form className='flex flex-col pb-16'>
          <label htmlFor="nameInp">Name</label>
          <input type="text" title='nameInp' className='mb-8' onChange={e => setName(e.target.value)} />

          <label htmlFor="passInp">Password</label>
          <input type="password" title='passInp' className='mb-4' onChange={e => setPasswd(e.target.value)} />

          <label htmlFor="passRepInp">Repeat Password</label>
          <input type="password" title='passRepInp' className='mb-8' onChange={e => setPasswdRep(e.target.value)} />

          {error === "" ? null : <p className='text-center text-red-500 py-4'>{error}</p>}

          <input type="button" value="Create Account" className="bg-seco-400 rounded-lg h-12 text-xl" onClick={OnCreate} />
        </form>
        <p className="text-center pb-16">Already have an Account? <Link to={"/login"} className='text-acce-800 underline'>Login</Link></p>
      </div>
    </div>
  )
}
