import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, CardMedia, Typography, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const SearchResult = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.title = 'Sangrah | Marketplace';
    }, [])
    const cardColorsList = [
        'rgba(250, 243, 240, 0.5)',
        'rgba(212, 226, 212, 0.5)',
        'rgba(255, 202, 204, 0.5)',
        'rgba(219, 196, 240, 0.5)',
        'rgba(255, 244, 210, 0.5)',
    ];
    const classes = useStyles();
    const [currcompany, setcurrcompany] = useState('undefined');
    const [open, setOpen] = React.useState(false);
    const [cardColors, setCardColors] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedProductPrice, setSelectedProductPrice] = useState('NaN');
    const [selectedProductQuantity, setSelectedProductQuantity] = useState('NaN');
    const [selectedProduct, setSelectedProduct] = useState('NaN');
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    useEffect(() => {
        // Initialize the previousColor as an invalid color to start
        let previousColor = null;
        const colors = companies.map(() => {
            previousColor = getRandomColor(previousColor); // Pass the previous color to avoid repetition
            return previousColor;
        });
        setCardColors(colors);
    }, [companies]);

    const handleProductSelect = (e) => {
        const selectedProduct = e.target.value;
        const product = currcompany.products.find((p) => p.name === selectedProduct);
        if (product) {
            setSelectedProduct(product.name);
            setSelectedProductPrice(product.s_price);
        } else {
            setSelectedProduct('NaN');
            setSelectedProductPrice('');
        }
    };

    const handleQuantitySelect = (e) => {
        const selectedQuantity = e.target.value;
        setSelectedProductQuantity(selectedQuantity);
    }

    const addProduct = (product, quantity, totalPrice) => {
        setSelectedProducts([...selectedProducts, { product, quantity, totalPrice }]);
    };
    function getRandomColor(previousColor) {
        let newColor;
        do {
            newColor = cardColorsList[Math.floor(Math.random() * cardColorsList.length)];
        } while (newColor === previousColor); // Keep generating until a different color is obtained
        return newColor;
    }
    function handleClickOpen(company) {
        setcurrcompany(company);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setcurrcompany('undefined');
        setSelectedProducts([]);
        setSelectedProductPrice('NaN');
        setSelectedProduct('NaN');
        setSelectedProductQuantity('NaN');
    };


    const getFilteredCompanies = async (det) => {
        const search = det;
        const endpoint = `http://localhost:8000/getFilteredCompanies`;
        const payload = {
            search: search,
        }
        try {
            await axios
                .post(endpoint, payload)
                .then((response) => {
                    
                    setCompanies(response.data);
                })
        } catch (err) {
            // Purposely Kept
            console.log(err);
        }
    }

    useEffect(() => {
        const searchquery = window.location.href.split(":")[3];
        getFilteredCompanies(searchquery);
    }, [])
    return (
        <div>
            <form style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }} onSubmit={(e) => {
                e.preventDefault()
                window.location.href = `/search/:${search}`;
            }}>
                <input type="text" name='searchquery' placeholder='Search here' onChange={handleSearch} value={search} style={{
                    borderRadius: '50px',
                    height: '50px',
                    padding: '10px',
                    margin: "1rem",
                    width: "30%",
                    border: '1px solid #545e6f',
                }} />
                <SearchIcon style={{
                    alignSelf: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    right: '60px'
                }} onClick={() => {
                    window.location.href = `/search/:${search}`;
                }}></SearchIcon>
            </form>
            <Container maxWidth="lg">
                <Grid container spacing={3} style={{
                    display: 'flex',
                    // flexDirection: companies.length < 3 ? 'column' : 'row',
                    justifyContent: 'center',
                    // border: "1px solid #545e6f",
                    alignItems: companies.length < 3 ? 'center' : 'flex-start', // Center vertically only when there's a single card
                }}>
                    {companies.map((company, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className={classes.card} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: cardColors[index],
                                height: '100%',
                                alignItems: 'center',
                                padding: '1rem',
                                boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
                            }}>
                                {/* <CardMedia
                                    className={classes.media}
                                    image={company.logo}
                                    title={company.name}
                                /> */}
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {company.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {company.description}
                                    </Typography>
                                </CardContent>
                                <Button variant="outlined" onClick={(e) => {
                                    e.preventDefault()
                                    handleClickOpen(company)
                                }}>Order</Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* <div>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon onClick={
                                    () => {
                                        handleClose();
                                        setcurrcompany('undefined');
                                        setSelectedProducts([]);
                                    }
                                } />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Order Details
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                Order
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <ListItemText primary="Company Name" secondary={currcompany.name} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Company Email" secondary={currcompany.email} />
                        </ListItem>
                        <Divider />
                        {selectedProducts.length === 0 ? <ListItemText primary="No Products Selected" style={{
                            textAlign: 'left',
                            marginLeft: '1rem',
                            fontSize: '1.5rem',
                        }} /> : <><List>
                            <ListItemText primary="Products Selected" style={{
                                textAlign: 'left',
                                marginLeft: '1rem',
                                fontSize: '1.5rem',
                            }} />

                            {selectedProducts.map((item, index) => (
                                <div key={index}>
                                    <ListItem>
                                        <ListItemText primary={`Product Name: ${item.product}`} secondary={`Quantity: ${item.quantity}`} />
                                        <IconButton
                                            edge="end"
                                            color="inherit"
                                            onClick={() => {
                                                // Remove the selected product
                                                const updatedProducts = [...selectedProducts];
                                                updatedProducts.splice(index, 1);
                                                setSelectedProducts(updatedProducts);
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                        </List></>}

                        <Divider />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                        }}>
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '400px',
                            }}>
                                <ListItem style={{
                                    width: '100%',
                                }}>
                                    <ListItemText primary="Select Product" />
                                    {currcompany === 'undefined' ? <></> : <select>
                                        {currcompany.products.map((product, index) => (
                                            <option key={index} value={product.name}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>}
                                </ListItem>
                            </div>
                            <Divider />
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '400px',
                            }}>
                                <ListItem style={{
                                    width: '100%',
                                }}>
                                    <ListItemText primary="Quantity" />
                                    <input type="number" min="1" id="quan" style={{
                                        width: '100px',
                                    }} />
                                </ListItem>
                            </div>
                            <Divider />
                            <ListItem>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        // Get the selected product and quantity
                                        const selectedProduct = document.querySelector('select').value;
                                        const quantity = parseInt(document.querySelector('#quan').value);

                                        // Add the product to the order
                                        addProduct(selectedProduct, quantity);
                                        document.querySelector('#quan').value = '';
                                    }}
                                >
                                    Add to Order
                                </Button>
                            </ListItem>
                        </div>
                    </List>

                </Dialog>
            </div> */}

            <div>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon onClick={
                                    () => {
                                        handleClose();
                                        setcurrcompany('undefined');
                                        setSelectedProducts([]);
                                    }
                                } />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Order Details
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                Order
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <ListItemText primary="Company Name" secondary={currcompany.name} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Company Email" secondary={currcompany.email} />
                        </ListItem>
                        <Divider />
                        {selectedProducts.length === 0 ? <ListItemText primary="No Products Selected" style={{
                            textAlign: 'left',
                            marginLeft: '1rem',
                            fontSize: '1.5rem',
                        }} /> : <><List>
                            <ListItemText primary="Products Selected" style={{
                                textAlign: 'left',
                                marginLeft: '1rem',
                                fontSize: '1.5rem',
                            }} />

                            {selectedProducts.map((item, index) => (
                                <div key={index}>
                                    <ListItem>
                                        <ListItemText primary={`Product Name: ${item.product}`} secondary={`Quantity: ${item.quantity}   Total Price: ₹ ${item.totalPrice}`} />
                                        <IconButton
                                            edge="end"
                                            color="inherit"
                                            onClick={() => {
                                                // Remove the selected product
                                                const updatedProducts = [...selectedProducts];
                                                updatedProducts.splice(index, 1);
                                                setSelectedProducts(updatedProducts);
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                        </List></>}

                        <Divider />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                        }}>
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '400px',
                            }}>
                                <ListItem style={{
                                    width: '300px',
                                }}>
                                    <ListItemText primary="Select Product" />
                                    {currcompany === 'undefined' ? <></> :
                                        <select
                                            value={selectedProduct}
                                            onChange={handleProductSelect}>
                                            <option value={selectedProduct} disabled hidden>
                                                {selectedProduct}
                                            </option>
                                            {currcompany.products.map((product, index) => (
                                                <option key={index} value={product.name}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>}
                                </ListItem>
                            </div>
                            <Divider />
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '400px',
                            }}>
                                <ListItem style={{
                                    width: '100%',
                                }}>
                                    <ListItemText primary="Price:" />
                                    {selectedProductPrice && (
                                        <ListItemText>
                                            ₹ {selectedProductPrice}
                                        </ListItemText>
                                    )}
                                </ListItem>
                            </div>
                            <Divider />
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '500px',
                            }}>
                                <ListItem style={{
                                    width: '100%',
                                }}>
                                    <ListItemText primary="Quantity:" />
                                    <input type="number" min="1" id="quan" onChange={handleQuantitySelect} style={{
                                        width: '100px',
                                    }} />
                                </ListItem>
                            </div>
                            <Divider />
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '400px',
                            }}>
                                <ListItem style={{
                                    width: '300px',
                                }}>
                                    <ListItemText primary="Total Price:" />
                                    {selectedProductPrice && (
                                        <ListItemText>
                                            ₹ {selectedProductPrice * parseInt(selectedProductQuantity)}
                                        </ListItemText>
                                    )}
                                </ListItem>
                            </div>

                            <Divider />
                            <ListItem>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        // Get the selected product and quantity
                                        const selectedProduct = document.querySelector('select').value;
                                        const quantity = parseInt(document.querySelector('#quan').value);

                                        // Add the product to the order
                                        addProduct(selectedProduct, quantity, selectedProductPrice * quantity);
                                        setSelectedProduct('NaN');
                                        setSelectedProductPrice('NaN');
                                        document.querySelector('#quan').value = '';
                                    }}
                                >
                                    Add to Order
                                </Button>
                            </ListItem>
                        </div>
                    </List>

                </Dialog>
            </div>
        </div >
    )
}

export default SearchResult
