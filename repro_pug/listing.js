require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const fs = require('fs');
const AWS = require('aws-sdk');
var multiparty = require('multiparty');
var multer  = require('multer');
const multers3 = require("multer-s3");
var rimraf = require("rimraf");




router.get('/listing',(req,res) => {
 // if (req.session.loggedin) { 
    user_id = req.session.userid
    db.query("select * from property_type;", function (err, result) {   
      if (err) throw err; 
      
    res.render('listingForm',{title: 'Add property Form', property_type: result})
    })
 //   } 
    // else {
    //   res.send('Please login to view this page!');
    // }
   }) 


router.post('/listing2',(req,res) => { 

  

  const imageUploadPath = path.join(__dirname,'./pictures')
  const videoUploadPath = path.join(__dirname,'./videos')
  const floorplanUploadPath = path.join(__dirname,'./floorplans')
  
  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      if (file.fieldname === "property_picture") { 
      callback(null, './pictures');
      } 
      if (file.fieldname === "property_video") {
        callback(null, './videos');
      } else {
        if (file.fieldname === "floor_plan") {
          callback(null, './floorplans');
        }
      }
  
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + '-' + Date.now());
    }
  });
  
  
  
  
  var upload = multer({ storage : storage}).fields([{ name: 'property_picture', maxCount: 6 }, { name: 'property_video', maxCount: 1 }, { name: 'floor_plan', maxCount: 1 }])
  
  if (req.session.loggedin) {
    user_id = req.session.userid

      upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading Pictures.");
        }
        console.log(req.files)
        console.log(req.body.property_type.length)
      
        console.log("File is uploaded");

     
      property_type = req.body.property_type === undefined ? null:req.body.property_type
      property_tag = req.body.property_tag === undefined ? null:req.body.property_tag
      street_name = req.body.street_name === undefined ? null:req.body.street_name
      lat = req.body.lat === undefined ? null:req.body.lat
      long = req.body.long === undefined ? null:req.body.long
    //  major_terminal = req.body.major_terminal === undefined ? null:req.body.major_terminal
      lga = req.body.lga === undefined ? null:req.body.lga
    //  zip_code = req.body.zip_code === undefined ? null:req.body.zip_code
   //   town = req.body.town === undefined ? null:req.body.town
      state = req.body.state === undefined ? null:req.body.state
      country = req.body.country === undefined ? null:req.body.country
      purpose = req.body.purpose === undefined ? null:req.body.purpose
      property_description = req.body.property_description === undefined ? null:req.body.property_description
      bed = req.body.bed === undefined ? null:req.body.bed
      bath = req.body.bath === undefined ? null:req.body.bath
      sqft = req.body.sqft === undefined ? null:req.body.sqft
      acres = req.body.acres === undefined ? null:req.body.acres
      year_built = req.body.year_built === undefined ? null:req.body.year_built
      floors = req.body.floors === undefined ? null:req.body.floors
      furnished = req.body.furnished === undefined ? 'no':req.body.furnished
      serviced = req.body.serviced === undefined ? 'no':req.body.serviced
      newly_built = req.body.newly_built === undefined ? 'no':req.body.newly_built
      air_conditioning = req.body.air_conditioning === undefined ? null:req.body.air_conditioning
      washer = req.body.washer === undefined ? null:req.body.washer
      parking = req.body.parking === undefined ? null:req.body.parking
      dish_washer = req.body.dish_washer === undefined ? 'no':req.body.dish_washer
      electric_fence = req.body.electric_fence === undefined ? 'no':req.body.electric_fence
      deck = req.body.deck === undefined ? 'no':req.body.deck
      storage = req.body.storage === undefined ? 'no':req.body.storage
      alarm = req.body.alarm === undefined ? 'no':req.body.alarm
      cctv = req.body.cctv === undefined ? 'no':req.body.cctv
      freezer = req.body.freezer === undefined ? 'no':req.body.freezer
      water_heater = req.body.water_heater === undefined ? 'no':req.body.water_heater
      pool = req.body.pool === undefined ? 'no':req.body.pool
      garden = req.body.garden === undefined ? 'no':req.body.garden
      exhaust_fan = req.body.exhaust_fan === undefined ? 'no':req.body.exhaust_fan
      fire_place = req.body.fire_place === undefined ? 'no':req.body.fire_place
      security_post = req.body.security_post === undefined ? 'no':req.body.security_post
      heat_extractor = req.body.heat_extractor === undefined ? 'no':req.body.heat_extractor
      balcony = req.body.balcony === undefined ? 'no':req.body.balcony
      garbage_disposer = req.body.garbage_disposer === undefined ? 'no':req.body.garbage_disposer
      pet = req.body.pet === undefined ? null:req.body.pet
      amount = req.body.amount === undefined ? null:req.body.amount
      min_duration = req.body.min_duration === undefined ? null:req.body.min_duration
      frequency = req.body.frequency === undefined ? null:req.body.frequency
      least_deposit = req.body.least_deposit === undefined ? null:req.body.least_deposit
      least_monthly_payment = req.body.least_monthly_payment === undefined ? null:req.body.least_monthly_payment
      max_duration = req.body.max_duration === undefined ? null:req.body.max_duration
      lease_value = req.body.lease_value === undefined ? null:req.body.lease_value
      lease_duration = req.body.lease_duration === undefined ? null:req.body.lease_duration
      lease_deposit = req.body.lease_deposit === undefined ? null:req.body.lease_deposit
      rto_mortgage_value = req.body.rto_mortgage_value === undefined ? null:req.body.rto_mortgage_value
      rto_mortgage_duration = req.body.rto_mortgage_duration === undefined ? null:req.body.rto_mortgage_duration
      mortgage_value = req.body.mortgage_value === undefined ? null:req.body.mortgage_value
      mortgage_duration = req.body.mortgage_duration === undefined ? null:req.body.mortgage_duration
      mortgage_down_payment = req.body.mortgage_down_payment === undefined ? null:req.body.mortgage_down_payment
      cable_tv = req.body.cable_tv === undefined ? 'no':req.body.cable_tv
      gas = req.body.gas === undefined ? 'no':req.body.gas
      electricity = req.body.electricity === undefined ? 'no':req.body.electricity
      water = req.body.water === undefined ? 'no':req.body.water
      sewage = req.body.sewage === undefined ? 'no':req.body.sewage
      garbage = req.body.garbage === undefined ? 'no':req.body.garbage
    
      property_event = req.body.event === undefined ? null:req.body.event
      event_date = req.body.event_date === undefined ? null:req.body.event_date
      price_update = req.body.price_update === undefined ? null:req.body.price_update

      values = [user_id,property_type,property_tag,street_name,lat, long, lga,
      state,country,purpose,property_description,bed,bath,sqft,acres,year_built,floors,furnished,
      serviced,newly_built,air_conditioning,washer,parking,dish_washer,electric_fence,deck,storage,alarm,
      cctv,freezer,water_heater,pool,garden,exhaust_fan,fire_place,security_post,heat_extractor,balcony,
      garbage_disposer,pet,amount,min_duration,frequency,least_deposit,least_monthly_payment,max_duration,
      lease_value,lease_duration,lease_deposit,rto_mortgage_value,rto_mortgage_duration,mortgage_value,
      mortgage_duration,mortgage_down_payment,cable_tv,gas,electricity,water,sewage,garbage,property_event,event_date,price_update]

      db.query("CALL add_property(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
       values, function (err, result) {   
        if (err) throw err; 
 
      })

      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });



