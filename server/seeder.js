const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const faker = require('faker');
const _ = require('lodash');
const axios = require('axios');

// Load env vars
dotenv.config({ path: './config/config.env' });

// load models
const User = require('./models/User');
const Profile = require('./models/Profile');
const Post = require('./models/Post');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const createProjects = (qty) => {
  const projectArray = [];
  for (let i = 0; i < qty; i++) {
    const proj = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      technologies: 'javascript, nodejs, mongodb, expressjs, reactjs, aws',
      features: 'crud, follow, like, search, image upload, post, comment, review',
      from: faker.date.between('2019-01-01', '2020-12-31'),
      to: faker.date.between('2020-12-31', '2021-02-10'),
      current: false,
      website: faker.internet.url(),
    };
    projectArray.push(proj);
  }
  return projectArray;
};

const createExperiences = (qty) => {
  const experienceArray = [];
  for (let i = 0; i < qty; i++) {
    const exp = {
      title: faker.name.jobTitle(),
      company: faker.company.companyName(),
      from: faker.date.between('2019-01-01', '2020-12-31'),
      to: faker.date.between('2020-12-31', '2021-02-10'),
      current: false,
      address: `${faker.address.streetAddress('###')} ${faker.address.city()}`,
      description: faker.name.jobDescriptor(),
    };

    experienceArray.push(exp);
  }

  return experienceArray;
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createReviews = (users) => {
  const reviewArray = [];
  users.forEach((user) => {
    const randomRating = getRandomNumber(1, 5);
    const review = {
      name: user.name,
      rating: randomRating,
      comment: faker.lorem.paragraph(),
      user: user._id,
    };
    reviewArray.push(review);
  });
  return reviewArray;
};

const createComments = (users) => {
  const commentArray = [];
  users.forEach((user) => {
    const comment = {
      user: user._id,
      name: user.name,
      text: faker.lorem.paragraph(),
      date: faker.date.recent(),
    };
    commentArray.push(comment);
  });
  return commentArray;
};

const createImage = async (url) => {
  try {
    const { data } = await axios.get(`${url}`, {
      responseType: 'arraybuffer',
    });

    const buff = await Buffer.from(data);
    const imageString = buff.toString('base64');
    const decodedImage = `data:image/jpeg;base64,${imageString}`;
    return decodedImage;
  } catch (error) {
    console.error(error);
  }
};

// Import into DB
const importData = async () => {
  try {
    const userQty = 5; //30
    const postQty = 5; //50
    const users = [];
    const profiles = [];
    const posts = [];

    // loop to create users and profiles
    for (let i = 0; i < userQty; i++) {
      // Fetch and Decode image
      const fakerUserImageUrl = `${faker.image.people()}?random=${Date.now()}`;
      const buffUserImage = await createImage(fakerUserImageUrl);

      // Create User
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber(2),
        about: faker.lorem.paragraph(),
        image: `${buffUserImage}`,
      });

      // Populate users array
      users.push(user);

      // Create and return random qty of projects and experiences
      const randomQty1 = getRandomNumber(1, 4);
      const randomQty2 = getRandomNumber(1, 4);
      const projectArray = createProjects(randomQty1);
      const experienceArray = createExperiences(randomQty2);

      // Create Profile for each user
      const profile = new Profile({
        username: faker.internet.userName(),
        bio: faker.lorem.paragraph(),
        location: `${faker.address.streetAddress('###')} ${faker.address.city()} ${
          faker.address.state
        } ${faker.address.zipCode()}`,
        projects: projectArray,
        experiences: experienceArray,
        social: {
          youtube: 'https://www.youtube.com/',
          twitter: 'https://twitter.com/',
          facebook: 'https://www.facebook.com/',
          linkedin: 'https://www.linkedin.com/',
          instagram: 'https://www.instagram.com/',
        },
        follows: [] /* will populate follows after loop completes*/,
        user: user._id,
      });

      // Populate profiles array
      profiles.push(profile);
    }

    // Create and save each User
    users.forEach(async (user) => await User.create(user));

    // Create array of random users
    const manyRandomUsers = (users, randomNumber) => _.sampleSize(users, randomNumber);

    // Populate the follows property for each profile
    const randomNumber = getRandomNumber(1, users.length - 1);
    profiles.forEach((profile) => {
      manyRandomUsers(users, randomNumber).forEach((user) => {
        profile.follows.unshift({ user: user._id });
      });
      // profile.follows = manyRandomUsers(users, randomNumber);
    });

    // Create and save each Profile
    profiles.forEach(async (profile) => await Profile.create(profile));

    for (let i = 0; i < postQty; i++) {
      // Fetch and Decode image
      const fakerPostImageUrl = `${faker.image.city()}?random=${Date.now()}`;
      const buffPostImage = await createImage(fakerPostImageUrl);

      // Random Numbers for Reviews, Comments, Likes, and Follwos
      const randomUserReviewsAmt = getRandomNumber(1, users.length - 1);
      const randomUserCommentsAmt = getRandomNumber(1, users.length - 1);
      const randomUserLikesAmt = getRandomNumber(1, users.length - 1);
      const randomUserFollowsAmt = getRandomNumber(1, users.length - 1);

      // Create Review and Comment arrays
      const reviewArray = createReviews(manyRandomUsers(users, randomUserReviewsAmt));
      const commentArray = createComments(manyRandomUsers(users, randomUserCommentsAmt));

      // Fetch random user from users
      const randomUser = _.sample(users);

      // Create Post
      const post = new Post({
        user: randomUser._id,
        text: faker.lorem.paragraph(),
        title: faker.hacker.phrase(),
        name: randomUser.name,
        image: `${buffPostImage}`,
        numReviews: reviewArray.length,
        reviews: reviewArray,
        rating: 0,
        likes: [],
        follows: [],
        // likes: manyRandomUsers(users, randomUserLikesAmt),
        // follows: manyRandomUsers(users, randomUserFollowsAmt),
        comments: commentArray,
      });

      // Update Rating for each Post.
      post.rating = post.reviews.reduce((acc, rev) => rev.rating + acc, 0) / post.reviews.length;

      // Populate Likes and Follows with user object and id { user: user._id }
      manyRandomUsers(users, randomUserLikesAmt).forEach((user) =>
        post.likes.unshift({ user: user._id })
      );

      manyRandomUsers(users, randomUserFollowsAmt).forEach((user) =>
        post.follows.unshift({ user: user._id })
      );

      // Populate posts array
      posts.push(post);
    }

    // Create and save each Post
    posts.forEach(async (post) => await Post.create(post));
    console.log('Data Imported...'.green.inverse);
  } catch (error) {
    console.error(error);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Profile.deleteMany();
    await Post.deleteMany();

    console.log('Data Deleted...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
