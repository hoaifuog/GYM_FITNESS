import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Modal, Form, Rate } from 'antd';
import axios from 'axios';
const URL = `https://w2fw01lr-3000.asse.devtunnels.ms`
const { Search } = Input;

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const token = localStorage.getItem('jwt_token')
  useEffect(() => {
    const fetchAllFeedbacks = async () => {
      const token = localStorage.getItem('jwt_token')
      try {
        const res = await axios.get(`${URL}/api/feedback/admin/getAllFeedbacks/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log("Check res >>> ", res.data.data);


        if (res.status == 200) {
          setFeedbacks(res.data.data)
        } else {
          throw new Error(res.message)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllFeedbacks()
  }, []);

  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user?.username || 'Không xác định',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rate',
      key: 'rate',
      render: rate => <Rate value={parseInt(rate)} disabled />
    },
    {
      title: 'Thời gian gửi',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Chi tiết</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setCurrentFeedback(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentFeedback(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URL}/api/feedback/admin/deleteById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status == 200) {
        console.log(res.data.message);
      } else {
        throw new Error(res.data.message)
      }

      setFeedbacks((feedbacks) => feedbacks.filter((item) => item._id != id))

    } catch (error) {
      console.log(error);

    }
  };

  const handleSave = (values) => {
    if (currentFeedback) {
      axios.put(`/api/feedbacks/${currentFeedback.key}`, values)
        .then(() => {
          setFeedbacks(feedbacks.map(feedback => feedback.key === currentFeedback.key ? { ...feedback, ...values } : feedback));
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error updating feedback:', error));
    } else {
      axios.post('/api/feedbacks', values)
        .then(response => {
          setFeedbacks([...feedbacks, response.data]);
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error adding feedback:', error));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: 'white' }}>Quản lý Feedback</h2>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button type="primary" onClick={handleAdd}>Thêm mới</Button> */}
        <Search placeholder="Tìm feedback" style={{ width: 300 }} />
      </Space>
      <Table columns={columns} dataSource={feedbacks} rowKey="key" />

      <Modal
        title={currentFeedback ? 'Chi tiết feedback' : 'Thêm feedback'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={currentFeedback || { user: '' || '', content: '', rate: '5' }}
          onFinish={handleSave}
        >
          <Form.Item name="user" label="Người dùng" rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="rate" label="Đánh giá" rules={[{ required: true, message: 'Vui lòng chọn mức đánh giá!' }]}>
            <Rate disabled />
          </Form.Item>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit">Lưu</Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
