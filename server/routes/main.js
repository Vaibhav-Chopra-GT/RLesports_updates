let express = require('express');

let router = express.Router()
const Post = require('../models/event');


// routes
// router.get("/", function (req, res) {
//     res.render("home");
// })

router.get('/', async (req, res) => {
      const locals = {
        title: "Rl Esports",
        description: "Rocket league esports news"
      }
    
      try {
        const data = await Post.find();
        res.render('home', { locals, data });
      } catch (error) {
        console.log(error);
      }
    
    });

router.get('/event/:id', async (req, res) => {
    try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
        title: data.name,
        // description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('event', { 
        locals,
        data
        // currentRoute: `/post/${slug}`
    });
    } catch (error) {
    console.log(error);
    }

});

router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "Search",
        // description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await Post.find({
        $or: [
          { name: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { description: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });



// function insertPostData () {
//   Post.insertMany([
//     {
//       name: " RLCS World Championship",
//       level: "S",
//       description: "The tournament above all",
//       dateAt: "12/7/2023",
//       timeAt: "15 UTC"
//     },
    
//   ])
// }

// insertPostData();

module.exports = router;