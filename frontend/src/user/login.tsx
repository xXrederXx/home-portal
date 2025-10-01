import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginUser } from '../util/api'
import { SaveUserId } from '../util/localStorage'

export default function Login() {
    const [name, setName] = useState("")
    const [passwd, setPasswd] = useState("")
    const [error, setError] = useState("")

    async function OnLogin() {
        const res = await LoginUser(name, passwd)
        setError(res.error)
        if (res.error === "") {
            SaveUserId(res.userId)
        }
    }

    return (
        <div className='fill-view flex items-center justify-center'>
            <div id="Container" className='flex flex-col bg-bg-100 p-8 rounded-xl h-5/6 w-1/2 min-w-80 max-w-4xl'>
                <h1 className='pb-2 font-bold text-center text-3xl'>Welcome Back!</h1>
                <p className="text-center pb-16">Login to your Account</p>
                <form className='flex flex-col pb-16'>
                    <label htmlFor="nameInp">Name</label>
                    <input type="text" title='nameInp' className='mb-2' onChange={e => setName(e.target.value)} />

                    <label htmlFor="passInp">Password</label>
                    <input type="password" title='passInp' className='mb-8' onChange={e => setPasswd(e.target.value)} />

                    {error === "" ? null : <p className='text-center text-red-500 py-4'>{error}</p>}

                    <input type="button" value="Login" className="bg-seco-400 rounded-lg h-12 text-xl" onClick={OnLogin} />
                </form>
                <p className="text-center pb-16">Don't have an Account? <Link to={"/signup"} className='text-acce-800 underline'>Sign Up</Link></p>
            </div>
        </div>
    )
}
