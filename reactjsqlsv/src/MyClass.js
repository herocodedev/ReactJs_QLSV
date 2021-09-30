import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import moment from 'moment';
class MyClass extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
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
      newStudent.id = students.length
      newStudent.className = props.className
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
