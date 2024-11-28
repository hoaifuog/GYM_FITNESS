import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, Checkbox } from 'antd';
import { Grid } from '@mui/material';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTraining, setCurrentTraining] = useState(null);

  const columns = [
    {
      title: 'Tên Chương Trình',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Người Dùng',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'isCustom',
      key: 'isCustom',
      render: (isCustom) => (isCustom ? 'Có' : 'Không'),
    },
    {
      title: 'Trong Kế Hoạch',
      dataIndex: 'isInPlan',
      key: 'isInPlan',
      render: (isInPlan) => (isInPlan ? 'Có' : 'Không'),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setCurrentTraining(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentTraining(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setTrainings((prevTrainings) => prevTrainings.filter((training) => training.id !== id));
  };

  const handleSave = (values) => {
    if (currentTraining) {
      setTrainings((prevTrainings) =>
        prevTrainings.map((training) =>
          training.id === currentTraining.id ? { ...training, ...values } : training
        )
      );
    } else {
      setTrainings((prevTrainings) => [
        ...prevTrainings,
        { ...values, id: prevTrainings.length + 1 },
      ]);
    }
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2 style={{ color: 'white' }}>Quản lý chương trình tập luyện</h2>
        </Grid>
        <Grid item>
          <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />} style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
            Thêm chương trình
          </Button>
        </Grid>
      </Grid>
      <Table columns={columns} dataSource={trainings} rowKey="id" />

      <Modal
        title={currentTraining ? 'Chỉnh sửa chương trình tập luyện' : 'Thêm chương trình tập luyện'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={currentTraining || { title: '', name: '', image: '', isCustom: false, isInPlan: false, planId: '', exercises: [] }}
          onFinish={handleSave}
        >
          <Form.Item name="title" label="Tên chương trình" rules={[{ required: true, message: 'Vui lòng nhập tên chương trình!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Tên người dùng" rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Input />
          </Form.Item>
          <Form.Item name="isCustom" valuePropName="checked">
            <Checkbox>Tùy chỉnh</Checkbox>
          </Form.Item>
          <Form.Item name="isInPlan" valuePropName="checked">
            <Checkbox>Trong kế hoạch</Checkbox>
          </Form.Item>
          <Form.Item name="planId" label="ID kế hoạch">
            <Input />
          </Form.Item>
          <Form.Item name="exercises" label="Bài tập">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập bài tập">
              {/* Add exercise options dynamically */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1890FF', borderColor: '#1890FF' }}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrainingManagement;
