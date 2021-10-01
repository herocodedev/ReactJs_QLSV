import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
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
      className:'',
      openComfirmation:false,
      editId:null,
      totalStudents:0,
      maxID:1,
      openSnackbar:false,
      snackbarInfo:''
    };
  }

  editRow = (id) => {
    console.log('editRow',id)
  }

  deleteRow = (id) => {
    console.log('deleteRow',id)
    this.setState({openComfirmation:true,editId:id})
  }

  handleCloseConfirmation = (yes) => {
    console.log('handleCloseConfirmation',yes) 
    this.setState({openComfirmation:false})
    if(yes){
      let students = [...this.state.students]
      students = students.filter((data) => data.id !== this.state.editId)
      const totalStudents = this.state.totalStudents - 1
      this.setState({students:students,totalStudents:totalStudents,openSnackbar:true,snackbarInfo:'Xóa Sinh Viên Thành Công'})
      this.props.handleTotalStudents(totalStudents)
    }
  }

  handleSnackbarClose = () => {
    this.setState({openSnackbar:false})
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
      let maxId = state.maxID
      console.log(maxId)

      newStudent.id = maxId
      newStudent.className = props.className
      newStudent.actions = newStudent.id
      students.push(newStudent)
      totalStudents++
      props.handleTotalStudents(totalStudents)
      console.log(state.students)
      return {selectedClass:props.className
        ,students:students
        ,newStudent:[]
        ,totalStudents:totalStudents
        ,maxID: maxId + 1
        ,openSnackbar:true
        ,snackbarInfo:'Thêm sinh viên thành công'  
      }

    }else{
      if(props.className !== state.selectedClass)
        props.handleTotalStudents(totalStudents)
      return {selectedClass:props.className,totalStudents:totalStudents}
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
        <Dialog
        open={this.state.openComfirmation}
        onClose={() => this.handleCloseConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn Chắc Chắn Là Xóa Sinh Viên Có ID"} {this.state.editId + ' Này?'} 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hành Động Này Không Thể Khôi Phục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCloseConfirmation(false)}>Hủy</Button>
          <Button onClick={() => this.handleCloseConfirmation(true)} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        open={this.state.openSnackbar}
        onClose={() => this.handleSnackbarClose()}
        message={this.state.snackbarInfo}
        key={{vertical:'bottom', horizontal:'right'}}
      />
      </div>
    );
  }
}

export default MyClass;
