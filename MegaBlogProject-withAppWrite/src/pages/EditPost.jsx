import React,{useState, useEffect} from 'react';
import { Container, PostForm } from '../components';
import databaseService from '../appwrite/databaseService';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [posts, setPosts] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug) {
            databaseService.getPost(slug)
            .then()
        }
    }, []);

    return (
        <div>EditPost</div>
    )
}

export default EditPost