import "./PostOfUser.css"
import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {Card, CardImg, CardBody,CardTitle, CardText, Button,CardHeader,CardFooter} from "reactstrap"
import axiosInstance from "../../axios";
  
function PostOfUser(props) {
    const [name, setName] = useState([]);
    const [arr1,setArr1] = useState(props.props.comments);
    const [like, setLike] = useState(0);
    const [isActive, setActive] = useState(null);
    const [comment, setComment] = useState("");
    useEffect(()=>{
        axiosInstance().get("http://localhost:3000/users/"+props.props.user).then(res=>setName(res.data.data.name));
        const url = "http://localhost:3000/posts/"+props.props._id+"/likes";
        axiosInstance().get(url).then(res=>{
            const arr = res.data.data.likes;
            setLike(arr.length);
            if(arr.includes(res.data.data.user)){
                setActive(true);
            }
            else{
                setActive(false);
            }
        });
    },[]);
    
       

    

    
    function likeButton(){
        // setActive(!isActive);
        if(isActive){
            axiosInstance().patch("http://localhost:3000/posts/"+props.props._id+"/dislike").then((res)=>{
                console.log("disliked");
            })
            setActive(false);
            setLike(like-1);
        }
        else{
            axiosInstance().patch("http://localhost:3000/posts/"+props.props._id+"/like").then((res)=>{
                console.log("liked");
            })
            setActive(true);
            setLike(like+1);
        }
    }

    function addComment(){
        const url = "http://localhost:3000/posts/"+props.props._id+"/comment";
        setArr1([...arr1,comment]);
        setComment("");
        axiosInstance().patch(url,{comment: comment}).then(res=>{
            console.log(res.data.data);
            
        })
    }


    return (
        <div style={{display: 'block', width: 700, padding: 30}}>
            <Card className=""style={{width: '100%'}}>
                <CardHeader>
                    <div className="prof-container">
                        <p className="prof_name">{name}</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <CardTitle tag="h5">
                        {props.props.content}
                    </CardTitle>
                    <CardImg src={props.props.image} />
                </CardBody>
                <CardFooter>
                    <button className={isActive ? "btn btn-block btn-primary" : "btn btn-block"} onClick={likeButton}><i className="fa fa-thumbs-up"></i> </button>
                    {like} Likes
                    <div className="d-flex flex-row mt-2">
                    <input type="text" placeholder="Add a comment" className="comment" onChange={(e)=>{
                        setComment(e.target.value);
                    }} value={comment} />
                    <button className="btn btn-block btn-primary" onClick={addComment} ><i className="fa fa-paper-plane"></i></button>
                    </div>
                    <p className="mb-0" style={{fontSize: "1.5rem"}}>Comments</p>
                    {arr1.map((item)=>{
                        return(
                            <div className="d-flex flex-row mt-2">
                            <p className="comments">{item}</p>
                            </div>
                    )})}
                </CardFooter>
            </Card>
        </div>
    );
}
  
export default PostOfUser;