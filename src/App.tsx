import {Navbar} from "./components/Navbar.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {Store} from "./pages/Store.tsx";
import {About} from "./pages/About.tsx";
import {Contacts} from "./pages/Contacts.tsx";
import {Container} from "react-bootstrap";
import {ShoppingCartProvider} from "./context/ShoppingCartContext.tsx";
import {ProductDescription} from "./components/ProductDescription.tsx";
import Footer from './components/Footer';

function App() {

    return (
        <ShoppingCartProvider>
            <Navbar/>
            <Container fluid className="mb-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/store"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/store" element={<Store/>}/>
                    <Route path="/product/:name" element={<ProductDescription/>}/>
                </Routes>

            </Container>
            <Footer/>
        </ShoppingCartProvider>
    )
}

export default App
