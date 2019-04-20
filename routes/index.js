var express = require('express');
var router = express.Router();

var request = require('request');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

const stripe = require("stripe")("xxxxxxxx");

router.use(require("body-parser").text());



/*options defined to wait for server response*/
var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 5000
    }
  }
};

/*mongoose.connect function defines calls to mlab database*/
mongoose.connect('xxxxxxxxxx',
  options,
  function(err) {
    console.log(err);
  }
);

/*------ ProjectSchema -------*/

var projectSchema = mongoose.Schema({
  contributors: Number,
  currentAmount: Number,
  adminAgree: Boolean,
  projectLeaderName: String,
  projectLeaderSurname: String,
  projectLeaderEmail: String,
  projectLeaderPhone: String,
  projectLeaderAddress: String,
  projectLeaderPostalCode: String,
  projectLeaderCity: String,
  sector: String,
  projectTitle: String,
  projectShortDescription: String,
  projectStory: String,
  projectGoal: String,
  projectAction: String,
  budgetGoal: Number,
  budgetAllocation: String,
  projectLeaderStory: String,
  projectLeaderAmbition: String,
  facebookLink: String,
  instagramLink: String,
  websiteLink: String,
  rewards: [
    {
      rewardsAmount: Number,
      rewardsTitle: String,
      rewardsDescription: String
    },
  ]
});

/*------ AdminSchema -------*/

var adminSchema = mongoose.Schema({
  email: String,
  password: String
})

/*------ ProjectModel -------*/

var ProjectModel = mongoose.model('project', projectSchema);

/*------ AdminModel -------*/

var AdminModel = mongoose.model('admin', adminSchema);

//-----Add new project && contributors-----//

router.post('/addproject', function(req, res, next) {

  var newProject = new ProjectModel({
    contributors: 0,
    currentAmount: 0,
    adminAgree:req.body.adminAgree,
    projectLeaderName:req.body.projectLeaderName,
    projectLeaderSurname: req.body.projectLeaderSurname,
    projectLeaderEmail: req.body.projectLeaderEmail,
    projectLeaderPhone: req.body.projectLeaderPhone,
    projectLeaderAddress: req.body.projectLeaderAddress,
    projectLeaderPostalCode: req.body.projectLeaderPostalCode,
    projectLeaderCity: req.body.projectLeaderCity,
    sector: req.body.sector,
    projectTitle: req.body.projectTitle,
    projectShortDescription: req.body.projectShortDescription,
    projectStory: req.body.projectStory,
    projectGoal: req.body.projectGoal,
    projectAction: req.body.projectAction,
    budgetGoal: req.body.budgetGoal,
    budgetAllocation: req.body.budgetAllocation,
    projectLeaderStory: req.body.projectLeaderStory,
    projectLeaderAmbition: req.body.projectLeaderAmbition,
    facebookLink: req.body.facebookLink,
    instagramLink: req.body.instagramLink,
    websiteLink: req.body.websiteLink,
    rewards: [

      {
        rewardsAmount: req.body.rewardsAmount1,
        rewardsTitle: req.body.rewardsTitle1,
        rewardsDescription: req.body.rewardsDescription1,
      },

      {
        rewardsAmount: req.body.rewardsAmount2,
        rewardsTitle: req.body.rewardsTitle2,
        rewardsDescription: req.body.rewardsDescription2,
      },

      {
        rewardsAmount: req.body.rewardsAmount3,
        rewardsTitle: req.body.rewardsTitle3,
        rewardsDescription: req.body.rewardsDescription3,
      },

      {
        rewardsAmount: req.body.rewardsAmount4,
        rewardsTitle: req.body.rewardsTitle4,
        rewardsDescription: req.body.rewardsDescription4,
      },

      {
        rewardsAmount: req.body.rewardsAmount5,
        rewardsTitle: req.body.rewardsTitle5,
        rewardsDescription: req.body.rewardsDescription5,
      },

      {
        rewardsAmount: req.body.rewardsAmount6,
        rewardsTitle: req.body.rewardsTitle6,
        rewardsDescription: req.body.rewardsDescription6,
      },

      {
        rewardsAmount: req.body.rewardsAmount7,
        rewardsTitle: req.body.rewardsTitle7,
        rewardsDescription: req.body.rewardsDescription7,
      },

      {
        rewardsAmount: req.body.rewardsAmount8,
        rewardsTitle: req.body.rewardsTitle8,
        rewardsDescription: req.body.rewardsDescription8,
      },

      {
        rewardsAmount: req.body.rewardsAmount9,
        rewardsTitle: req.body.rewardsTitle9,
        rewardsDescription: req.body.rewardsDescription9,
      },

      {
        rewardsAmount: req.body.rewardsAmount10,
        rewardsTitle: req.body.rewardsTitle10,
        rewardsDescription: req.body.rewardsDescription10,
      }
    ]
  });



  newProject.save(
    function(error, location) {
      console.log(error);
      res.json('location');
    }
  );
});

