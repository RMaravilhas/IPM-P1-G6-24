import React, { useEffect, useState } from 'react';
import { OrderCardProps } from '../components/Cards/OrderCard';
import { ProductCardProps } from '../components/Cards/ProductCard';
import { messageData } from '../data';

interface MessagePopupProps {
    isOpen: boolean;
    onClose: () => void;
    recipientName: OrderCardProps | ProductCardProps | void;
    type: string | void;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ isOpen, onClose, recipientName, type }) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState<string>('');
    const [cardType, setType] = useState<string>('');

    useEffect(() => {
        if (recipientName) {
            // Determine if it's an OrderCard or ProductCard
            if ('ownerName' in recipientName) {
                setName(recipientName.ownerName); // It's an OrderCard
            } else if ('customerName' in recipientName) {
                setName(recipientName.customerName); // It's a ProductCard
            } else {
                setName(''); // Fallback if neither is found
            }
        }
    }, [recipientName]);

    useEffect(() => {
        if (type === 'P') {
            setType('Oferta');
        } else if (type === 'O') {
            setType('Produto');
        } else {
            setType('');
        }
    }, [type]);

    if (!isOpen) return null;

    const handleSendMessage = () => {
        if (message.trim()) {
            messageData.push({
                recipient: name,
                message: message.trim(),
                type: cardType
            });
            console.log(messageData);
            setMessage('');
            onClose();
        } else {
            alert('Please enter a message.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className="bg-white rounded-3xl w-[90%] max-w-[400px] p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-5 text-xl text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Enviar Mensagem</h2>
                <p className="text-gray-600 mb-4">To: <strong>{name}</strong></p>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                ></textarea>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagePopup;
