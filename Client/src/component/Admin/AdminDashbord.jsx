import React, { useEffect, useState } from 'react'
import './AdminDashbord.css'
import AdminNavbar from './adminNav' 
import table from './table'
import axios from '../../../Axios/axios';
import EditUserName from './handleEditname';
import AddModal from './addUserModal';


function AdminDashbord() {
  const [users,setUsers]=useState([])
  useEffect(()=>{
    axios.get('/getUser').then((res)=>{
       console.log('user',res.data.user);
       const fetched=res.data.user.map((el,index)=>
        ({...el,
        id:index+1})
      )
      setUsers(fetched)
    })
  },[])
  const fetchUser=()=>{
    axios.get('/getUser').then((res)=>{
      console.log('user',res.data.user);
      const fetched=res.data.user.map((el,index)=>
        ({...el,
        id:index+1})
      )
      setUsers(fetched)
      
   })
  }

  
  const [selectedUser, setSelectedUser] = useState({name:null,id:null});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [state,setState]=useState(false)
  


  const handleEdit = (el) => {

    setIsEditModalOpen(true);
    setSelectedUser({user:el.name,id:el._id});
    setState(true)
  
    
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleDelete=(el)=>{
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if(confirmed){
      axios.post('admin/deleteUser',{id:el._id}).then((res)=>{
        // setUsers(res.data.users)
        const fetched=res.data.user.map((el,index)=>
        ({...el,
        id:index+1})
      )
      setUsers(fetched)
      })
    }
  }

  // adduser modal ------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };
  // end  ---------------------------------------------
  const user=users.filter((el)=>el.role!='admin')
  const [search,setSearch]=useState(null)
  useEffect(()=>{
    
    axios.get(`admin/getSearch/${search?`?search=${search}`:''}`).then((res)=>{
      console.log('searched',res.data.data);
      const fetched=res.data.data.map((el,index)=>
      ({...el,
      id:index+1})
    )
    setUsers(fetched)
    })
  },[search])
  return (
    <div>
        <AdminNavbar/>
      
        <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"
      />
     <input type="text"  />
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-[90%] max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark ">Users</span>
                  <input type="text" onChange={(e)=>setSearch(e.target.value)} className="border border-black p-1 my-2 " placeholder='search..'/>
                  
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal"></span>
                  
                  
                </h3>
                <div className="relative flex flex-wrap items-center my-2">
                  <a
                    href="javascript:void(0)" onClick={handleOpenModal}
                    className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light bg-[green] border-light shadow-none border-0 py-2 px-5 hover:bg-[green]  active:bg-light focus:bg-light"
                  >
                    Add user
                  </a>
                  <AddModal isOpen={isModalOpen} fetchuser={fetchUser} onClose={handleCloseModal} />
                </div>
              </div>
              {/* end card header */}
              {/* card body */}
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  {/* <table className="w-full my-0 align-middle text-dark border-neutral-200"> */}
                  <table className="mx-auto my-0 align-middle text-[black] border-neutral-300 w-[100%]">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-dark">
                        <th className="pb-3 text-center min-w-[50px]">NAME</th>
                        <th className="pb-3 text-center min-w-[50px]">EMAIL</th>
                        <th className="pb-3 text-start min-w-[100px]">EDIT</th>
                        <th className="pb-3 pr-12 text-start min-w-[175px]">DELETE</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {/* Insert table rows here */}
                      {console.log('kett',users)}
                      {user.map((el)=>{
                       
                        return(
                          <tr className="font-semibold text-[0.95rem] text-dark">                   
                          <td className="pb-3 text-center min-w-[80px]">{el.name}</td>
                          <td className="pb-3 text-center min-w-[80px]">{el.email}</td>
                          <td  className="pb-3 text-start min-w-[100px]"><button onClick={() => handleEdit(el)} class="dark:bg-[blue] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full">
                          <small> EDIT</small>
                        </button></td>
                          <td className="pb-3 pr-12 text-start min-w-[175px]"><button onClick={() => handleDelete(el)} class="bg-[red] hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full">
                           <small> DELETE</small>
                          </button></td>
                          {state&&<EditUserName user={selectedUser} fetchUser={fetchUser} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />}
                          </tr>

                        )
                      })}  
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
    </div>
    
  )
}

export default AdminDashbord