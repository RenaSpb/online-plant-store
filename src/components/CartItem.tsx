import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import storeItems from "../data/items.json"
import {Button, Stack} from "react-bootstrap";
import {Minus, Plus, Trash2} from "lucide-react";
import {formatterCurrency} from "../currency/currencyFormator.ts";

type CartItemProps = {
    id: number;
    quantity: number;
};

export function CartItem({id, quantity }: CartItemProps) {

    const{removeCartQuantity, decreaseCartQuantity, increaseCartQuantity} = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null;

    return (
        <Stack gap={3} direction="horizontal" className="d-flex align-items-center">
            <img src={item.imgUrl} style={{width: '70px', height: '110px'}}/>
            <div className="me-auto">
                <div>
                    {item.name}{' '}
                        <span className="text-muted">
                            x{quantity}

                        </span>
                </div>
                <div className="text-muted">
                    {formatterCurrency(item.price)}
                </div>
                <Button variant="light" size="sm" className="text-muted"
                        onClick={() => decreaseCartQuantity(id)}>
                    <Minus size="12"/>
                </Button>
                <Button variant="light" size="sm" className="text-muted"
                        onClick={() => increaseCartQuantity(id)}>
                    <Plus size="12" />
                </Button>
            </div>
            <div>
                {formatterCurrency(item.price * quantity)}
            </div>
            <Button variant="light" size="sm" className="text-muted"
                    onClick={() => removeCartQuantity(id)}> <Trash2 size="20" text-muted /> </Button>
        </Stack>
    );
}
