const Testimonial = require("../models/Testimonial");

exports.createTestimonial = async (req, res) => {
  const { name, company, message, rating } = req.body;

  try {
    await Testimonial.create({
      name,
      company,
      message,
      rating,
    });
    res.status(201).redirect('/testimonials');
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    const userType=req.session.user.userType;
    res.render('rating', { testimonials,userType });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    await Testimonial.findByIdAndDelete(testimonialId);
    res.redirect('/dashboard/testimonials');
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getPublicTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(20);
    const loggedin = req.session.user;
    res.render("testimonials", { loggedin, testimonials });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};