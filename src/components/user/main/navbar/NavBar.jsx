import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { TfiMenuAlt } from "react-icons/tfi";
import { FaRegWindowClose } from "react-icons/fa";
import { contextApi } from '../../../context/Context';


const NavBar = () => {
    const [show,setShow]=useState(false)
    const [showModel,setShowModel]=useState(false)
    const {setGlobalState}=useContext(contextApi)

    const handelShow=()=>{
        setShow(!show)
    }
    // console.log(show);
    
    const hadelshowModel=()=>{
        setShowModel(!showModel)
    }
    // console.log(showModel);
    const handelLogout=()=>{
    setGlobalState((preVal)=>({...preVal,token:null}))
    }
    
  return (
    <div className={`w-full h-[80px] bg-black text-amber-50 flex justify-around items-center text-xl max-sm:justify-start max-sm:px-8 ${show?'h-[210px] flex flex-col justify-around gap-2.5 items-start py-2.5':""} sm:flex-row sm:h-[80px] sm:justify-around sm:items-center`}>
        <div className='hidden max-sm:flex'>

            {
                show?<FaRegWindowClose onClick={handelShow}/>: <TfiMenuAlt onClick={handelShow}/>
            }
           
        </div>

        <div className={`max-sm:hidden${show?'block':""}`}>
            <NavLink to="/home" className={({isActive})=>isActive?"bg-amber-50 text-black p-2 rounded-sm":""} end>Home</NavLink>
        </div>
        <div className={`max-sm:hidden${show?'block':""}`}>
            <NavLink  to="addBills" className={({isActive})=>isActive?"bg-amber-50 text-black p-2 rounded-sm":""}>Add Bills</NavLink>
        </div>
        <div className={`max-sm:hidden${show?'block':""}`}>
            <NavLink to="filter" className={({isActive})=>isActive?"bg-amber-50 text-black p-2 rounded-sm":""}>Filter Bills</NavLink>
        </div>
        <div className={`max-sm:hidden${show?'block':""}`}>
            <NavLink to="about" className={({isActive})=>isActive?"bg-amber-50 text-black p-2 rounded-sm":""}>About</NavLink>
        </div>

        <div className={`max-sm:hidden${show?'block':""}`}>
            <button className='size-full bg-red-500 p-3 rounded-xl flex justify-center items-center active:scale-[0.8] ease-in-out duration-500 hover:bg-red-700' onClick={hadelshowModel}>Logout</button>
        </div>
  

        {
            showModel&&<div className='h-[100vh] w-[100vw] bg-black/10 fixed backdrop-blur-sm left-0 top-0'>
               <div className='size-full flex justify-center items-center'>
                 <div className='size-1/2 bg-tra flex justify-center items-center flex-col gap-20 rounded-2xl border-8 border-double border-red-600 backdrop-blur-sm' >
                    <h1 className='text-black text-3xl font-bold'>Do you want to Logout?</h1>
                    <div className='flex gap-10'>
                        <button className='bg-red-700 py-3 px-6 rounded-xl' onClick={handelLogout}>Yes</button>
                        <button className='bg-lime-300 py-3 px-6 rounded-xl' onClick={hadelshowModel}>No</button>
                    </div>
                </div>
               </div>
            </div>
        }

    </div>
  )
}

export default NavBar