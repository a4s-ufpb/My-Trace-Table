import { useEffect, useState } from 'react'
import { UserService } from '../../service/UserService';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import NavigateButton from '../../components/navigateButton/NavigateButton';
import SecondaryHeader from '../../components/secondary-header/SecondaryHeader';

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
            <SecondaryHeader showBackButton={true} title="Selecione o Professor abaixo" />

            <div className="center-content">
                {users && users.length > 0 && users.map((user) => (
                    <Button 
                        key={user.id} 
                        text={user.name} 
                        action={() => navigate(`/themes/${user.id}?userName=${user.name}`)} 
                    />
                ))}

                {loading && <Loading />}

                {!loading && users.length == 0 && <h3>Nenhum usuário cadastrado!</h3>}
            </div>
        </div>
    )
}

export default Teacher