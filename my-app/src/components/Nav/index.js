import "../home/index.css"

import { useHistory } from 'react-router-dom';

const NavBar = ()=>{

const history = useHistory();

const onClickNotes = ()=>{
    history.push('/notes');
}

const onClickHome = ()=>{
    history.push('/');
}

    return(
        <div className='nav-container'>
        <h1 className='nav-logo'>Notes</h1>
        <div className='nav-item'>
        <h3 className='nav-heading' onClick={onClickHome}>Home</h3>
        <h3 className='nav-heading' onClick={onClickNotes}>NoteList</h3>
  
        </div>
        </div>
    )
}

export default NavBar