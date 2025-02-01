import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
}
export default function Home() {
    
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts") 
            .then(response => {
                setPosts(response.data); 
            })
            .catch(error => {
                console.error("Erro ao buscar os posts:", error);
            });
    }, []);

    return (
        <div className="text-3xl flex flex-col items-center">
            <h2 className="mb-4 mt-4">Lista de Posts</h2>
            <ul className="text-lg flex flex-col sm:w-1/2">
                {posts.slice(0, 12).map(post => (
                    <li key={post.id} className="mb-2">
                        <strong>{post.title}</strong>: {post.body}
                    </li>
                ))}
            </ul>
        </div>
    );
}