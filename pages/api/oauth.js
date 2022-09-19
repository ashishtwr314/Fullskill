import {
  getURLWithQueryParams,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_REDIRECT,
} from "../../helpers/auth";
import mongoconn from "../../helpers/connectdb";
import User from "../../model/User";

const Oauth = async (req, res) => {
  // Query to exchange our authorization code for an access token
  const LINKEDIN_URL = getURLWithQueryParams(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: LINKEDIN_REDIRECT,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET,
    }
  );
  let tok;
  let resp = await fetch(LINKEDIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (resp.ok) tok = await resp.json();

  let { access_token, expires_in } = tok;

  // Query to exchange our token for user infos
  let auth = "Bearer " + access_token;
  let u = {};
  let usr = await fetch("https://api.linkedin.com/v2/me", {
    method: "GET",
    headers: { Connection: "Keep-Alive", Authorization: auth },
  });
  if (usr.ok) u = await usr.json();
  if (u.localizedFirstName) {
    await mongoconn();
    console.log(u);
    console.log(u.localizedFirstName, u.localizedLastName);

    const isUserAlreadyPresent = await checkIfalreadyExists(u);
    if (isUserAlreadyPresent.length) {
      res.redirect(`/dashboard`);
    } else {
      try {
        const test = await User.create({
          firstName: u.localizedFirstName,
          lastName: u.localizedLastName,
          linkedinID: u.id,
          profilePic: u.profilePicture.displayImage,
        });

        res.redirect(`/dashboard/onboard`);
      } catch (err) {
        console.log(err);
      }
    }

    // res.redirect(`/`);
  }
};

const checkIfalreadyExists = (u) => {
  return User.find({ linkedinID: u.id });

  // User.find({ linkedinID: u.id }, (err, users) => {
  //   console.log("ERROR", err);
  //   if (err) return null;
  //   console.log("USERS", users);
  //   if (users.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
};

export default Oauth;
