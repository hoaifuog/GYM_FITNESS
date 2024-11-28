import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select } from 'antd';
import { Grid } from '@mui/material';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const PlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const columns = [
    {
      title: 'Tên Kế Hoạch',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Người Dùng',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Giới Tính',
      dataIndex: 'gender',
      key: 'gender',
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
    setCurrentPlan(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentPlan(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };

  const handleSave = (values) => {
    if (currentPlan) {
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === currentPlan.id ? { ...plan, ...values } : plan
        )
      );
    } else {
      setPlans((prevPlans) => [
        ...prevPlans,
        { ...values, id: prevPlans.length + 1 },
      ]);
    }
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2 style={{ color: 'white' }}>Quản lý kế hoạch tập luyện</h2>
        </Grid>
        <Grid item>
          <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />} style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
            Thêm kế hoạch
          </Button>
        </Grid>
      </Grid>
      <Table columns={columns} dataSource={plans} rowKey="id" />

      <Modal
        title={currentPlan ? 'Chỉnh sửa kế hoạch tập luyện' : 'Thêm kế hoạch tập luyện'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={currentPlan || { name: '', user: '', gender: '', image: '', trainings: [] }}
          onFinish={handleSave}
        >
          <Form.Item name="name" label="Tên kế hoạch" rules={[{ required: true, message: 'Vui lòng nhập tên kế hoạch!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="user" label="Tên người dùng" rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính">
            <Select style={{ width: '100%' }} placeholder="Chọn giới tính">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Input />
          </Form.Item>
          <Form.Item name="trainings" label="Bài tập">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập bài tập">
              {/* Add training options dynamically */}
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

export default PlanManagement;
