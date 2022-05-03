import { useState } from "react"
import {Button} from "react-bootstrap"
function MyButton(props) {
  let [buttonciao, setButton] = useState(props.ciao)
    if (buttonciao === 1)
      return <Button variant="primary" onClick={()=> setButton(2)}>Ciao!</Button>
    else
      return <Button variant="primary" onClick={()=> setButton(1)}>Ciao2</Button>
  }

  export default MyButton;