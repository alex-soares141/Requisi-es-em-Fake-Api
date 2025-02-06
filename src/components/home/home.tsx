import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../modal/modal";

interface Post {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    thumbnail: string;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get<{ products: Post[] }>('https://dummyjson.com/products/category/smartphones')
            .then(response => {
                setPosts(response.data.products);
            })
            .catch(error => {
                console.error("Erro ao buscar os posts:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading ? (
                <div className="text-3xl flex flex-col items-center">
                    <h1 className="text-4xl mt-7 mb-7">Carregando...</h1>
                </div>
            ) : (
                <>
                    <div className="text-3xl flex flex-col items-center">
                        <h1 className="text-4xl mt-7 mb-7">Celulares Disponíveis:</h1>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="flex flex-wrap justify-center gap-4 w-full px-4">
                            {posts.map(post => (
                                <div
                                    key={post.id}
                                    className="w-72 p-4 border border-gray-300 rounded-lg shadow-md flex flex-col"
                                >
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-48 object-cover mb-4 rounded-md"
                                    />
                                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                    <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                                    <p className="font-semibold">Preço: R$ {post.price}</p>
                                    <p>Desconto: {post.discountPercentage}%</p>
                                    <p className="font-semibold pb-7">Avaliação: {post.rating}</p>
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => {
                                                setSelectedPost(post);
                                                setShowModal(true);
                                            }}
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                        >
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} selectedPost={selectedPost} />
        </>
    );
}
