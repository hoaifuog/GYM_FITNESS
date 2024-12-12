import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginScreen from 'routes/LoginScreen';
import PostManagement from './PostManagement.jsx'; // Cập nhật đường dẫn chính xác
import FeedbackManagement from './FeedbackManagement';
import ExerciseManagement from './ExerciseManagement';
import TrainingManagement from './TrainingManagement';
import PlanManagement from './PlanManagement';
import CommentManagement from './CommentManagement';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
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
