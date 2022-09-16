import { Navigate, Outlet } from 'react-router-dom'
import { useFetchUserQuery } from '../modules/services/userSlice'

const PrivateRoutes = () => {
    const { data: user } = useFetchUserQuery()
    return user?.username ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
