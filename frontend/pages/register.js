import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'
import { useRouter } from "next/router";
import Swal from 'sweetalert2'


export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const router = useRouter();



    const register = async () => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            /*console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)*/
            Swal.fire(
                'Register-Success',
                'Please Login!',
                'success'
            )
        }
        catch (e) {
            console.log(e)
        }
        await router.push('/login')
    }

    const registerForm = () => (
        <div>

            <div>
                Username :
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Email :&nbsp;&nbsp;
            </div>
            <div>
                <input type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                Password :&nbsp;&nbsp;
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title >Register</title>


                <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
            </Head>
            <div class="bg-blue-200 sm:h-screen ">
                <Navbar />
                <div class="py-20">
                    <div class="py-20">
                        <div class="py-20">
                            <div class="py-18">
                                <div class=" justify-center bg-gradient-to-r from-blue-700 to-blue-300 p-9 grid grid-row-3 gap-3 pt-10 ">
                                    <h1 class="pt-6 text-3xl text-black flex flex-col justify-around  items-center font-bold">Register</h1>
                                    {registerForm()}
                                    <div class="flex justify-center ">
                                        <button onClick={register} class="shadow-md mr-4 bg-blue-400 p-2 rounded-lg hover:bg-green-400 hover:text-black font-bold">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export function getServerSideProps({ req }) {
    return { props: { token: req.cookies.token || "" } };
}