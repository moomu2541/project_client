import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";
import Swal from 'sweetalert2'



const URL = "http://localhost/api/products";
const URL2 = "http://localhost/api/income";
const URL3 = "http://localhost/api/reproducts";
const URL4 = "http://localhost/api/addproduct";


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [products, setproducts] = useState({})
    const [product, setproduct] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [price, setPrice] = useState(0)
    const [imageurl, setImageurl] = useState('')
    const [income, setIncome] = useState(0)


    useEffect(() => {
        getproducts();
        getIncome();
        profileUser();
    }, []);

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log('user: ', users.data)
            setUser(users.data);
        } catch (e) {
            console.log(e);
        }
    };

    const getproducts = async () => {
        let products = await axios.get(URL)
        setproducts(products.data)
        //console.log('product:', products.data)
    }
    const getIncome = async () => {
        let income = await axios.get(URL2)
        setIncome(income.data)
        //console.log('income:', income.data)
    }

    const getproduct = async (id) => {
        let product = await axios.get(`${URL}/${id}`)
        console.log('bear id: ', product.data)
        setproduct({ id: product.data.id, name: product.data.name, number: product.data.number, price: product.data.price, imageurl: product.data.imageurl })
    }



    const printproducts = () => {
        if (products && products.length)
            return products.map((product, index) =>
                <div >
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>

                    <li key={index} class=" rounded-lg outline outline-offset-1 outline-blue-500 "><link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap " rel="stylesheet"></link>

                        <h6 class="text-1xl text-black-500 pb-1 pt-1 not-italic font-bold flex justify-center">{(product) ? product.name : '-'}</h6>
                        <img src={(product.imageurl)} width="200" height="100" class="items-center justify-around"></img>
                        <h6 class="font-bold">Weight :{(product) ? product.number : 0}</h6>
                        <h6 class="font-bold"> Price : &nbsp;{(product) ? product.price : 0}</h6>
                        <div class="pl-3 flex justify-center pb-3">
                            <button onClick={() => deleteproduct(product.id)} class="shadow-md mr-4 bg-red-500 p-2 rounded-lg hover:bg-red-200 hover:text-red-500 " >Delete</button>

                            <button onClick={() => updateproduct(product.id)} class="shadow-md mr-4 bg-green-500 p-2 rounded-lg hover:bg-green-200 hover:text-blue-500">Update</button>
                        </div>
                    </li>

                </div>
            )
        else
            return <li> No product</li>
    }

    const printIncome = () => {
        return income
    }


    const addproduct = async (name, number, price, imageurl) => {
        let products = await axios.post(URL, { name, number, price, imageurl })
        Swal.fire({
            title: 'Product added!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        setproducts(products.data)
    }




    const deleteproduct = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getproducts()
    }

    const updateproduct = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, name, number, price, imageurl })

        getproducts()
    }

    const reduce = async (id, number) => {
        if (number > 0) {
            let num = number - 1
            setproducts(num)
            console.log('number=' + num)
            const result = await axios.put(`${URL3}/${id}`, { id, num })
        }
        getproducts()
    }

    const addNumber = async (id, number) => {
        const result = await axios.put(`${URL4}/${id}`, { id, number })
        console.log(number)
        getproducts()
    }



    return (
        <div class="bg-blue-200 sm:h-screen ">
            <Navbar />
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>

            <div >

                <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
                <div class="flex flex-col justify-around  items-center space-y-1 pb-14">
                    <h1 class="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-lime-500 pb-8 pt-5 font-bold">Add Cat And Details</h1>
                    <ul class=" grid grid-row-8 gap-0">
                        &nbsp;Name :&nbsp;<input type="text" onChange={(e) => setName(e.target.value)} />
                        &nbsp;Weight :&nbsp;<input type="number" onChange={(e) => setNumber(e.target.value)} />
                        &nbsp;Price :&nbsp;<input type="text" onChange={(e) => setPrice(e.target.value)} />
                        &nbsp;Image (url) :&nbsp;<input type="Linkd" onChange={(e) => setImageurl(e.target.value)} />
                        <div class="pt-6"></div>
                        <button onClick={() => addproduct(name, number, price, imageurl)} class="shadow-md mr-4 bg-blue-400 p-2 rounded-lg hover:bg-green-400 hover:text-black font-bold">Accept</button>
                    </ul>
                    <ul class=" grid grid-cols-8 gap-10  pt-10">{printproducts()}</ul>

                    <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap " rel="stylesheet" ></link>

                </div>

            </div>

        </div>
    )
}

export default withAuth(SWR1);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}