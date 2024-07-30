const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];



// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users}, null, 4))//This line is to be replaced with actual return value
});

function getDateFromString(strDate){
    let [dd, mm, yyyy] = strDate.split("-");
    return new Date(yyyy + "/" + mm + "/" + dd);  // Using hyphens for better compatibility with Date constructor
}

router.get("/sort", (req, res) => {
    let sorted_users = users.sort((a, b) => {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });

    res.send(sorted_users);  // Wrap the sorted users in an object
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    let filtered_users= users.filter((user) => user.email === email);
  
    res.send(filtered_users);//This line is to be replaced with actual return value
  });
  

// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({
    "firstName":req.query.firstName,
    "lastName":req.query.lastName,
    "email":req.query.email,
    "DOB":req.query.DOB
     

  });
  res.send("The user name with "+req.query.firstName+" has been added succesfully")//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email===email);
  if(filtered_users.length > 0){
   let filtered_user = filtered_users[0];

   const DOB = req.query.DOB;
   if(DOB){
    filtered_user.DOB = DOB;
   }

   users= users.filter((user) => user.email != email);
   users.push(filtered_user);
   res.send ("the user with "+email+" has been updated for date of birth successfully");

  }else{
    res.send("Unable to find the expected email")//This line is to be replaced with actual return value
  }

  
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  users= users.filter((user)=>user.email!=email);
  res.send("The user with "+email+" has been deleted succesfully")//This line is to be replaced with actual return value
});

// GET request: Retrieve all users lastname
router.get("/lastName/:lastName",(req,res)=>{
    // Copy the code here
    const lastName = req.params.lastName;
    filtered_user_lastname = users.filter((user) => user.lastName === lastName);
    res.send(filtered_user_lastname);
  });
  
  
  

module.exports=router;
