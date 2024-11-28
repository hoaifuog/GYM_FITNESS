import React, { useState } from 'react';
import { Table, Button, Space, Input, Modal, Form, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Search } = Input;

const PostManagement = () => {
  const [posts, setPosts] = useState([
    {
      key: '1',
      content: 'Nội dung bài viết 1',
      author: 'Admin',
      created_at: '2024-11-25',
      likes: ['user1', 'user2'],
      allowComment: true,
    },
    {
      key: '2',
      content: 'Nội dung bài viết 2',
      author: 'Editor',
      created_at: '2024-11-20',
      likes: [],
      allowComment: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const columns = [
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Lượt thích',
      dataIndex: 'likes',
      key: 'likes',
      render: (likes) => likes.length,
    },
    {
      title: 'Bình luận',
      dataIndex: 'allowComment',
      key: 'allowComment',
      render: (allowComment) => (allowComment ? 'Cho phép' : 'Không cho phép'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              backgroundColor: '#1890FF',
              borderColor: '#1890FF',
              color: '#FFF',
            }}
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            style={{
              backgroundColor: '#FF4D4F',
              borderColor: '#FF4D4F',
              color: '#FFF',
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setCurrentPost(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentPost(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.key !== key));
  };

  const handleSave = (values) => {
    if (currentPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.key === currentPost.key ? { ...post, ...values } : post))
      );
    } else {
      setPosts((prevPosts) => [
        ...prevPosts,
        { key: `${prevPosts.length + 1}`, ...values, created_at: new Date().toISOString().split('T')[0] },
      ]);
    }
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: 'white' }} >Quản lý bài viết</h2>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleAdd}
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50', color: '#FFF' }}
        >
          Thêm mới
        </Button>
        <Search placeholder="Tìm bài viết" style={{ width: 300 }} />
      </Space>
      <Table columns={columns} dataSource={posts} />

      <Modal
        title={currentPost ? 'Sửa bài viết' : 'Thêm bài viết'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={currentPost || { content: '', author: '', allowComment: true }}
          onFinish={handleSave}
        >
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          >
            <Input placeholder="Nhập nội dung" style={{ borderRadius: '5px' }} />
          </Form.Item>
          <Form.Item
            name="author"
            label="Tác giả"
            rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
          >
            <Input placeholder="Nhập tác giả" style={{ borderRadius: '5px' }} />
          </Form.Item>
          <Form.Item name="allowComment" label="Cho phép bình luận" valuePropName="checked">
            <Checkbox>Cho phép bình luận</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1890FF', borderColor: '#1890FF', color: '#FFF' }}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostManagement;
