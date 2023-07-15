import { useState } from "react";
import { storage } from "../../Components/firbase";
import {ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import "./NewPost.css";
import axiosInstance from "../../axios";

function NewPost(){
    const [image, setImage] = useState("");
    const [text,setText] = useState("");
    const UploadImage = () => {
        if(!text) return alert("Please Enter Caption"
        );
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log("text",text);
                axiosInstance().post("/create-post",{
                    content: text,
                    image: url
                }).then((res)=>{
                    console.log(res);
                }
                ).catch((err)=>{
                    console.log(err);
                }
                )
            });
            alert("Image Uploaded Successfully")
            setImage("");
        }
        );
    }
    return(
        <div className="NewPost">
            <h1>Create New Post</h1>

            <input type="text" placeholder="Enter Caption" id="inp-txt" onChange={(e)=>{
                setText(e.target.value);
            }
            }/>
            <input type="file" name="file" id="file" className="inputfile" onChange={(e)=>{
                setImage(e.target.files[0]);
            }} />
            <button onClick={UploadImage}>Upload Post</button>
        </div>
    )
}

export default NewPost;

