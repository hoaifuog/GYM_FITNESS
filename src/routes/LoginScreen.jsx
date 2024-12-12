import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme();

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

    const handleLogin = (values) => {
        console.log('Đã gọi handleLogin');
        const { username, password } = values;
        if (username === 'admin' && password === 'admin123') {
            setAlert({ visible: true, message: 'Đăng nhập thành công! Chào mừng Admin!', type: 'success' });
            setTimeout(() => {
                setAlert({ visible: false, message: '', type: '' });
                navigation.navigate('/dashboard/default');
            }, 2000);
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
                            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                        >
                            <Input placeholder="Tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password placeholder="Mật khẩu" />
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
