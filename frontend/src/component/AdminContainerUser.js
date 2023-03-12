import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { loadUser, updateUserRole } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const AdminContainerUser = ({data}) => {

    const dispatch = useDispatch();
    const [status , setStatus] = useState("");
    const {user, isAuthenticated } = useSelector(
      (state) => state.user
    );

  useEffect(() => {
      dispatch(loadUser());   
  } , []);

    

    const handleSubmit = (e) => {
      e.preventDefault();
      if(status === "" || status === "Select"){
        toast.warning("Please Select Role !!!" , {position: toast.POSITION.TOP_CENTER ,
        });
        return;
      }

      if(user._id === data._id){
        toast.error("You can't change your role. i.e You are ADMIN" , {position: toast.POSITION.TOP_CENTER ,
        });
        return;
      }

      dispatch(updateUserRole(data._id , status));
      toast.success("Role Succesfully Changed !!!" , {position: toast.POSITION.TOP_CENTER ,
        onClose: () => window.location.reload()
      });
    }

    // function deleteUser(id){
    

    //   console.log("Bye");
    //   // if(true){
    //     dispatch(deleteUser(data._id));
    //     toast.success("User Deleted Succesfully !!!" , {position: toast.POSITION.TOP_CENTER ,
    //       onClose: () => window.location.reload()
    //     });

        
    //   //   return;
    //   // }
    //   // return;
    // }

    return (
    <Container>
        {user && (
            <Wrap>
            <Left>
                <Data>
                    <Text6>Name:</Text6>
                    <Text4>{data.name}</Text4>
                </Data>
                <Data>
                    <Text6>ID:</Text6>
                    <Text4>{data._id}</Text4>
                </Data>
                <Data>
                    <Text6>Current Role:</Text6>
                    <Text4>{data.role}</Text4>
                </Data>
            </Left>
            <Wrapper3>
              <Form onSubmit = {handleSubmit}>
                <Text4>Set Role</Text4> 
                <Field>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="Select">Select...</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Btn type="submit">Change Role</Btn>
                  
                </Field>
              </Form>
              
          </Wrapper3>
          <Right>
            <div>
                {/* <form onClick = {deleteUser.bind(this , data._id)}>
                  <button type = "submit"> */}
                    <DeleteIcon style={{ color: "red" , cursor: "pointer" }} />
                {/* </button>
                </form> */}
            </div>
          </Right>
        </Wrap>
        )}
        
    </Container>
  )
}

export default AdminContainerUser

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 2%;
  `

  const Wrap = styled.div`
    width: 60%;
    background: #dde1e7;
    block-size: fit-content;
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -8px -8px 9px rgba(255,255,255,0.45), 8px 8px 9px rgba(94,104,121,0.3);
    transition: all 0.2s ease 0s;
  `

  const Left = styled.div`
    width: 50%;
    padding-left: 5%;
  `

  
const Wrapper3 = styled.div`
width: 40%;
// background: green;
`

const Field = styled.div`
font-size: 7px;

select{
  letter-spacing: 1px;
  font-size: 12px;
  padding: 5px 12px;
  line-height: 20px;
  border-radius: 6px;
  border: 1px solid #797876;
  outline: none;
  cursor: pointer;
}
`

const Btn = styled.button`
margin-left: 2%;
font-family: system-ui;
padding: 6px 18px;
border-radius: 50px;
border: 0;
color: white;
background-color: hsl(261deg 80% 48%);
box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
letter-spacing: 1.5px;
text-transform: uppercase;
font-size: 180%;
transition: all .5s ease;
cursor: pointer;

// &:hover {
//     letter-spacing: 2px;
//     background-color: hsl(261deg 80% 48%);
//     color: hsl(0, 0%, 100%);
//     box-shadow: rgb(93 24 220) 0px 7px 29px 0px;
//    }

//    &:active {
//     letter-spacing: 2px;
//     background-color: hsl(261deg 80% 48%);
//     color: hsl(0, 0%, 100%);
//     box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
//     transform: translateY(10px);
//     transition: 100ms;
//    }
`
const Form = styled.form`
`

const Text4 = styled.p`
// font-weight: bold;
font-family: system-ui;
color: #797876;
margin-bottom: 1%;
margin-right: 2%;
letter-spacing: 0.5px;
`

const Text6 = styled.p`
font-weight: bold;
font-family: system-ui;
color: #797876;

letter-spacing: 0.5px;

margin-right: 2%;
`

const Right = styled.div`
    width: 10%;
`

const Data = styled.div`
    display: flex;
    // background-color: red;
`