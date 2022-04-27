
import { Button, Table } from 'react-bootstrap';

function MyAside(props) {
    const bottons=props.bottoni;
    const SelButton =props.SelButton;
    const setSelButton =props.setSelButton;
    return (
        <aside>
            <Table>
                <tbody>
                    {bottons.map((b,index) => (<tr key={b+" tr"} ><td ><Button  key={b} variant={SelButton===b?"primary":"light"} id={b} onClick={()=> setSelButton(b)}>{b}</Button></td></tr>))}
                </tbody>
            </Table>
        </aside>);
}

export default MyAside;