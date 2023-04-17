const express = require("express");
const { dbConnect } = require("../data/database");
const router = express.Router();


router.get("/", async (req, res, next) => {
    // res.render("admin.ejs")

    var facultyemail = 'archana@smail.iitpkd.ac.in'

    var fname = null

    try {
        const result = await new Promise((resolve, reject) => {
            dbConnect.query(
                `SELECT * FROM faculty WHERE email = '${facultyemail}'`,
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
        fname = result.rows[0].name

        // res.render("studentHomePage.ejs", obj );
    } catch (err) {
        next(err);
    }

    var rollnumbers = null

    try {
        const result = await new Promise((resolve, reject) => {
            dbConnect.query(
                `SELECT rollno FROM studentfaculty WHERE  facultyadvisor like '%${fname}%' `,
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
        // fname = result.rows[0].name
        rollnumbers = result.rows

        // res.render("studentHomePage.ejs", obj );
    } catch (err) {
        next(err);
    }

    console.log(rollnumbers)

    var res = []

    await rollnumbers.forEach( async element => {

        try {
            const result = await new Promise((resolve, reject) => {
                dbConnect.query(
                    `SELECT * FROM leaveApplications WHERE rollno = ${element.rollno} `,
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
            // fname = result.rows[0].name
            // console.log(result.rows)
            // await res.push(...result.rows)
            // temp = result.rows


            // res.render("studentHomePage.ejs", obj );
        } catch (err) {
            next(err);
        }

    });

    console.log(res)


    // var viewData = 'select * from leaveApplications'
    // dbConnect.query(viewData, (err, result) => {
    //     if (err) throw err;
    //     else {
    //         res.render('faculty.ejs', { title: 'Leave Applications', action: 'list', data: result.rows })
    //     }
    // })
})


module.exports = router;