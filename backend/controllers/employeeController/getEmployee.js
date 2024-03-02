import employeeSchema from "../../models/Employee.js"
import generateToken from "../../JwtToken/generateToken.js"


/**************************** Google Authentication  *************************************/

const userGoogleLogin = async (req, res) => {
    try {
      const { id_token } = req.body;
      const decodedToken = jwt.decode(id_token);
      const { name, email, jti, phone } = decodedToken;
      const emailfind = await employeeSchema.findOne({ email });
      if (emailfind) {
        const existingUser = emailfind;
  
        const token = generateToken(existingUser?._id);
  
        return res.status(200).json({
          _id: existingUser?._id,
          name: existingUser?.name,
          email: existingUser?.email,
          phone: existingUser?.phone,
          token,
        });
      } else {
        
        return res.status(400).json(
         "email not found"
        );
      }
    } catch (error) {
      res.status(400).json(error);
    }
  };

  export {
    
    userGoogleLogin,
  };