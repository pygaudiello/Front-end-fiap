import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar(){
    return(
        <div className={styles.navbar}>
            <h1>Blog de Aulas</h1>
            <ul>
                <li>
                    <Link 
                        to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/create'>
                        Postagem
                    </Link>
                </li>
                <li>
                    <Link to='/'>Listas</Link>
                </li>
                <li>
                    <Link 
                        to='/login'>
                        Login
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/admin'>
                        Admin
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/edit/:id'>
                        Editar
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/gerenciar'>
                        Gerenciar
                    </Link>
                </li>
            </ul>
        </div>
    )
}