const uploadPicture = () => {
        fs.readdir(imageUploadPath, function (err, files) {
          console.log(files.length);
          if (files.length >= 1) {
          if (err) throw err;
          files.forEach(file => { 
            console.log(file); 
            const params = {
              Bucket: 'realprobucket/repro_pictures', // pass your bucket name
              Key: file, // file will be saved as testBucket/contacts.csv
              Body: JSON.stringify(file, null, 2)
          };
     
          s3.upload(params, function(s3Err, data) {
              if (s3Err) throw s3Err
              console.log(`File uploaded successfully at ${data.Location}`)  
              console.log(`File saved as  ${data.Key}`) 

              value = [data.Location,data.Key] 
              db.query("CALL add_picture(?,?);", value, function (err, result) {   
             if (err) throw err; 
            // console.log(result[0])
      });
          })

          fs.unlink(imageUploadPath + '/' + file, function (err) {
            if (err) throw err;
            console.log(file + ' File deleted!');
          });

      }) 
    }
    else if (files.length === 0){

      db.query("CALL add_picture_no_upload()", function (err, result) {   
        if (err) throw err; 
        // console.log(result[0])
    });

}    
});  
} 

          

const uploadVideo = () => {
  fs.readdir(videoUploadPath, function (err, files) {
    console.log(files.length);
    if (files.length >= 1) {
    if (err) throw err;
      files.forEach(file => { 
        console.log(file);  
        const params = {
          Bucket: 'realprobucket/repro_videos', // pass your bucket name
          Key: file, // file will be saved as testBucket/contacts.csv
          Body: JSON.stringify(file, null, 2)
      };
 
      s3.upload(params, function(s3Err, data) {
          if (s3Err) throw s3Err
          console.log(`File uploaded successfully at ${data.Location}`)  
          console.log(`File saved as  ${data.Key}`) 

          value = [data.Location,data.Key] 
          db.query("CALL add_video(?,?);", value, function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });

    })

      fs.unlink(videoUploadPath + '/' + file, function (err) {
        if (err) throw err;
        console.log(file + ' File deleted!');
      });

  }) 
}
  else if (files.length === 0){

        db.query("CALL add_video_no_upload()", function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });

}    
});  
} 




