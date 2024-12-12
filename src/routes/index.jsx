import { useRoutes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// routes
import MainRoutes from './MainRoutes';
import LoginScreen from 'routes/LoginScreen';
import PostManagement from './PostManagement.jsx'; // Cập nhật đường dẫn chính xác
import FeedbackManagement from './FeedbackManagement';
import ExerciseManagement from './ExerciseManagement';
import TrainingManagement from './TrainingManagement';
import PlanManagement from './PlanManagement';
import CommentManagement from './CommentManagement';
import { useEffect } from 'react';
import axios from 'axios';
import useUserStore from 'store/userStore';
const URL = `https://w2fw01lr-3000.asse.devtunnels.ms`

const getUserById = async (id) => {
  const token = localStorage.getItem('jwt_token');
  try {
    const res = await axios.get(`${URL}/api/user/getUserById`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res.data;
  } catch (error) {
    throw new Error(error)
  }
}

export default function Routes() {

  const navigate = useNavigate()
  const { user, setUser } = useUserStore()

  useEffect(() => {
    const verifyTokenUser = async () => {
      const token = localStorage.getItem('jwt_token')
      if (!token) {
        navigate('/login')
      } else {

        const res = await axios.get(`${URL}/api/user/getCurrentUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.user.role == 'ADMIN') {
          const userData = await getUserById(res.data.user._id);
          setUser(userData.data)
        } else {
          navigate('/login')
        }
      }
    }

    verifyTokenUser()
  }, [])

  return useRoutes([
    { path: '/login', element: <LoginScreen /> }, // Thêm route login
    MainRoutes,
    { path: '/post-management', element: <PostManagement /> }, // Thêm route mới
    { path: '/feedback-management', element: <FeedbackManagement /> }, // Thêm route mới
    { path: '/exercise-management', element: <ExerciseManagement /> },
    { path: '/training-management', element: <TrainingManagement /> },
    { path: '/plan-management', element: <PlanManagement /> },
    { path: '/comment-management', element: <CommentManagement /> },
  ]);
}
