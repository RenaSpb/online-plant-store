import Rating from "./Rating.tsx";
import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {Trash2, Plus, Minus} from 'lucide-react';
import {formatterCurrency} from "../currency/currencyFormator.ts";
import { Link } from 'react-router-dom';
import '../index.css'

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    //description: string;
    rating: number;
}
export function StoreItem({id, name, price, imgUrl, rating}: StoreItemProps) {

    const {getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartQuantity} = useShoppingCart()

    const quantity = getItemQuantity(id);


    return (
        <Card className="store-item" style={{ height: '480px' }} >
            <Link to={`/product/${name.toLowerCase().replace(/\s/g, '-')}`}>
                <Card.Img variant="top" src={imgUrl} style={{ objectFit: "contain" }} height="350px" />
            </Link>

            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-around align-items-baseline mb-4">
                    <span className="fs-5">{name} </span>
                    <Rating rating={rating} max={5} />
                    <span className="fs-5">{formatterCurrency(price)}</span>
                </Card.Title>


                <div className="mb-1">
                    {quantity === 0 ? (
                    <Button variant="outline-success"  className="w-100" onClick ={() => increaseCartQuantity(id)}>Add to cart</Button>
                    ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                            <Button variant="light" size="sm" className="text-muted"
                                    onClick={() => removeCartQuantity(id)}>
                                <Trash2 size="20"/>
                            </Button>
                            <Button variant="light" size="sm" className="text-muted"
                                    onClick={() => decreaseCartQuantity(id)}>
                                <Minus size="20"/>
                            </Button>
                            <span className="mb-0 text-muted">{quantity}</span> in cart
                            <Button variant="light" size="sm" className="text-muted"
                                    onClick={() => increaseCartQuantity(id)}>
                                <Plus size="20"/>
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
