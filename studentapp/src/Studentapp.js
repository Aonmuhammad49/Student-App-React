import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Student = () => {
  let [Name, setstudentName] = useState("");
  let [Course, setCourse] = useState("");
  let [student, setstudent] = useState([]);
  let [status, setstatus] = useState(false);
  const [index, setindex] = useState();

  const submitform = () => {
    if (Name === "" || Course === "") {
      toast.error("Please fill in both fields.");
      return;
    } else {
      let data = {
        "Student Name": Name,
        "Course": Course,
      };
      setstudent([data, ...student]);
      setstudentName("");
      setCourse("");
      toast.success("Student added successfully.");
    }
  };

  const Deletebutton = (index) => {
    let data = [...student];
    data.splice(index, 1);
    setstudent(data);
    setstudentName("");
    setCourse("");
    setstatus(false);  // Reset status to false after deleting
    toast.success("Student deleted successfully.");
  };

  const Editbutton = (index) => {
    setstudentName(student[index]["Student Name"]);
    setCourse(student[index]["Course"]);
    setstatus(true);
    setindex(index);
  };

  const updatedata = () => {
    let updatedStudents = [...student];
    updatedStudents[index] = {
      "Student Name": Name,
      "Course": Course,
    };
    setstudent(updatedStudents);
    setindex(null);
    setstatus(false);
    setstudentName("");
    setCourse("");
    toast.success("Student updated successfully.");
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <h1>Student App</h1>
        <div className="Student-Box">
          <label>
            Student Name:
            <br />
            <input type="text" value={Name} onChange={(e) => setstudentName(e.target.value)}
            />
          </label>
          <label>
            Course Name:
            <br />
            <input type="text" value={Course} onChange={(e) => setCourse(e.target.value)}
            />
          </label>
          <div className="AddTodo">
            {status ? (
              <button className="Update" onClick={updatedata}>
                Update Student
              </button>
            ) : (
              <button className="Add" onClick={submitform}>
                Add Student
              </button>
            )}
          </div>
        </div>

        {student.map((v, i) => {
          return (
            <div key={i} className="Student-Box-Data">
              <div className="StudentData">
                <h1 className="Heading">{v["Student Name"]}</h1>
                <p className="Paragraph">{v["Course"]}</p>
              </div>
              <div className="EditDelete">
                <button className="Compelete" onClick={() => Editbutton(i)}>
                  Complete
                </button>
                <br />
                <button className="Delete" onClick={() => Deletebutton(i)}>
                  Delete
                </button>
                <br />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Student;
