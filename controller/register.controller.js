const bcrypt = require("bcrypt");
const { otpServices } = require("../services");
const { Registration } = require("../model"); // Assuming you have a User model
const generatePassword = require("../utils/generatePassword");
const nodemailer = require("../utils/nodemailer");
// Register Controller
const register = async (req, res) => {
  try {
    const { name, email, mobile, gender } = req.body;

    // Validate input fields
    if (!name || !email || !mobile || !gender) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields.",
        data: false,
      });
    }
    const password = name + (mobile / 1000000).toFixed();

    // const password =name+ mobile.;
    const htmlContent = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }

        .u-row .u-col {
          vertical-align: top;
        }

        
            .u-row .u-col-100 {
              width: 600px !important;
            }
          
      }

      @media only screen and (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }

        .u-row {
          width: 100% !important;
        }

        .u-row .u-col {
          display: block !important;
          width: 100% !important;
          min-width: 320px !important;
          max-width: 100% !important;
        }

        .u-row .u-col > div {
          margin: 0 auto;
        }


        .u-row .u-col img {
          max-width: 100% !important;
        }

}
    
body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}


table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_2 .v-col-border { border-top: 5px solid #8d95ff !important;border-left: 5px solid #8d95ff !important;border-right: 5px solid #8d95ff !important;border-bottom: 5px solid #8d95ff !important; } #u_content_text_2 .v-container-padding-padding { padding: 20px 10px 10px !important; } #u_content_text_1 .v-container-padding-padding { padding: 10px 10px 40px !important; } #u_content_social_1 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_content_text_3 .v-container-padding-padding { padding: 10px 10px 20px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="570" class="v-col-border" style="background-color: #ffffff;width: 570px;padding: 0px;border-top: 15px solid #8d95ff;border-left: 15px solid #8d95ff;border-right: 15px solid #8d95ff;border-bottom: 15px solid #8d95ff;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 15px solid #8d95ff;border-left: 15px solid #8d95ff;border-right: 15px solid #8d95ff;border-bottom: 15px solid #8d95ff;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://www.brandshow.in/assets/img/logo.jpg" alt="BrandShow Logo" title="BrandShow Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 40%;max-width: 232px;" width="232"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:'Raleway',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 40px 10px;font-family:'Raleway',sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <span >Dear ${name} ,<br /><br /></span>
<div>
<div>The message informs to you that your registration process has been completed successfully. It also indicates that a password has been automatically generated for your account. This password will likely serve as the initial login credential, and users are often advised to change it to a more personalized and secure password after logging in for the first time.</div>
</div>
<p style="line-height: 140%;"><br /><strong>Password :</strong> ${password}</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 40px 30px;font-family:'Raleway',sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;"><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiTHJJMHBSU20xM203UWc0Tk1XZXVQeCIsInBhc3RlSUQiOjE4NjYyMDI5OTgsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;" style="line-height: 19.6px;"></span>use this password to login on the site <br /><br /></p>
<p style="line-height: 140%;">thanks you ,</p>
<p style="line-height: 140%;">best regards.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Raleway',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://csip-image.blr1.digitaloceanspaces.com/csip-image/img/content/EmailTemplateImage1.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 90%;max-width: 540px;" width="540"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #8d95ff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #8d95ff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_social_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
        
<div align="center" style="direction: ltr;">
  <div style="display: table; max-width:167px;">
  <!--[if (mso)|(IE)]><table width="167" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:167px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
    <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.facebook.com/unlayer" title="Facebook" target="_blank">
          <img src="images/image-3.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
    <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.linkedin.com/company/unlayer/mycompany/" title="LinkedIn" target="_blank">
          <img src="images/image-4.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
    <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.instagram.com/unlayer_official/" title="Instagram" target="_blank">
          <img src="images/image-5.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://twitter.com/unlayerapp" title="X" target="_blank">
          <img src="images/image-6.png" alt="X" title="X" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_3" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 14px;font-family:'Raleway',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 170%;">UNSUBSCRIBE   |   PRIVACY POLICY   |   WEB</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Raleway',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
`;
    // Validate mobile number (must be 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Mobile number must be 10 digits long." });
    }

    // Validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    // Check if the email or mobile already exists in MongoDB
    const existingUser = await Registration.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });

    if (existingUser) {
      // If user exists but status is 0 (inactive)
      if (existingUser.status === 0) {
        return res
          .status(200)
          .json({ message: "User exists but is inactive." });
      } else {
        // If user exists and is active, update user details
        existingUser.name = name;
        existingUser.email = email;
        existingUser.password = await bcrypt.hash(password, 10);
        existingUser.mobile = mobile;
        existingUser.gender = gender;
        existingUser.edited_on = new Date();
        existingUser.status = 1;

        const updatedUser = await existingUser.save();

        if (updatedUser) {
          const otpSent = await otpServices.sendOTP(mobile);
          const sentMail = await nodemailer.sendMail(
            email,
            "Registration Successful",
            `Your Password for login is ${password}`,
            htmlContent
          );
          return res.status(200).json({
            status: true,
            message: otpSent ? "OTP sent successfully." : "Failed to send OTP.",
            data: updatedUser,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Failed to update user.",
            data: false,
          });
        }
      }
    } else {
      // Register new user
      const hashedPassword = await bcrypt.hash(password, 10);

      // Fetch existing IDs from the database
      const existingSlugs = await Registration.find().select("sid");
      const existingIds = existingSlugs.map((slug) => slug.sid);
      const randomSid = await generateUniqueId(existingIds);

      const newUser = new Registration({
        sid: randomSid,
        name,
        email,
        password: hashedPassword,
        mobile,
        gender,
        added_by: 0,
        added_on: new Date(),
        status: 1,
      });

      const insertResult = await newUser.save();

      if (insertResult) {
        const otpSent = await otpServices.sendOTP(mobile);
        const sentMail = await nodemailer.sendMail(
          email,
          "Registration Successful",
          `Your Password for login is ${password}`,
          htmlContent
        );
        return res.status(201).json({
          status: true,
          message: otpSent
            ? "User registered and OTP sent."
            : "User registered but failed to send OTP.",
          data: insertResult,
        });
      } else {
        return res.status(500).json({
          status: false,
          message: "Failed to register user.",
          data: false,
        });
      }
    }
  } catch (error) {
    console.error("Error during registration: ", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during registration.",
      data: false,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const {
      sid,
      name,
      email,
      mobile,
      dob,
      gender,
      city,
      collegeName,
      highestQualification,
      oldPassword,
      password,
      r_password,
    } = req.body;

    // Validate required fields
    if (!sid) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields. sid",
        data: false,
      });
    }
    // Find user by sid
    const user = await Registration.findOne({ sid });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found.", data: false });
    }
    // Validate password if provided
    if (password) {
      if (!oldPassword) {
        return res.status(400).json({
          status: false,
          message: "Missing Required Field Old Password",
          data: false,
        });
      }
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      // If password does not match, return an error
      if (!passwordMatch) {
        return res.status(400).json({
          status: false,
          message: "Old password is not match",
          data: false,
        });
      }
      if (password.length < 5) {
        return res.status(400).json({
          status: false,
          message: "Password must be at least 5 characters long.",
          data: false,
        });
      }
      // Check if passwords match
      if (password !== r_password) {
        return res.status(400).json({
          status: false,
          message: "Passwords do not match.",
          data: false,
        });
      }
    }
    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.dob = dob ? new Date(dob) : user.dob;
    user.gender = gender?.toLowerCase() || user.gender;
    user.city = city || user.city;
    user.collegeName = collegeName || user.collegeName;
    user.highestQualification =
      highestQualification || user.highestQualification;

    // If password is provided, hash it and update
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Set 'edited_by' and update timestamps automatically
    user.edited_by = sid; // Assuming `req.user` contains logged-in user data

    // Save the updated user
    const updatedUser = await user.save();

    const updatedUserObj = updatedUser.toObject(); // Convert Mongoose document to plain object
    delete updatedUserObj.password;
    delete updatedUserObj.added_by;
    delete updatedUserObj.createdAt;
    delete updatedUserObj.delete_flag;
    delete updatedUserObj.edited_by;
    delete updatedUserObj.updatedAt;
    delete updatedUserObj.__v;

    if (updatedUser) {
      return res.status(200).json({
        status: true,
        message: "User updated successfully.",
        data: updatedUserObj,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Failed to update user.",
        data: false,
      });
    }
  } catch (error) {
    console.error("Error updating user: ", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during the update process.",
      data: false,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { sid } = req.query;

    // Validate required fields
    if (!sid || sid === "") {
      return res.status(400).json({
        status: false,
        message: "Missing required fields. sid",
        data: false,
      });
    }

    // Find user by sid
    const user = await Registration.findOne({ sid: sid, status: 1 });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found.", data: false });
    }

    // Define required fields for profile completion
    const requiredFields = [
      "name",
      "email",
      "mobile",
      "gender",
      "dob",
      "city",
      "collegeName",
      "highestQualification",
    ];

    // Calculate how many fields are filled out
    const completedFields = requiredFields.filter(
      (field) =>
        user[field] &&
        user[field] !== "" &&
        user[field] !== undefined &&
        user[field] !== null
    ).length;

    // Calculate the profile completion percentage
    const profilePercentage = Math.round(
      (completedFields / requiredFields.length) * 100
    );

    // Convert Mongoose document to plain object
    const userObj = user.toObject(); // This prevents mutation of the original document
    delete userObj.password;
    delete userObj.__v;
    delete userObj.added_by;
    delete userObj.edited_by;
    delete userObj.delete_flag;
    // Add profilePercentage to the user object
    userObj.profilePercentage = profilePercentage;

    // Return the user object with profilePercentage
    return res.status(200).json({
      status: true,
      message: "User retrieved successfully.",
      data: userObj,
    });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
};
const generateUniqueId = async (existingIds) => {
  let id;
  do {
    // Generate a random number (you can adjust the range as needed)
    id = Math.floor(Math.random() * 1000000);
  } while (existingIds.includes(id)); // Ensure the ID is unique
  return id;
};
module.exports = { register, updateUser, getUser };
