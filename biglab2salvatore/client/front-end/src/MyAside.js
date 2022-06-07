
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyAside(props) {
    const bottons = props.bottoni;
    const SelButton = props.SelButton;
    const setSelButton = props.setSelButton;
    const Filter = props.filter;
    const navigate = useNavigate();
    return (
        <aside>
            <Table>
                <tbody>
                    {bottons.map(b => (<tr key={b + " tr"} ><td ><Button key={b} variant={SelButton === b ? "primary" : "light"} id={b} onClick={() => { setSelButton(b); navigate("/" + b) }}>{b}</Button></td></tr>))}
                </tbody>
            </Table>
        </aside>);
}

export default MyAside;