//-----Finds existing admin-----//
router.post('/signin', function(req, res, next) {

  AdminModel.findOne({
      email: req.body.email,
      password: req.body.password,
    },
    function(err, admin) {
      console.log('admin', admin)
      res.json(admin);
    }
  )

});

//-----Finds admin Project Details-----//
router.post('/findProjectDetails', function(req, res, next) {

  ProjectModel.findOne({
      _id: req.body._id,
    },
    function(err, project) {
      console.log('project', project)
      res.json(project);
    }
  )

});


//------ Update contributors & currentAmount ----//

router.put('/updateBudget', function(req, res, next) {
ProjectModel.updateOne(
    { _id: req.body._id},
    { contributors: req.body.contributors, currentAmount: req.body.currentAmount },
    function(error, raw) {

    }
);
});

//------ Update Admin Project Description ----//


router.put('/updateProject', function(req, res, next) {
ProjectModel.updateOne(
    { _id: req.body._id},
    { projectStory: req.body.projectStory,
      projectAction: req.body.projectAction,
      projectGoal: req.body.projectGoal,
      projectLeaderStory: req.body.projectLeaderStory,
      projectLeaderAmbition: req.body.projectLeaderAmbition,
      budgetAllocation: req.body.budgetAllocation},
    function(error, raw) {

    }
);
});

//------ Update aggreement to display the projet on the platform ----//

router.put('/updateDisplayProject', function(req, res, next) {

ProjectModel.updateOne(
    { _id: req.body._id},
    { adminAgree: req.body.adminAgree},
    function(error, raw) {

    }
);
});

//------ Delete  ----//
router.post("/removeProject", function(req, res) {
  ProjectModel.deleteOne(
    {_id: req.body._id},
    function(error, raw) {

    }
  );
});

//-----Get all projects-----//

router.get('/displayProjects', function(req, res, next) {

  ProjectModel.find(
    function(err, projects) {
     res.json({projects});
      // console.log(projects);
      // console.log(err);
    }
  )

});




//-----Stripe payment-----//

router.post('/charge', async (req, res) => {
  const charge = {
    source: req.body.token.id,
    amount: req.body.amount,
    description: req.body.description,
    currency: "eur",
    metadata:{
          'Prénom': req.body.firstName,
          'Nom': req.body.lastName,
          'Téléphone': req.body.phone,
          'Adresse de livraison': req.body.address,
          "Ville": req.body.city,
          "Code postal": req.body.postalCode,
        }
    }


  const client = {
    email: req.body.token.email,
    description: req.body.firstName+' '+req.body.lastName,
    metadata:{
          'Projet soutenu': req.body.description,
          'Téléphone': req.body.phone,
          'Adresse de livraison': req.body.address,
          "Ville": req.body.city,
          "Code postal": req.body.postalCode,
        }
  }

  try {
  let {status} = stripe.charges.create(charge) && stripe.customers.create(client);
    console.log('le statut', status)
    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});


//-------- NodeMailer init -------////

router.post("/sendemail", function(req, res) {

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxxxx',
    pass: 'xxxxxx'
  }
});

var mailOptions = {
  from: req.body.email,
  to: 'xxxxxx',
  subject: req.body.subject + '  //  '+ req.body.email + '  //  ' + req.body.name,
  text: req.body.textArea,

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    }
  });
})





module.exports = router;
