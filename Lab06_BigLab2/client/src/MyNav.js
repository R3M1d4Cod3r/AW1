import { Navbar, Container, Form, FormControl, } from 'react-bootstrap'
import { BsFilm, BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function MyNav() {
    const navigate =useNavigate();
    return (
        <Navbar className='navbar-dark bg-primary'>
            <Container fluid>
                <Navbar.Brand id="click" onClick={()=>navigate('/')}><BsFilm /> FilmLibrary</Navbar.Brand>
                <Form className="d-flex" >
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                </Form>
                <Navbar.Brand ><BsPersonCircle /></Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default MyNav;