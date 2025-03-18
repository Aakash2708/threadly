import React from 'react'
import  KeyboardBackspaceIcon  from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const handleBack =()=>{
        console.log("Handling Back Button in Profile")
    }
    const navigate = useNavigate(-1);
  return (
    
    <div>
        <section className={'z-50 flex items-center sticky top-0 bg-opacity-95'}>
              <KeyboardBackspaceIcon className='cursor-pointer ' onClick={handleBack}/>
        </section>
    </div>
  )
}

export default Profile