const uploadFloorplan = () => {
  fs.readdir(floorplanUploadPath, function (err, files) {
    console.log(files.length);
    if (files.length >= 1) {
    if (err) throw err;
      files.forEach(file => { 
        console.log(file); 
        const params = {
          Bucket: 'realprobucket/repro_floorplans', // pass your bucket name
          Key: file, // file will be saved as testBucket/contacts.csv
          Body: JSON.stringify(file, null, 2)
      };
 
      s3.upload(params, function(s3Err, data) {
          if (s3Err) throw s3Err
          console.log(`File uploaded successfully at ${data.Location}`)  
          console.log(`File saved as  ${data.Key}`) 

          value = [data.Location,data.Key] 
        db.query("CALL add_floorplan(?,?);", value, function (err, result) {   
        if (err) throw err; 
        // console.log(result[0])
    });

      })

      fs.unlink(floorplanUploadPath + '/' + file, function (err) {
        if (err) throw err;
        console.log(file + ' File deleted!');
      });

  }) 
}
else if (files.length === 0){

      db.query("CALL add_floorplan_no_upload()", function (err, result) {   
        if (err) throw err; 
        // console.log(result[0])
    });

}    
});  
} 

        uploadPicture();
        uploadVideo();
        uploadFloorplan();
            
        res.send('Property Addition was Successful')
        
});
        

          
    } 
    else {
      res.send('Please login to view this page!');
    }
   
   })


   

