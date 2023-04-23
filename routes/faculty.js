const express = require("express");
const { dbConnect } = require("../data/database");
const router = express.Router();


router.get("/:EMAIL_ID", async (req, res, next) => {
    // res.render("admin.ejs")

    // var facultyemail = 'johnson@smail.iitpkd.ac.in'

    var facultyemail = req.params.EMAIL_ID

    // console.log(req.user.emails)

    var data = null

    try {
        const result = await new Promise((resolve, reject) => {
            dbConnect.query(
                `select * from leaveapplications natural join studentfaculty where faculty_email = '${facultyemail}';`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        // temp.studentInfo = result.rows;
        data = result.rows

        // res.render("studentHomePage.ejs", obj );
    } catch (err) {
        next(err);
    }

    // console.log(data)

    res.render('faculty.ejs', { title: 'Leave Applications', action: 'list', data })

    // var viewData = 'select * from leaveApplications'
    // dbConnect.query(viewData, (err, result) => {
    //     if (err) throw err;
    //     else {
            
    //     }
    // })
})


router.get("/:rollId",(req,res)=>{
    // res.render("../views/approveForm.ejs")
    const id  = req.params.rollId;
    // console.log(req.params)
    var getForm = `select * from leaveApplications where rollno = ${id} and fa_approval = 'Pending'`
    dbConnect.query(getForm,(err,result)=>{
    if(err) throw err;
    else{
        console.log(result.rows[0])
        res.render('../views/facultyapproval.ejs',{data : result.rows[0]})
    }
});
});


module.exports = router;



// router.get("/", async (req, res, next) => {
//     // res.render("admin.ejs")

//     var facultyemail = 'archana@smail.iitpkd.ac.in'

//     var fname = null

//     try {
//         const result = await new Promise((resolve, reject) => {
//             dbConnect.query(
//                 `SELECT * FROM faculty WHERE email = '${facultyemail}'`,
//                 (err, result) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(result);
//                     }
//                 }
//             );
//         });

//         // temp.studentInfo = result.rows;
//         fname = result.rows[0].name

//         // res.render("studentHomePage.ejs", obj );
//     } catch (err) {
//         next(err);
//     }

//     var rollnumbers = null

//     try {
//         const result = await new Promise((resolve, reject) => {
//             dbConnect.query(
//                 `SELECT rollno FROM studentfaculty WHERE  facultyadvisor like '%${fname}%' `,
//                 (err, result) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(result);
//                     }
//                 }
//             );
//         });

//         // temp.studentInfo = result.rows;
//         // fname = result.rows[0].name
//         rollnumbers = result.rows

//         // res.render("studentHomePage.ejs", obj );
//     } catch (err) {
//         next(err);
//     }

//     console.log(rollnumbers)

//     var res = []

//     await rollnumbers.forEach( async element => {

//         try {
//             const result = await new Promise((resolve, reject) => {
//                 dbConnect.query(
//                     `SELECT * FROM leaveApplications WHERE rollno = ${element.rollno} `,
//                     (err, result) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(result);
//                         }
//                     }
//                 );
//             });

//             // temp.studentInfo = result.rows;
//             // fname = result.rows[0].name
//             console.log(result.rows)
//             res.push(...result.rows)
//             // temp = result.rows


//             // res.render("studentHomePage.ejs", obj );
//         } catch (err) {
//             next(err);
//         }

//     });
    
//     // console.log('hello')
//     // console.log(res)
//     // console.log('hello')


//     // var viewData = 'select * from leaveApplications'
//     // dbConnect.query(viewData, (err, result) => {
//     //     if (err) throw err;
//     //     else {
//     //         res.render('faculty.ejs', { title: 'Leave Applications', action: 'list', data: result.rows })
//     //     }
//     // })
// })


// module.exports = router;
