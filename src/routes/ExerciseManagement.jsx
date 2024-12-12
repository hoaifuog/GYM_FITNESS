import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select } from 'antd';
import { Grid } from '@mui/material';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const URL = `https://w2fw01lr-3000.asse.devtunnels.ms`
const { Option } = Select;

const getAllExercisesBySearchQueryName = async (searchQueryName, { limit, skip, bodyParts, equipments }) => {
  const token = localStorage.getItem('jwt_token');

  try {
    const res = await axios.get(`${URL}/api/exercises/getAllExercisesBySearchQueryName/${searchQueryName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

const ExerciseManagement = () => {
  const token = localStorage.getItem('jwt_token');
  const [exercises, setExercises] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [formExe, setFormExe] = useState({
    name: "",
    bodyPart: "",
    equipment: "",
    gifUrl: "",
    target: "",
    secondaryMuscles: [],
    instructions: [],
    levels: [],
    purposes: []
  });

  const limit = 25;

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'gifUrl',
      key: 'gifUrl',
    },
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
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setCurrentExercise(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setIsEdit(true);
    setFormExe(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URL}/api/exercises/admin/deleteExercisesById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 200) {
        setExercises((prevExercises) => prevExercises.filter((exercise) => exercise._id !== id));
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (isEdit) {
      const updatedData = await axios.put(`${URL}/api/exercises/admin/updateExercise`, formExe, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise._id === updatedData.data._id ? { ...exercise, ...updatedData.data } : exercise
        )
      );
      setCurrentExercise(null);

      setFormExe({
        name: "",
        bodyPart: "",
        equipment: "",
        gifUrl: "",
        target: "",
        secondaryMuscles: [],
        instructions: [],
        levels: [],
        purposes: []
      });
      setIsEdit(false);
    } else {
      const newData = await axios.post(`${URL}/api/exercises/admin/createNewExercise`, formExe, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setExercises((prevExercises) => [
        ...prevExercises,
        { ...newData.data },
      ]);
    }
    setIsModalVisible(false);
  };

  const handleSearch = async (value) => {
    console.log("Check search Qr >>> ", value);
    setSearchQuery(value);


    setSkip(0);
    try {
      const res = await getAllExercisesBySearchQueryName(value, {
        limit,
        skip: 0,
        bodyParts: null,
        equipments: null
      });

      setExercises(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    const fetchDataByQuery = async (isSearchReset = false) => {
      try {
        if (isSearchReset) {
          setSkip(0);
        }

        const res = await getAllExercisesBySearchQueryName(searchQuery || 'cable', {
          limit,
          skip: isSearchReset ? 0 : skip,
          bodyParts: null,
          equipments: null
        });

        const newExercises = res.data;
        setExercises((prevExercises) => isSearchReset ? newExercises : [...prevExercises, ...newExercises]);

        if (newExercises.length > 0) {
          setSkip((prevSkip) => prevSkip + limit);
        }
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchDataByQuery(true);
  }, [searchQuery]);

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
      <Grid container style={{ marginBottom: 20 }}>
        <Input.Search
          placeholder="Tìm kiếm bài tập"
          enterButton
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          style={{ width: '100%' }}
        />
      </Grid>
      <Table columns={columns} dataSource={exercises} rowKey="id" />

      <Modal
        onClose={() => {
          setIsEdit(false);
          setFormExe({
            name: "",
            bodyPart: "",
            equipment: "",
            gifUrl: "",
            target: "",
            secondaryMuscles: [],
            instructions: [],
            levels: [],
            purposes: []
          });
        }}
        title={currentExercise ? 'Chỉnh sửa bài tập' : 'Thêm bài tập'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={formExe}
          onFinish={handleSave}
        >
          <Form.Item name="name" label="Tên bài tập" rules={[{ required: true, message: 'Vui lòng nhập tên bài tập!' }]}>
            <Input onChange={(e) => setFormExe((form) => ({ ...form, name: e.target.value }))} />
          </Form.Item>
          <Form.Item name="bodyPart" label="Bộ phận cơ thể" rules={[{ required: true, message: 'Vui lòng nhập bộ phận cơ thể!' }]}>
            <Input onChange={(e) => setFormExe((form) => ({ ...form, bodyPart: e.target.value }))} />
          </Form.Item>
          <Form.Item name="equipment" label="Thiết bị" rules={[{ required: true, message: 'Vui lòng nhập thiết bị!' }]}>
            <Input onChange={(e) => setFormExe((form) => ({ ...form, equipment: e.target.value }))} />
          </Form.Item>
          <Form.Item name="gifUrl" label="URL ảnh GIF" rules={[{ required: true, message: 'Vui lòng nhập URL ảnh GIF!' }]}>
            <Input onChange={(e) => setFormExe((form) => ({ ...form, gifUrl: e.target.value }))} />
          </Form.Item>
          <Form.Item name="target" label="Mục tiêu" rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}>
            <Input onChange={(e) => setFormExe((form) => ({ ...form, target: e.target.value }))} />
          </Form.Item>
          <Form.Item name="secondaryMuscles" label="Cơ phụ">
            <Select onChange={(e) => setFormExe((form) => ({ ...form, secondaryMuscles: [...e] }))} mode="tags" style={{ width: '100%' }} placeholder="Nhập cơ phụ">
            // Continuing from where we left off...
              <Option value="Biceps">Biceps</Option>
              <Option value="Triceps">Triceps</Option>
              <Option value="Shoulders">Shoulders</Option>
            </Select>
          </Form.Item>
          <Form.Item name="instructions" label="Hướng dẫn">
            <Select onChange={(e) => setFormExe((form) => ({ ...form, instructions: [...e] }))} mode="tags" style={{ width: '100%' }} placeholder="Nhập hướng dẫn">
              <Option value="Warm-up">Warm-up</Option>
              <Option value="Stretching">Stretching</Option>
              <Option value="Cool-down">Cool-down</Option>
            </Select>
          </Form.Item>
          <Form.Item name="levels" label="Cấp độ">
            <Select onChange={(e) => setFormExe((form) => ({ ...form, levels: [...e] }))} mode="tags" style={{ width: '100%' }} placeholder="Nhập cấp độ">
              <Option value="Beginner">Người mới bắt đầu</Option>
              <Option value="Intermediate">Trung cấp</Option>
              <Option value="Advanced">Thâm niên</Option>
            </Select>
          </Form.Item>
          <Form.Item name="purposes" label="Mục đích">
            <Select onChange={(e) => setFormExe((form) => ({ ...form, purposes: [...e] }))} mode="tags" style={{ width: '100%' }} placeholder="Nhập mục đích">
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