import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return(<>
        <div>
            <NavLink to = '/'>Home</NavLink> |&nbsp;
            <NavLink to = '/practica'>Practica</NavLink>
            <hr />
        </div>
    </>)
}
export default Navbar