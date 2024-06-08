// import Form from 'react-bootstrap/Form';
import storeItems from "../data/items.json";
import {Col, Row} from "react-bootstrap";
import {StoreItem} from "../components/StoreItem.tsx";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {useEffect} from "react";


export function Store() {
    const {searchTerm, setSearchTerm, filteredItems, setFilteredItems} = useShoppingCart()

    useEffect(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = storeItems.filter(item =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setSearchTerm(searchTerm);
    setFilteredItems(filtered);

}, [searchTerm])


    return (
        <>
        <h3> Explore our collection for a greener home </h3>
        <div className="my-4 mx-3">
            <Row xs={1} sm={2} md={3} lg={4} className="g-3 mt-4">
                {filteredItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            rating={item.rating}
                        />
                    </Col>
                ))}
            </Row>
        </div>
        </>
    )
}