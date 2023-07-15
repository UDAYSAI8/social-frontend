import "./HomePage.css"
import PostOfUser from "../../Components/PostOfUser/PostOfUser.jsx"
import axiosInstance from "../../axios"
import { useEffect, useState } from "react";
import { Navbar ,NavbarBrand,NavItem,Input,Button} from "reactstrap";

function HomePage() {
  const [Search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(()=>{
        axiosInstance().get("http://localhost:3000/posts").then(res=> 
    setData(res.data.data));
  },[])
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const searchUser = () => {
      axiosInstance().get("http://localhost:3000/users/username/"+Search).then(res=>{
        if(res.data.data.length===0){
          alert("No user found");
        }
        
        console.log(res.data.data);
  })};

  return (
    <>
      <Navbar className="Navbar" style={{backgroundColor:"#4c355c"}}>
        <NavbarBrand href="/" className="mr-auto"><b style={{color:"darkkhaki"}}>Socify</b></NavbarBrand>
        <NavItem className="d-inline-flex">
          <Input type="text" placeholder="Search" className="SearchBar" onChange={(e)=>{
            setSearch(e.target.value);
          }}/>
          <Button className="Button" onClick={searchUser}>Search</Button>
        </NavItem>
        <NavItem>
          <Button className="Button" onClick={logOut}>Logout</Button>
        </NavItem>
      </Navbar>
      <div className="HomePage">
        <div className="HomePage-child" id="left"></div>
        <div className="HomePage-child" id="mid">
          {data.map((items)=>{
            return <PostOfUser className="Post" props={items}/>
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
