const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const faker = require('faker');
const _ = require('lodash');

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

const createProjects = () => {
  const projectArray = [];
  for (let i = 0; i < 3; i++) {
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

const createExperiences = () => {
  const experienceArray = [];
  for (let i = 0; i < 3; i++) {
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

const createReviews = (user) => {
  const reviewArray = [];
  for (let i = 0; i < 5; i++) {
    const review = {
      name: user.name,
      rating: faker.random.number({ min: 1, max: 5 }),
      comment: faker.lorem.paragraph(),
      user: user._id,
    };

    reviewArray.push(review);
  }

  return reviewArray;
};

const createComments = (user) => {
  const commentArray = [];
  for (let i = 0; i < 5; i++) {
    const comment = {
      user: user._id,
      name: user.name,
      text: faker.lorem.paragraph(),
      date: faker.date.recent(),
    };
    commentArray.push(comment);
  }
  return commentArray;
};

// Import into DB
const importData = async () => {
  try {
    const quantity = 20;
    const users = [];
    const profiles = [];
    const posts = [];

    for (let i = 0; i < quantity; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber(2),
        about: faker.lorem.paragraph(),
        image: `${faker.image.people()}?random=${Date.now()}`,
      });

      const projectArray = createProjects();
      const experienceArray = createExperiences();

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
        follows: [{ user: user._id }],
        user: user._id,
      });

      const reviewArray = createReviews(user);
      const commentArray = createComments(user);

      const post = new Post({
        user: user._id,
        text: faker.lorem.paragraph(),
        title: faker.hacker.phrase(),
        name: user.name,
        image: `${faker.image.city()}?random=${Date.now()}`,
        numReviews: 5,
        reviews: reviewArray,
        likes: [{ user: user._id }],
        follows: [{ user: user._id }],
        comments: commentArray,
      });

      users.push(user);
      profiles.push(profile);
      posts.push(post);
    }

    users.forEach(async (user) => await User.create(user));
    profiles.forEach(async (profile) => await Profile.create(profile));
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
