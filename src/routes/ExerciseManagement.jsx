import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select } from 'antd';
import { Grid } from '@mui/material';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const ExerciseManagement = () => {
  const [exercises, setExercises] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

  const columns = [
    {
      title: 'Tên Bài Tập',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Bộ Phận Cơ Thể',
      dataIndex: 'bodyPart',
      key: 'bodyPart',
    },
    {
      title: 'Thiết Bị',
      dataIndex: 'equipment',
      key: 'equipment',
    },
    {
      title: 'Mục Tiêu',
      dataIndex: 'target',
      key: 'target',
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
    setCurrentExercise(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentExercise(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setExercises((prevExercises) => prevExercises.filter((exercise) => exercise.id !== id));
  };

  const handleSave = (values) => {
    if (currentExercise) {
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === currentExercise.id ? { ...exercise, ...values } : exercise
        )
      );
    } else {
      setExercises((prevExercises) => [
        ...prevExercises,
        { ...values, id: prevExercises.length + 1 },
      ]);
    }
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2 style={{ color: 'white' }}>Quản lý bài tập</h2>
        </Grid>
        <Grid item>
          <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />} style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
            Thêm bài tập
          </Button>
        </Grid>
      </Grid>
      <Table columns={columns} dataSource={exercises} rowKey="id" />

      <Modal
        title={currentExercise ? 'Chỉnh sửa bài tập' : 'Thêm bài tập'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={currentExercise || { name: '', bodyPart: '', equipment: '', gifUrl: '', target: '' }}
          onFinish={handleSave}
        >
          <Form.Item name="name" label="Tên bài tập" rules={[{ required: true, message: 'Vui lòng nhập tên bài tập!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="bodyPart" label="Bộ phận cơ thể" rules={[{ required: true, message: 'Vui lòng nhập bộ phận cơ thể!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="equipment" label="Thiết bị" rules={[{ required: true, message: 'Vui lòng nhập thiết bị!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gifUrl" label="URL ảnh GIF" rules={[{ required: true, message: 'Vui lòng nhập URL ảnh GIF!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="target" label="Mục tiêu" rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="secondaryMuscles" label="Cơ phụ">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập cơ phụ">
              <Option value="Biceps">Biceps</Option>
              <Option value="Triceps">Triceps</Option>
              <Option value="Shoulders">Shoulders</Option>
            </Select>
          </Form.Item>
          <Form.Item name="instructions" label="Hướng dẫn">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập hướng dẫn">
              <Option value="Warm-up">Warm-up</Option>
              <Option value="Stretching">Stretching</Option>
              <Option value="Cool-down">Cool-down</Option>
            </Select>
          </Form.Item>
          <Form.Item name="levels" label="Cấp độ">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập cấp độ">
              <Option value="Beginner">Beginner</Option>
              <Option value="Intermediate">Intermediate</Option>
              <Option value="Advanced">Advanced</Option>
            </Select>
          </Form.Item>
          <Form.Item name="purposes" label="Mục đích">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập mục đích">
              <Option value="Strength">Strength</Option>
              <Option value="Endurance">Endurance</Option>
              <Option value="Flexibility">Flexibility</Option>
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

export default ExerciseManagement;
