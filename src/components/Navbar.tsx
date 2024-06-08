import { Button, Container, Nav, Navbar as NavbarBs, Offcanvas } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { ShoppingCart } from 'lucide-react';
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import storeItems from "../data/items.json";
import {StoreItem} from "./StoreItem.tsx";


export function Navbar() {

    const { cartQuantity, openCart, setSearchTerm, setFilteredItems, searchTerm, filteredItems } = useShoppingCart()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (location.pathname !== '/store') {
            setShow(true);
        }
    };

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = storeItems.filter(item =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setSearchTerm(searchTerm);
        setFilteredItems(filtered);

    }, [searchTerm])

    return (
        <NavbarBs sticky="top" className='bg-light shadow mb-4'>
            <Container fluid>
                <Nav className="me-auto">
                    <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
                    <Nav.Link to="/contacts" as={NavLink}>Contacts</Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
                </Nav>

                <Form className="d-flex align-items-center me-3 ">
                    <Form.Control
                        placeholder="Search for item"
                        type="text"
                        value={searchTerm}
                        onClick={handleShow}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </Form>

                <Button
                    onClick={openCart}
                    variant="outline-secondary"
                    className="d-flex align-items-center"
                >
                    <ShoppingCart size={24} />
                    <div className="ms-2">{cartQuantity}</div>
                </Button>

                <Offcanvas show={show} onHide={handleClose} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Search</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <Form.Control className='mb-2'
                            placeholder="Enter search items"
                            type="text"
                            onChange={(event) => setSearchTerm(event.target.value)}

                        />
                        {filteredItems.map(item => (
                            <StoreItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                imgUrl={item.imgUrl}
                                rating={item.rating}
                            />
                        ))}
                    </Offcanvas.Body>
                </Offcanvas>

            </Container>
        </NavbarBs>
    )
}