router.post('/listing',(req,res) => {   // Authentic One

    email = req.session.email
    
    picDirName = 'picture'+'_'+email+'_'+Date.now()
    fs.mkdir(picDirName,function(){
    });

    vidDirName = 'video'+'_'+email+'_'+Date.now()
    fs.mkdir(vidDirName,function(){
    });

    floorDirName = 'floorplan'+'_'+email+'_'+Date.now()
    fs.mkdir(floorDirName,function(){
    });
    

    const imageUploadPath = path.join(__dirname,'./' + picDirName)
    const videoUploadPath = path.join(__dirname,'./' + vidDirName)
    const floorplanUploadPath = path.join(__dirname,'./' + floorDirName)
    
    var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        if (file.fieldname === "property_picture") { // if uploading resume
        callback(null, picDirName);
        } 
        if (file.fieldname === "property_video") {
          callback(null, vidDirName);
        } else {
          if (file.fieldname === "floor_plan") {
            callback(null, floorDirName);
          }
        }
    
      },
      filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
      }
    });
    
    
    
    
    var upload = multer({ storage : storage}).fields([{ name: 'property_picture', maxCount: 3 }, { name: 'property_video', maxCount: 1 }, { name: 'floor_plan', maxCount: 1 }])
    
    // if (req.session.loggedin) {
    //   user_id = req.session.userid
      user_id = 11
  
        upload(req,res,function(err) {
          if(err) {
              return res.end("Error uploading Pictures.");
          }
          console.log(req.files)
          console.log(req.body.property_type.length)
        
          console.log("Multer will upload the file to the directory");
  
       
        property_type = req.body.property_type === undefined ? null:req.body.property_type
        property_tag = req.body.property_tag === undefined ? null:req.body.property_tag
        street_name = req.body.street_name === undefined ? null:req.body.street_name
        lat = req.body.lat === undefined ? null:req.body.lat
        long = req.body.long === undefined ? null:req.body.long
      //  major_terminal = req.body.major_terminal === undefined ? null:req.body.major_terminal
        lga = req.body.lga === undefined ? null:req.body.lga
      //  zip_code = req.body.zip_code === undefined ? null:req.body.zip_code
     //   town = req.body.town === undefined ? null:req.body.town
        state = req.body.state === undefined ? null:req.body.state
        country = req.body.country === undefined ? null:req.body.country
        purpose = req.body.purpose === undefined ? null:req.body.purpose
        property_description = req.body.property_description === undefined ? null:req.body.property_description
        bed = req.body.bed === undefined ? null:req.body.bed
        bath = req.body.bath === undefined ? null:req.body.bath
        sqft = req.body.sqft === undefined ? null:req.body.sqft
        acres = req.body.acres === undefined ? null:req.body.acres
        year_built = req.body.year_built === undefined ? null:req.body.year_built
        floors = req.body.floors === undefined ? null:req.body.floors
        furnished = req.body.furnished === undefined ? 'no':req.body.furnished
        serviced = req.body.serviced === undefined ? 'no':req.body.serviced
        newly_built = req.body.newly_built === undefined ? 'no':req.body.newly_built
        air_conditioning = req.body.air_conditioning === undefined ? null:req.body.air_conditioning
        washer = req.body.washer === undefined ? null:req.body.washer
        parking = req.body.parking === undefined ? null:req.body.parking
        dish_washer = req.body.dish_washer === undefined ? 'no':req.body.dish_washer
        electric_fence = req.body.electric_fence === undefined ? 'no':req.body.electric_fence
        deck = req.body.deck === undefined ? 'no':req.body.deck
        storage = req.body.storage === undefined ? 'no':req.body.storage
        alarm = req.body.alarm === undefined ? 'no':req.body.alarm
        cctv = req.body.cctv === undefined ? 'no':req.body.cctv
        freezer = req.body.freezer === undefined ? 'no':req.body.freezer
        water_heater = req.body.water_heater === undefined ? 'no':req.body.water_heater
        pool = req.body.pool === undefined ? 'no':req.body.pool
        garden = req.body.garden === undefined ? 'no':req.body.garden
        exhaust_fan = req.body.exhaust_fan === undefined ? 'no':req.body.exhaust_fan
        fire_place = req.body.fire_place === undefined ? 'no':req.body.fire_place
        security_post = req.body.security_post === undefined ? 'no':req.body.security_post
        heat_extractor = req.body.heat_extractor === undefined ? 'no':req.body.heat_extractor
        balcony = req.body.balcony === undefined ? 'no':req.body.balcony
        garbage_disposer = req.body.garbage_disposer === undefined ? 'no':req.body.garbage_disposer
        pet = req.body.pet === undefined ? null:req.body.pet
        amount = req.body.amount === undefined ? null:req.body.amount
        min_duration = req.body.min_duration === undefined ? null:req.body.min_duration
        frequency = req.body.frequency === undefined ? null:req.body.frequency
        least_deposit = req.body.least_deposit === undefined ? null:req.body.least_deposit
        least_monthly_payment = req.body.least_monthly_payment === undefined ? null:req.body.least_monthly_payment
        max_duration = req.body.max_duration === undefined ? null:req.body.max_duration
        lease_value = req.body.lease_value === undefined ? null:req.body.lease_value
        lease_duration = req.body.lease_duration === undefined ? null:req.body.lease_duration
        lease_deposit = req.body.lease_deposit === undefined ? null:req.body.lease_deposit
        rto_mortgage_value = req.body.rto_mortgage_value === undefined ? null:req.body.rto_mortgage_value
        rto_mortgage_duration = req.body.rto_mortgage_duration === undefined ? null:req.body.rto_mortgage_duration
        mortgage_value = req.body.mortgage_value === undefined ? null:req.body.mortgage_value
        mortgage_duration = req.body.mortgage_duration === undefined ? null:req.body.mortgage_duration
        mortgage_down_payment = req.body.mortgage_down_payment === undefined ? null:req.body.mortgage_down_payment
        cable_tv = req.body.cable_tv === undefined ? 'no':req.body.cable_tv
        gas = req.body.gas === undefined ? 'no':req.body.gas
        electricity = req.body.electricity === undefined ? 'no':req.body.electricity
        water = req.body.water === undefined ? 'no':req.body.water
        sewage = req.body.sewage === undefined ? 'no':req.body.sewage
        garbage = req.body.garbage === undefined ? 'no':req.body.garbage
      
        property_event = req.body.event === undefined ? null:req.body.event
        event_date = req.body.event_date === undefined ? null:req.body.event_date
        price_update = req.body.price_update === undefined ? null:req.body.price_update
  
        values = [user_id,property_type,property_tag,street_name,lat, long, lga,
        state,country,purpose,property_description,bed,bath,sqft,acres,year_built,floors,furnished,
        serviced,newly_built,air_conditioning,washer,parking,dish_washer,electric_fence,deck,storage,alarm,
        cctv,freezer,water_heater,pool,garden,exhaust_fan,fire_place,security_post,heat_extractor,balcony,
        garbage_disposer,pet,amount,min_duration,frequency,least_deposit,least_monthly_payment,max_duration,
        lease_value,lease_duration,lease_deposit,rto_mortgage_value,rto_mortgage_duration,mortgage_value,
        mortgage_duration,mortgage_down_payment,cable_tv,gas,electricity,water,sewage,garbage,property_event,event_date,price_update]
  
        db.query("CALL add_property(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
         values, function (err, result) {   
          if (err) throw err; 
   
        })
  
        // const s3 = new AWS.S3({
        //   accessKeyId: process.env.AWS_ACCESS_KEY2,
        //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY2
        // });

        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID2,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY2
        });
  
  
  
  const uploadPicture = () => {
          fs.readdir(imageUploadPath, function (err, files) {
            console.log(files.length);
            if (files.length >= 1) {
            if (err) throw err;
            files.forEach(file => { 
              console.log(file); 
              const params = {
                Bucket: 'testing-rpshortlets', // pass your bucket name
                Key: file, // file will be saved as testBucket/contacts.csv
                Body: JSON.stringify(file, null, 2)
            };
       
            s3.upload(params, function(s3Err, data) {
                if (s3Err) throw s3Err
                console.log(`File uploaded successfully at ${data.Location}`)  
                console.log(`File saved as  ${data.Key}`) 
  
                value = [data.Location,data.Key] 
                db.query("CALL add_picture(?,?);", value, function (err, result) {   
               if (err) throw err; 
              // console.log(result[0])
        });
            })
  
          /*  fs.unlink(imageUploadPath + '/' + file, function (err) {
              if (err) throw err;
              console.log(file + ' File deleted!');
            }); */

            rimraf(imageUploadPath, function (err) { 
              if (err) throw err;
              console.log('Picture temp folder deleted ');
             });
  
        }) 
      }
      else if (files.length === 0){
  
        db.query("CALL add_picture_no_upload()", function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });
  
  }    
  });  
  } 
  
            
  
  const uploadVideo = () => {
    fs.readdir(videoUploadPath, function (err, files) {
      console.log(files.length);
      if (files.length >= 1) {
      if (err) throw err;
        files.forEach(file => { 
          console.log(file);  
          const params = {
            Bucket: 'testing-rpshortlets2', // pass your bucket name
            Key: file, // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(file, null, 2)
        };
   
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)  
            console.log(`File saved as  ${data.Key}`) 
  
            value = [data.Location,data.Key] 
            db.query("CALL add_video(?,?);", value, function (err, result) {   
            if (err) throw err; 
            // console.log(result[0])
        });
  
      })
  
      /*  fs.unlink(videoUploadPath + '/' + file, function (err) {
          if (err) throw err;
          console.log(file + ' File deleted!');
        });   */

        rimraf(videoUploadPath, function (err) { 
          if (err) throw err;
          console.log('Video temp folder deleted ');
         });
  
    }) 
  }
    else if (files.length === 0){
  
          db.query("CALL add_video_no_upload()", function (err, result) {   
            if (err) throw err; 
            // console.log(result[0])
        });
  
  }    
  });  
  } 
  
  
  
  
  const uploadFloorplan = () => {
    fs.readdir(floorplanUploadPath, function (err, files) {
      console.log(files.length);
      if (files.length >= 1) {
      if (err) throw err;
        files.forEach(file => { 
          console.log(file); 
          const params = {
            Bucket: 'realprobucket1/repro_floorplans', // pass your bucket name
            Key: file, // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(file, null, 2)
        };
   
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)  
            console.log(`File saved as  ${data.Key}`) 
  
            value = [data.Location,data.Key] 
          db.query("CALL add_floorplan(?,?);", value, function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });
  
        })
  
      /*  fs.unlink(floorplanUploadPath + '/' + file, function (err) {
          if (err) throw err;
          console.log(file + ' File deleted!');
        });  */

        rimraf(floorplanUploadPath, function (err) { 
          if (err) throw err;
          console.log('Floorplan temp folder deleted ');
         });
  
    }) 
  }
  else if (files.length === 0){
  
        db.query("CALL add_floorplan_no_upload()", function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });
  
  }    
  });  
  } 
  
          uploadPicture();
          uploadVideo();
          uploadFloorplan();
              
          res.send('Property Addition was Successful')
          
  });
          
  
            
      // } 
      // else {
      //   res.send('Please login to view this page!');
      // }
     
     })   


