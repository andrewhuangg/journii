[visit journii live](https://journii21.herokuapp.com/)

# journii

## Introduction

First and foremost, thank you for visiting this application. The purpose of of journii was to provide a community a place to express, and explore ideas, while giving me the opportunity to relearn the mern stack.

# Features

- Users can request for forgotten passwords and reset passwords
- Users can search for posts by title, name, and text
- Users can provide their github username to share their repos
- Users can view their own, and other users latest posts, liked posts, followed posts
- Users can create posts
- Users can create comments and reviews
- Users can create and add experiences and projects like a resume
- Users can upload profile images
- Users can upload images for their posts
- Users can follow/unfollow profiles
- Users can follow/unfollow posts
- Users can like/unlike posts
- Users can add social media links and personal websites
- Basic crud for all models ( Users, Profiles, Posts, Reviews )
- Custom hamburger menus and modals
- Mobile and Tablet design

## Frontend Technologies

- CRA-template
- Axios
- Moment
- Redux
- React-helmet
- Redux thunk

## Backend Technologies

- AWS-SDK
- Axios
- Bcryptjs
- Colors
- Concurrently
- Dotenv
- Express
- Faker
- Lodash
- Mongoose
- Morgan
- Multer
- Nodemailer
- Mapquest
- JWT
- Github Api

---

# Gifs

### Media Queries

![Alt Text](https://media.giphy.com/media/lIIcOKSqXEUTbywgmK/giphy.gif)

### Reviews / Sliders

![Alt Text](https://media.giphy.com/media/XgBXvh7MNKfpKmKl6c/giphy.gif)

### Comments + Likes

![Alt Text](https://media.giphy.com/media/QScQihiYhhTi1a4kxI/giphy.gif)
![Alt Text](https://media.giphy.com/media/wzbk3ZNyoskVKCdz4l/giphy.gif)

## Dashboard + Profile

![Alt Text](https://media.giphy.com/media/0HjY1xkRm1ieZUdmHG/giphy.gif)
![Alt Text](https://media.giphy.com/media/TlJ8CBar7urygFQVdv/giphy.gif)

# Code Snippets

### Latest Posts + Query Params

```js
// @desc      Get latest posts
// @route     GET /api/v1/posts/latest/:limit/?keyword=:keyword
// @access    Public
exports.getLatestPosts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.params.limit);
  const posts = await Post.find({
    $or: [
      {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      },
      {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      },
      {
        text: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      },
    ],
  })
    .sort({ createdAt: -1 })
    .limit(limit);

  res.status(200).json(posts);
});
```

The snippet above defines the latest posts route. It receives a set limit parameter and the keyword search provided by the user which goes through mongoose queries and regex for the post's title, name, and text.

---

### Forgot Password

```js
// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public

exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new ErrorResponse('There is no user with that email', 404);

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const message = `you are receiving this email because you (or someone else) has requested the reset of a password. \n\nPlease provide this token ${resetToken} when resetting your password. \n\nThis token will expire in 10 minutes and you will need to reset your password again.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'password reset token',
      message,
    });

    res.status(200).json({ email: user.email, message: 'Email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    throw new ErrorResponse('Email could not be sent', 500);
  }
});
```

The snippet above receives an email from the request body which then performs a mongoose query for the user. A mongoose method is then created to create and hash a token which is then sent to the uses email with a default message. We then use nodemailer and sendgrid to communicate with the requester.

---
