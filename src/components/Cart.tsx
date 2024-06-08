import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {Offcanvas, Stack} from "react-bootstrap";
import {CartItem} from "./CartItem.tsx";
import storeItems from "../data/items.json"
import {formatterCurrency} from "../currency/currencyFormator.ts";


type CartProps = {
    isOpen: boolean
}
export function Cart({isOpen}: CartProps) {

    const {closeCart, cartItems} = useShoppingCart()

    return(
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            {...item}
                        />
                    ))}


                <div className="fw-bold fs-4 text-end">
                    Total{' '}
                     {formatterCurrency(cartItems.reduce((total, cartItem) => {
                     const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0))}
                </div>

                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}