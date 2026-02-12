   const { createClient } = require("@supabase/supabase-js");
   const express = require('express');
   const app = express();
   const cors = require('cors');
   const supaKey = "sb_publishable_wZ7Og9UpSIzd6u9AwS_AMg_U9LvEnUU";
   const supaUrl = "https://byyqrzsfnteoqtxtjuhp.supabase.co";
   const port = 8080;
async function main() {

   const supabase = createClient(supaUrl, supaKey);
   const stuData = await supabase.from("SrtudentRoster").select('*');
   console.log(stuData)
for (const student of stuData.data)
{
   console.log(student);
   const year = student.Year;
   const stuId = student.StudentID;
   const totCouData = [];
   const couData = await supabase
  .from('CourseListing')
  .select('CourseCode')
  .like('CourseCode', `${year}%`);
  couData.data.forEach((str)=> (totCouData.push(str)));
  const couDataPlus = await supabase
  .from('CourseListing')
  .select('CourseCode')
  .like('CourseCode', `${year+1}%`);
   couDataPlus.data.forEach((str)=> (totCouData.push(str)));
   const len = totCouData.length;
   let courseNum = ""
   console.log("start adding courses")
   for (let i = 0; i <len; i++)
   {
      courseNum = "Course" + (i+1);
      const { addErr } = await supabase
      .from('Sheet3')
      .update({ [courseNum]: `${totCouData[i].CourseCode}` })
      .eq('StudentID', `${stuId}`)

      
      if (i ==2)
      {
         break;
      }
   }
      let test = await supabase
      .from('Sheet3')
      .select()
      .eq('StudentID', `${stuId}`)
      console.log(test.data)
   }
   console.log ("finished")
// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
}

main();
