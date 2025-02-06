interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPost: Post | null;  // Recebendo o produto selecionado como prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedPost }) => {
    if (!isOpen || !selectedPost) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white max-w-6xl mx-auto p-6 rounded-xl shadow-lg relative" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    ✖
                </button>
                <h2 className="text-3xl font-bold text-center mb-6">Detalhes do Produto</h2>
                
                <div className="flex flex-col items-center">
                    <img
                        className="w-60 h-60 object-cover rounded-md mb-4"
                        src={selectedPost.thumbnail}
                        alt={selectedPost.title}
                    />
                    <h3 className="text-xl font-semibold mb-2">{selectedPost.title}</h3>
                    <p className="text-gray-600 mb-2">{selectedPost.description}</p>
                    <p className="font-semibold">Preço: R$ {selectedPost.price}</p>
                    <p>Desconto: {selectedPost.discountPercentage}%</p>
                    <p className="font-semibold pb-7">Avaliação: {selectedPost.rating}</p>
                    <button onClick={() => alert("Compra realizada com sucesso!")} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4">
                        Confirmar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
