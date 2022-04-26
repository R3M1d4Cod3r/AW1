import { Button, Table } from 'react-bootstrap';

function MyAside(props) {
    return (
        <aside>
            <Table>
                <tbody>
                    {props.bottoni.map((b,index) => (<tr><td><Button key={b} variant={index===0?"primary":"light"} id={b} >{b}</Button></td></tr>))}
                </tbody>
            </Table>
        </aside>);
}

export default MyAside;