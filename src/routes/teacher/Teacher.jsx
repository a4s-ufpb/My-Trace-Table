import { useEffect, useState } from 'react'
import { UserService } from '../../service/UserService';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import NavigateButton from '../../components/navigateButton/NavigateButton';

function Teacher() {
    const userService = new UserService();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [])

    async function fetchUsers() {
        try {
            setLoading(true);
            const usersResponse = await userService.findAllUsers();
            setLoading(false);

            if (!usersResponse.success) {
                setUsers([]);
                return;
            }

            setUsers(usersResponse.data.content);
        } catch (error) {
            console.log(error)
            setUsers([]);
        }
    }

    return (
        <div className='background'>
            <NavigateButton />
            <h1 className='title'>Selecione o Professor abaixo</h1>

            {users && users.length > 0 && users.map((user) => (
                <div key={user.id}>
                    <Button text={user.name} action={() => navigate(`/themes/${user.id}?userName=${user.name}`)} />
                </div>
            ))}

            {loading && <Loading />}

            {!loading && users.length == 0 && <h2>Nenhum usuário cadastrado!</h2>}
        </div>
    )
}

export default Teacher