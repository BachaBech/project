const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const User = require("../models/userShema");
const isAuth = require("../middleware/authenticate");
const Image = require("../models/imageSchema");

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Destination folder name without trailing slash
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


// Registration
router.post("/register", async (req, res) => {
    try {
      // Get body or Data
      const { username, email, password,role,class1} = req.body;
      console.log(username, email, password,role,class1);
  
      const createUser = new User({
        username,
        email,
        password,
        role,
        class1
        
      });

      const created = await createUser.save();
      console.log(created);
      res.status(200).send("Registered");
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //Login
  router.post("/login", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      // Find User if Exist
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
      if (user.authorize === false) {
        return res.status(402).send({ msg: "User Blocked" });
      }
      // Verify Password
      const isMatch = await bcryptjs.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).send({ msg: "Invalid Credentials" });
      }
      // Generate Token Which is Define in User Schema
      const token = await user.generateToken();
      // res.cookie("jwt", token )
      // res.status(200).send("LoggedIn")
      return res
        .status(200)
        .send({ searchedUser: user, token: `Bearer ${token}` });
    } catch (error) {
      return res.status(500).send({ msg: "can not login" });
      console.log(error);
    }
  });
//autheur
  router.get("/auth", isAuth(), (req, res) => {
    res.status(200).send({ user: req.user });
  });
// block or verif
  router.put("/update/:id", async (req, res) => {
    console.log(req.body);
    try {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
      res.send("user updated");
    } catch (error) {
      res.status(400).send({ message: "No user with this id" });
    }
  });

  router.get("/allusers", async (req, res) => {
    try {
      const result = await User.find();
      res.status(200).send({ allusers: result });
    } catch (error) {
      console.log(error);
    }
  });
  router.put("/apply/:id", async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { children: req.body } }
    );
  });

// Route for uploading an image
router.post("/upload-image", upload.single("image"), async (req, res) => {
  const class1 = req.body.class1;
  const imageUrl = req.file.path;
  try {
    // Create a new image document
    const images = new Image({
      imageUrl,
      class1
    });

// Save the image to the database
await images.save();

res.json({ imageUrl: images.imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update image URL
router.patch("/api/images", async (req, res) => {
  try {
    const newImageUrl = req.body.imageUrl;
    const newclass1 = req.body.class1;

    // Find the image document and update the imageUrl field
    const updatedImage = await Image.findOneAndUpdate(
      { class1: newclass1 },
      { imageUrl: newImageUrl },
      { new: true }
    );

    if (updatedImage) {
      res.status(200).json(updatedImage);
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating image URL" });
  }
});

// Route for retrieving images by class
router.get("/images/:class1", async (req, res) => {
  // Get the class1 from the request params
  const class1 = req.params.class1;

  try {
    // Find the users with the specified class1
    const images = await Image.find({ class1 }).populate("image");
    // Extract the image paths from the users
    const images1 = Image.map((images) => images.imageUrl);

    // Return the images
    res.json({ images1 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
(module.exports = router);