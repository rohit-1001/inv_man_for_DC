import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const ProductDetailsButton = ({ products }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        borderRadius: '8px',
        padding: '20px',
    };

    const contentStyle = {
        marginBottom: '10px',
    };

    const dividerStyle = {
        height: '1px',
        backgroundColor: '#000',
        margin: '10px 0',
    };

    return (
        <div>
            <Button className="link_in_table" onClick={handleOpen}>
                View Products
            </Button>
            <Modal open={open} onClose={handleClose}>
                <div style={modalStyle}>
                    {products.map((product, index) => (
                        <div key={index}>
                            <div style={contentStyle}>
                                <p><strong>Product Name:</strong> {product.name}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                            </div>
                            {index !== products.length - 1 && <div style={dividerStyle} />}
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default ProductDetailsButton;
