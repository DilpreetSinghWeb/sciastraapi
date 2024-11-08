import db from "../config/db.js";
import transporter from "../utils/email.js";
import stripe from "../utils/stripe.js";

export const submitDetails = (req, res) => {
  const { full_name, phone_number, email } = req.body;
  if (!full_name || !phone_number || !email) return res.status(400).send({ message: "All fields are required!" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const query = "INSERT INTO user_details (full_name, phone_number, email, otp) VALUES (?, ?, ?, ?)";
  
  db.query(query, [full_name, phone_number, email, otp], (err) => {
    if (err) return res.status(500).send({ message: "Error inserting data into database" });

    const mailOptions = { from: process.env.EMAIL_USER, to: email, subject: "Your OTP for Verification", text: `Your OTP for verification is: ${otp}` };
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).send({ message: "Error sending OTP email." });
      res.status(200).send({ message: "Details submitted successfully! OTP sent to email." });
    });
  });
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const query = "SELECT * FROM user_details WHERE otp = ?";
  db.query(query, [otp], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length > 0) {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], 
          line_items: [{
            price_data: {
              currency: "inr",
              product_data: { name: "Course Enrollment" },
              unit_amount: 599900
            },
            quantity: 1
          }],
          mode: "payment",
          success_url: "http://127.0.0.1:5500/success.html",
          cancel_url: "http://127.0.0.1:5500/failure.html",
        });
        res.json({ message: "OTP verified successfully!", sessionId: session.id });
      } catch (error) {
        console.error("Error creating payment session:", error.message);
        res.status(500).json({ message: "Error creating payment session" });
      }
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  });
};
