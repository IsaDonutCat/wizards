import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Student from "./Student.jsx"
const supaKey = "sb_publishable_wZ7Og9UpSIzd6u9AwS_AMg_U9LvEnUU";
const supaUrl = "https://byyqrzsfnteoqtxtjuhp.supabase.co";
import "./App.css";
const supabase = createClient(supaUrl, supaKey);

function App() {
  const [students, setStudents] = useState(new Map());
  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState(new Map());
  
  useEffect(() => {
    getStudents();
    getCourses();
    getSchedules();
  }, []);

  async function getStudents() {
    const { data } = await supabase.from("Students").select();
    const newMap = new Map(); // Cloning the Map to keep immutability
    for (const obj of data)
    {newMap.set(obj.StudentID, obj)};
    setStudents(newMap); // Updating the state
  }
  async function getCourses() {
    const { data } = await supabase.from("Courses").select();
    const newMap = new Map(); // Cloning the Map to keep immutability
    for (const obj of data)
    {newMap.set(obj.CourseCode, obj.CourseTitle)};
    setCourses(newMap); // Updating the state
  }
  async function getSchedules() {
    const { data } = await supabase.from("Schedules").select();
    setSchedules(data);
  }

  return (
    <ul>
      {schedules.map((schedules) => (
        <Student 
        first={students.get(schedules.StudentID).First} 
        last={students.get(schedules.StudentID).Last} 
        year={students.get(schedules.StudentID).Year}
        cou1={courses.get(schedules.Course1)}
        cou2={courses.get(schedules.Course2)}
        cou3={courses.get(schedules.Course3)}
        />
      ))}
    </ul>
  );
}

export default App;