import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Image from 'next/image'
import Link from 'next/link'



export default function Home({ token }) {

  return (
    <Layout>
      <Navbar />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>6035512077</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
      />
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        {/*Main Col*/}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* Image for mobile view*/}
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://source.unsplash.com/MP0IUfwrn0A")'
              }}
            />
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">เว็บบันทึกน้องแมว</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
            <p className="pt-8 text-sm">
              เว็บนี้จัดทำขึ้นเพื่อในการบันทึกน้องแมวโดยสามารถกรอกรูปและรายละเอียดต่างๆพร้อมกับแสดงน้องแมวเหล่านั้นออกมา อย่างตะมุตะมิ
            </p>
            <div className="pt-12 pb-8">
              <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full">
              <Link href="/register"><a> Go To Register </a></Link>
              </button>
            </div>
            
            {/* Use https://simpleicons.org/ to find the svg for your preferred product */}
          </div>
        </div>
        {/*Img Col*/}
        <div className="w-full lg:w-2/5">
          {/* Big profile image for side bar (desktop) */}
          <img
            src="https://i.pinimg.com/564x/5e/21/b5/5e21b5fa45cc04f8fd35537496ebe6d0.jpg"
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
          {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
        </div>
        {/* Pin to top right corner */}
        <div className="absolute top-0 right-0 h-12 w-18 p-4">
          <button className="js-change-theme focus:outline-none">🌙</button>
        </div>
      </div>
      <footer class=" flex justify-center mt-4 bg-gradient-to-r from-blue-700 to-blue-300 p-5">
        <p class="text-indigo-100 text-1xl">
          Create by Purinut Tanparmwong 6035512077
        </p>
      </footer>
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}