router.get('/adduser',(req,res) => {
      if (req.session.loggedin) { 
        user_id = req.session.userid
       
          
        res.render('adduserForm',{title: 'Add property Form', property_type: result})
        } 
        else {
          res.send('Please login to view this page!');
        }
       }) 
       
       
router.post('/adduser',(req,res) => {   // Authentic One

      email = req.session.email
      
      picDirName = 'picture'+'_'+email+'_'+Date.now()
      fs.mkdir(picDirName,function(){
      });
  
      vidDirName = 'video'+'_'+email+'_'+Date.now()
      fs.mkdir(vidDirName,function(){
      });
  
      floorDirName = 'floorplan'+'_'+email+'_'+Date.now()
      fs.mkdir(floorDirName,function(){
      });
      
  
      const imageUploadPath = path.join(__dirname,'./' + picDirName)
      const videoUploadPath = path.join(__dirname,'./' + vidDirName)
      const floorplanUploadPath = path.join(__dirname,'./' + floorDirName)
      
      var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
          if (file.fieldname === "property_picture") { // if uploading resume
          callback(null, picDirName);
          } 
          if (file.fieldname === "property_video") {
            callback(null, vidDirName);
          } else {
            if (file.fieldname === "floor_plan") {
              callback(null, floorDirName);
            }
          }
      
        },
        filename: function (req, file, callback) {
          callback(null, file.originalname + '-' + Date.now());
        }
      });
      
      
      
      
      var upload = multer({ storage : storage}).fields([{ name: 'property_picture', maxCount: 3 }, { name: 'property_video', maxCount: 1 }, { name: 'floor_plan', maxCount: 1 }])
      
      if (req.session.loggedin) {
        user_id = req.session.userid
    
          upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading Pictures.");
            }
            console.log(req.files)
            console.log(req.body.property_type.length)
          
            console.log("Multer will upload the file to the directory");
    
         
          property_type = req.body.property_type === undefined ? null:req.body.property_type
          property_tag = req.body.property_tag === undefined ? null:req.body.property_tag
          street_name = req.body.street_name === undefined ? null:req.body.street_name
          lat = req.body.lat === undefined ? null:req.body.lat
          long = req.body.long === undefined ? null:req.body.long
        //  major_terminal = req.body.major_terminal === undefined ? null:req.body.major_terminal
          lga = req.body.lga === undefined ? null:req.body.lga
        //  zip_code = req.body.zip_code === undefined ? null:req.body.zip_code
       //   town = req.body.town === undefined ? null:req.body.town
          state = req.body.state === undefined ? null:req.body.state
          country = req.body.country === undefined ? null:req.body.country
          purpose = req.body.purpose === undefined ? null:req.body.purpose
          property_description = req.body.property_description === undefined ? null:req.body.property_description
          bed = req.body.bed === undefined ? null:req.body.bed
          bath = req.body.bath === undefined ? null:req.body.bath
          sqft = req.body.sqft === undefined ? null:req.body.sqft
          acres = req.body.acres === undefined ? null:req.body.acres
          year_built = req.body.year_built === undefined ? null:req.body.year_built
          floors = req.body.floors === undefined ? null:req.body.floors
          furnished = req.body.furnished === undefined ? 'no':req.body.furnished
          serviced = req.body.serviced === undefined ? 'no':req.body.serviced
          newly_built = req.body.newly_built === undefined ? 'no':req.body.newly_built
          air_conditioning = req.body.air_conditioning === undefined ? null:req.body.air_conditioning
          washer = req.body.washer === undefined ? null:req.body.washer
          parking = req.body.parking === undefined ? null:req.body.parking
          dish_washer = req.body.dish_washer === undefined ? 'no':req.body.dish_washer
          electric_fence = req.body.electric_fence === undefined ? 'no':req.body.electric_fence
          deck = req.body.deck === undefined ? 'no':req.body.deck
          storage = req.body.storage === undefined ? 'no':req.body.storage
          alarm = req.body.alarm === undefined ? 'no':req.body.alarm
          cctv = req.body.cctv === undefined ? 'no':req.body.cctv
          freezer = req.body.freezer === undefined ? 'no':req.body.freezer
          water_heater = req.body.water_heater === undefined ? 'no':req.body.water_heater
          pool = req.body.pool === undefined ? 'no':req.body.pool
          garden = req.body.garden === undefined ? 'no':req.body.garden
          exhaust_fan = req.body.exhaust_fan === undefined ? 'no':req.body.exhaust_fan
          fire_place = req.body.fire_place === undefined ? 'no':req.body.fire_place
          security_post = req.body.security_post === undefined ? 'no':req.body.security_post
          heat_extractor = req.body.heat_extractor === undefined ? 'no':req.body.heat_extractor
          balcony = req.body.balcony === undefined ? 'no':req.body.balcony
          garbage_disposer = req.body.garbage_disposer === undefined ? 'no':req.body.garbage_disposer
          pet = req.body.pet === undefined ? null:req.body.pet
          amount = req.body.amount === undefined ? null:req.body.amount
          min_duration = req.body.min_duration === undefined ? null:req.body.min_duration
          frequency = req.body.frequency === undefined ? null:req.body.frequency
          least_deposit = req.body.least_deposit === undefined ? null:req.body.least_deposit
          least_monthly_payment = req.body.least_monthly_payment === undefined ? null:req.body.least_monthly_payment
          max_duration = req.body.max_duration === undefined ? null:req.body.max_duration
          lease_value = req.body.lease_value === undefined ? null:req.body.lease_value
          lease_duration = req.body.lease_duration === undefined ? null:req.body.lease_duration
          lease_deposit = req.body.lease_deposit === undefined ? null:req.body.lease_deposit
          rto_mortgage_value = req.body.rto_mortgage_value === undefined ? null:req.body.rto_mortgage_value
          rto_mortgage_duration = req.body.rto_mortgage_duration === undefined ? null:req.body.rto_mortgage_duration
          mortgage_value = req.body.mortgage_value === undefined ? null:req.body.mortgage_value
          mortgage_duration = req.body.mortgage_duration === undefined ? null:req.body.mortgage_duration
          mortgage_down_payment = req.body.mortgage_down_payment === undefined ? null:req.body.mortgage_down_payment
          cable_tv = req.body.cable_tv === undefined ? 'no':req.body.cable_tv
          gas = req.body.gas === undefined ? 'no':req.body.gas
          electricity = req.body.electricity === undefined ? 'no':req.body.electricity
          water = req.body.water === undefined ? 'no':req.body.water
          sewage = req.body.sewage === undefined ? 'no':req.body.sewage
          garbage = req.body.garbage === undefined ? 'no':req.body.garbage
        
          property_event = req.body.event === undefined ? null:req.body.event
          event_date = req.body.event_date === undefined ? null:req.body.event_date
          price_update = req.body.price_update === undefined ? null:req.body.price_update
    
          values = [user_id,property_type,property_tag,street_name,lat, long, lga,
          state,country,purpose,property_description,bed,bath,sqft,acres,year_built,floors,furnished,
          serviced,newly_built,air_conditioning,washer,parking,dish_washer,electric_fence,deck,storage,alarm,
          cctv,freezer,water_heater,pool,garden,exhaust_fan,fire_place,security_post,heat_extractor,balcony,
          garbage_disposer,pet,amount,min_duration,frequency,least_deposit,least_monthly_payment,max_duration,
          lease_value,lease_duration,lease_deposit,rto_mortgage_value,rto_mortgage_duration,mortgage_value,
          mortgage_duration,mortgage_down_payment,cable_tv,gas,electricity,water,sewage,garbage,property_event,event_date,price_update]
    
          db.query("CALL add_property(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
           values, function (err, result) {   
            if (err) throw err; 
     
          })
    
          const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
          });
    
    
    
    const uploadPicture = () => {
            fs.readdir(imageUploadPath, function (err, files) {
              console.log(files.length);
              if (files.length >= 1) {
              if (err) throw err;
              files.forEach(file => { 
                console.log(file); 
                const params = {
                  Bucket: 'realprobucket/repro_pictures', // pass your bucket name
                  Key: file, // file will be saved as testBucket/contacts.csv
                  Body: JSON.stringify(file, null, 2)
              };
         
              s3.upload(params, function(s3Err, data) {
                  if (s3Err) throw s3Err
                  console.log(`File uploaded successfully at ${data.Location}`)  
                  console.log(`File saved as  ${data.Key}`) 
    
                  value = [data.Location,data.Key] 
                  db.query("CALL add_picture(?,?);", value, function (err, result) {   
                 if (err) throw err; 
                // console.log(result[0])
          });
              })
    
            /*  fs.unlink(imageUploadPath + '/' + file, function (err) {
                if (err) throw err;
                console.log(file + ' File deleted!');
              }); */
  
              rimraf(imageUploadPath, function (err) { 
                if (err) throw err;
                console.log('Picture temp folder deleted ');
               });
    
          }) 
        }
        else if (files.length === 0){
    
          db.query("CALL add_picture_no_upload()", function (err, result) {   
            if (err) throw err; 
            // console.log(result[0])
        });
    
    }    
    });  
    } 
    
              
    
    const uploadVideo = () => {
      fs.readdir(videoUploadPath, function (err, files) {
        console.log(files.length);
        if (files.length >= 1) {
        if (err) throw err;
          files.forEach(file => { 
            console.log(file);  
            const params = {
              Bucket: 'realprobucket/repro_videos', // pass your bucket name
              Key: file, // file will be saved as testBucket/contacts.csv
              Body: JSON.stringify(file, null, 2)
          };
     
          s3.upload(params, function(s3Err, data) {
              if (s3Err) throw s3Err
              console.log(`File uploaded successfully at ${data.Location}`)  
              console.log(`File saved as  ${data.Key}`) 
    
              value = [data.Location,data.Key] 
              db.query("CALL add_video(?,?);", value, function (err, result) {   
              if (err) throw err; 
              // console.log(result[0])
          });
    
        })
    
        /*  fs.unlink(videoUploadPath + '/' + file, function (err) {
            if (err) throw err;
            console.log(file + ' File deleted!');
          });   */
  
          rimraf(videoUploadPath, function (err) { 
            if (err) throw err;
            console.log('Video temp folder deleted ');
           });
    
      }) 
    }
      else if (files.length === 0){
    
            db.query("CALL add_video_no_upload()", function (err, result) {   
              if (err) throw err; 
              // console.log(result[0])
          });
    
    }    
    });  
    } 
    
    
    
    
    const uploadFloorplan = () => {
      fs.readdir(floorplanUploadPath, function (err, files) {
        console.log(files.length);
        if (files.length >= 1) {
        if (err) throw err;
          files.forEach(file => { 
            console.log(file); 
            const params = {
              Bucket: 'realprobucket/repro_floorplans', // pass your bucket name
              Key: file, // file will be saved as testBucket/contacts.csv
              Body: JSON.stringify(file, null, 2)
          };
     
          s3.upload(params, function(s3Err, data) {
              if (s3Err) throw s3Err
              console.log(`File uploaded successfully at ${data.Location}`)  
              console.log(`File saved as  ${data.Key}`) 
    
              value = [data.Location,data.Key] 
            db.query("CALL add_floorplan(?,?);", value, function (err, result) {   
            if (err) throw err; 
            // console.log(result[0])
        });
    
          })
    
        /*  fs.unlink(floorplanUploadPath + '/' + file, function (err) {
            if (err) throw err;
            console.log(file + ' File deleted!');
          });  */
  
          rimraf(floorplanUploadPath, function (err) { 
            if (err) throw err;
            console.log('Floorplan temp folder deleted ');
           });
    
      }) 
    }
    else if (files.length === 0){
    
          db.query("CALL add_floorplan_no_upload()", function (err, result) {   
            if (err) throw err; 
            // console.log(result[0])
        });
    
    }    
    });  
    } 
    
            uploadPicture();
            uploadVideo();
            uploadFloorplan();
                
            res.send('Property Addition was Successful')
            
    });
            
    
              
        } 
        else {
          res.send('Please login to view this page!');
        }
       
       })        

   module.exports = router;