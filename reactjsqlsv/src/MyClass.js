import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import moment from 'moment';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';

class MyClass extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
          <strong>
            <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => this.editRow(params.value)}
          >
              <EditIcon />
            </IconButton>
            <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => this.deleteRow(params.value)}
          >
              <DeleteForeverIcon />
            </IconButton>
          </strong>
        ),
      },
      {
        field: "id",
        headerName: "ID",
        width: 80,
      },
      {
        field: "firstName",
        headerName: "Tên",
        width: 150,
      },
      {
        field: "lastName",
        headerName: "Họ",
        width: 150,
      },
      {
        field: "phone",
        headerName: "Số điện thoại",
        width: 150,
      },
      {
        field: "dob",
        headerName: "Ngày Sinh",
        width: 150,
      },
      {
        field: "country",
        headerName: "Quốc gia",
        width: 150,
      },
      {
        field: "picture",
        headerName: "Avatar",
        width: 150,
      },
    ];

    this.state = {
      columns: columns,
      students: [], // Ban đầu students của mình là 1 mảng rỗng
      newStudent: [],
      displayStudents: [],
      selectedClass:props.selectedClass,
      className:''
    };
  }

  editRow = (id) => {
    console.log('editRow',id)
  }

  deleteRow = (id) => {
    console.log('deleteRow',id)
  }

  handleClassChange = (selectedClass) => {
    // console.log("MyClass chọn: ", selectedClass);
    this.setState({ selectedClass: selectedClass });
  };

  static getDerivedStateFromProps(props,state){
    let totalStudents = 0
    if(!props.className || props.className===''){
      totalStudents = state.students.length
    }else{
      let displayStudents = [...state.students]
      displayStudents = displayStudents.filter((data) => data.className === props.className)
      totalStudents = displayStudents.length
    }
    if(props.className && props.newStudent.length>0){
      const students = [...state.students]
      const newStudent = props.newStudent[0]

      newStudent.id = students.length + 1
      newStudent.className = props.className
      newStudent.actions = newStudent.id
      students.push(newStudent)
      totalStudents++
      props.handleTotalStudents(totalStudents)
      return {selectedClass:props.className,students:students,newStudent:[]}
    }else{
      if(props.className !== state.selectedClass)
        props.handleTotalStudents(totalStudents)
      return {selectedClass:props.className}
    }
  }

  render() {
    // console.log('MyClass render students',this.state.students)
    let displayStudents = [...this.state.students];

    displayStudents = displayStudents.filter((data) => {
      return data.className === this.state.selectedClass
    })
    // console.log('MyClass render displayStudents',displayStudents)

    return (
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={displayStudents} columns={this.state.columns} />
      </div>
    );
  }
}

export default MyClass;
