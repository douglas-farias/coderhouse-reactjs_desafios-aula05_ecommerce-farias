import './sytle.css';

function ProfileModal({ menu }) {

    function logout() {
        
    }
    return (
        <div className='profileModal' style={{ display: menu ? 'flex' : 'none'}}>
            {/* <p className="editarPerfil">editar</p> */}
            <p className="sairPerfil" onClick={() => {}}>sair do perfil</p>
        </div>
    );
}

export default ProfileModal