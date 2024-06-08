
import {createContext, ReactNode, useContext, useState} from "react";
import storeItems from "../data/items.json";
import {Cart} from "../components/Cart.tsx";
import {useLocalStorageHook} from "../localStorage/useLocalStorage.ts";

type ShoppingCartContext = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredItems: StoreItem[];
    setFilteredItems: (items: StoreItem[]) => void;
    isOpen: boolean;
    cartItems: CartItem[];
    cartQuantity: number;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeCartQuantity: (id: number) => void;
    openCart: () => void;
    closeCart: () => void;
}

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type StoreItem = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    description: string
    rating: number;
}

type CartItem = {
    id: number;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState<StoreItem[]>(storeItems);

    const [cartItems, setCartItems] = useLocalStorageHook<CartItem[]>(
        'shoppingCart',
        []
        );
    const [isOpen, setIsOpen] = useState(false);

    //открытие и закрытие корзины
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    // добавление товаров в корзину, если quantity === 0 (внутри функции увеличение quantity)
    function increaseCartQuantity(id: number) {

        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }


    // удаление товара из корзины
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }


    function removeCartQuantity(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })

    }





    return(
        <ShoppingCartContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                filteredItems,
                setFilteredItems,
                isOpen,
                cartQuantity,
                cartItems,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeCartQuantity,
                openCart,
                closeCart
            }}
        >
            {children}

            <Cart isOpen={isOpen}/>

        </ShoppingCartContext.Provider>
    )

}


