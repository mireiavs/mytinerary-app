const providers = ["twitter", "google", "facebook", "github"];




const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === "production"
    ? `https://murmuring-ocean-56895.herokuapp.com/users/${provider}/callback`
    : `http://localhost:5000/api/auth/${provider}/callback`;
});

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://murmuring-ocean-56895.herokuapp.com"
    : ["http://127.0.0.1:3000", "http://localhost:3000"];

const [twitterURL, googleURL, facebookURL, githubURL] = callbacks;

exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: googleURL
};

exports.FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ["id", "emails", "name", "picture.width(250)"],
  callbackURL: facebookURL
};
