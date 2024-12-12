import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
const URL = `https://w2fw01lr-3000.asse.devtunnels.ms`
const theme = createTheme();
import useUserStore from 'store/userStore';
import { useNavigate } from 'react-router';
const getUserByEmail = async (token, email) => {

    try {
        const response = await axios.get(`${URL}/api/user/email/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.data;

        return data;
    } catch (error) {
        throw new Error(error)
    }
}
const LoginScreen = ({ navigation }) => {
    const navigate = useNavigate()
    const { user, setUser } = useUserStore()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

    const handleLogin = async () => {

        if (username && password) {

            const res = await axios.post(`${URL}/api/auth/login`, { email: username, password })
            const { token } = res.data
            console.log("Check token >>> ", token);
            if (token) {
                localStorage.setItem('jwt_token', token)
                const userData = await getUserByEmail(token, username);
                if (userData?.role == 'ADMIN') {
                    setUser(userData)
                    setAlert({ visible: true, message: 'Đăng nhập thành công! Chào mừng Admin!', type: 'success' });
                    setTimeout(() => {
                        setAlert({ visible: false, message: '', type: '' });
                        navigate('/dashboard/default');
                    }, 2000);
                } else {
                    setAlert({ visible: true, message: 'Bạn không có quyền truy cập!', type: 'error' });
                }
            } else {
                setAlert({ visible: true, message: 'Token không tồn tại!', type: 'error' });
            }


        } else {
            setAlert({ visible: true, message: 'Tên đăng nhập hoặc mật khẩu không đúng!', type: 'error' });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        padding: 3,
                        borderRadius: 1,
                        boxShadow: 3,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Đăng Nhập
                    </Typography>
                    {alert.visible && <Alert message={alert.message} type={alert.type} showIcon style={{ marginTop: 16, width: '100%' }} />}
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        style={{ width: '100%', marginTop: 16 }}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên email!' }]}
                        >
                            <Input onChange={(e) => setUsername(e.target.value)} placeholder="Địa chỉ email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="link" onClick={() => Alert.alert('Quên mật khẩu', 'Liên hệ quản trị viên.')}>
                                Quên mật khẩu?
                            </Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LoginScreen;
