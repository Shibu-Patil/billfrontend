import React, { useContext, useState } from 'react'
import empServices from '../../../../service/empServices'
import { contextApi } from '../../../context/Context'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const FilterBills = () => {
  const [showCompanyNames,setShowCompanyName]=useState(false)
  const [conpanyName,setComoantNames]=useState([])
  const {globalState}=useContext(contextApi)
  const navigate=useNavigate()
  const [queries,setQueries]=useState({
  PoNo:"",
  fromWorkCompletionDate:"",
  toWorkCompletionDate:"",
  fromInvoicedate:"",
  toInvoiceDate:"",
  companies:[]
  })
  const handleChnage=(e)=>{
    const {name,value,checked}=e.target
    if(name=="companies"){
     checked?setQueries((preVal)=>({...preVal,companies:[...preVal.companies,value]})):setQueries(preVal=>({...preVal,companies:preVal.companies.filter((val)=>val!=value)}))
    }else{
      setQueries((preVal)=>({...preVal,[name]:value}))
    }
  }
  const handelSubmit=(e)=>{
    e.preventDefault()
    // console.log(queries);
// let {PoNo,fromInvoicedate,fromWorkCompletionDate,toInvoiceDate,toWorkCompletionDate,companies}=queries
//     const queryArray=[]
//     PoNo&&queryArray.push(`PoNo=${PoNo}`)
//     fromInvoicedate&&queryArray.push(`fromInvoicedate=${fromInvoicedate}`)
//     fromWorkCompletionDate&&queryArray.push(`fromWorkCompletionDate=${fromWorkCompletionDate}`)
//     toInvoiceDate&&queryArray.push(`toInvoiceDate=${toInvoiceDate}`)
//     toWorkCompletionDate&&queryArray.push(`toWorkCompletionDate=${toWorkCompletionDate}`)
//     companies&&queryArray.push(`companies=${companies}`)
//     // console.log(queryArray);
//     const query=queryArray.join("&")
let query=new URLSearchParams(queries).toString();
// console.log(query);
(async()=>{
  try {
    let data=await empServices.filteredBills(globalState.token,query)
    console.log(data);
    if(data.status==200 && data.data.count==0){
      toast.error("No Bills Found")
    }else if(data.status==200 && data.data.count>0){
      toast.success("bills fetched succesfully")
      navigate("/home/viewBills",{state:data.data.bills})
    }else{
      toast.error("Something went wrong")
    }
    
  } catch (error) {
      toast.error("Something went wrong")
    
  }
})()

  }
  const handelShow=()=>{
    setShowCompanyName(!showCompanyNames);
    (async()=>{
try {
        let data=await empServices.companyName(globalState.token)
      console.log(data);
      if(data.status==200){
        setComoantNames(data.data.companies)
      }else{
        toast.error("something went wrong")
      }
} catch (error) {

        toast.error("something went wrong")
  
}
      
    })();
  }
  // console.log(conpanyName);
  
  return (
     <div className='bg-[#efefef] size-full flex justify-center items-center'>
          <form action="" className='w-1/2 h-[90%]  rounded-3xl bg-white shadow-2xl flex  items-center flex-col gap-8 px-[80px] py-20 max-sm:w-[90%] overflow-scroll' onSubmit={handelSubmit} >
            <div className='font-bold w-full flex justify-center items-center'>
              <h1 className='text-3xl max-lg:text-sm'>Filter Bills</h1>
            </div>
  

    
    
            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm'>
           
              <input type="text" name="PoNo" placeholder='Enter PoNo' className='w-full outline-none px-4 h-10' onChange={handleChnage} />
       
            </div>
    
    


               
            <div className=' w-full flex justify-center items-center px-3 rounded-sm'>
              <label htmlFor="" className='grow'>From Work Completion Date</label>
              <input type="date" name="fromWorkCompletionDate" placeholder='Enter Work Completion Date' className='w-1/2 outline-none px-4 h-10  border-2 ' 
              max={new Date().toISOString().split("T")[0]} onChange={handleChnage}
              />
        
            </div>

              
            <div className=' w-full flex justify-center items-center px-3 rounded-sm'>
              <label htmlFor="" className='grow'>To Work Completion Date</label>

              <input type="date" name="toWorkCompletionDate" placeholder='Enter Work Completion Date' className='w-1/2 outline-none px-4 h-10 border-2 ' 
              max={new Date().toISOString().split("T")[0]} onChange={handleChnage}
              />
        
            </div>

              
            <div className='  w-full flex justify-center items-center px-3 rounded-sm'>
              <label htmlFor="" className='grow'>From Invoice Date</label>
              <input type="date" name="fromInvoicedate" placeholder='Enter Work Completion Date' className='w-1/2 outline-none px-4 h-10 border-2' 
              max={new Date().toISOString().split("T")[0]} onChange={handleChnage}
              />
        
            </div>              
            <div className='  w-full flex justify-center items-center px-3 rounded-sm'>
              <label htmlFor="" className='grow'>To invoice Date</label>
              <input type="date" name="toInvoiceDate" placeholder='Enter Work Completion Date' className='w-1/2 outline-none px-4 h-10 border-2' 
              max={new Date().toISOString().split("T")[0]} onChange={handleChnage}
              />
        
            </div>


          {
            showCompanyNames?<div className='flex justify-around w-full'>
              {
                conpanyName.map((val,index)=><div className='flex gap-2.5' key={index}>
                  {
                    index%2==0?<div className='flex gap-1.5'>
                  <input type="checkbox" value={val} name='companies' onChange={handleChnage}/>
                  <label htmlFor="">{val}</label>
                    </div>:<div className='flex gap-1.5'>
                    <input type="checkbox" value={val} name='companies' onChange={handleChnage}/>
                  <label htmlFor="">{val}</label>
                    </div>
                  }
                </div>)
              }
            </div>:""
          }
    

            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm bg-black hover:bg-[#555] active:bg-lime-500 active:scale-[0.9]'>
             <button className='h-10 text-white font-bold text-md tracking-widest w-full outline-0' type='button' onClick={handelShow}>View Company Names</button>
            </div>



            <div className='border-2  w-full flex justify-center items-center px-3 rounded-sm bg-black hover:bg-[#555] active:bg-lime-500 active:scale-[0.9]'>
             <button className='h-10 text-white font-bold text-md tracking-widest w-full outline-0'>Click</button>
            </div>
          </form>
        </div>
  )
}

export default FilterBills