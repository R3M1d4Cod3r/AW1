import { Navbar, Container, Form, FormControl, } from 'react-bootstrap'
import { BsFilm, BsPersonCircle } from 'react-icons/bs';

function MyNav() {
    return (
        <Navbar className='navbar-dark bg-primary'>
            <Container fluid>
                <Navbar.Brand ><BsFilm />FilmLibrary</Navbar.Brand>
                <Form className="d-flex" >
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                </Form>
                <Navbar.Brand href="#"><BsPersonCircle /></Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default MyNav;