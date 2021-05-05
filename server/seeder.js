const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const faker = require('faker');

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
  for (let i = 0; i < 3; i++) {
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

const loadInfo = () => {
  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(2),
      about: faker.lorem.paragraph(),
      image: faker.image.people(),
    });

    user.save().then((userRef) => {
      console.log(`${userRef} saved successfully`);

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

      profile.save().then((profileRef) => {
        console.log(`${profileRef} saved successfully`);

        const reviewArray = createReviews(user);
        const commentArray = createComments(user);

        const post = new Post({
          user: user._id,
          text: faker.lorem.paragraph(),
          title: faker.hacker.phrase(),
          name: user._name,
          image: faker.image.city(),
          numReviews: 5,
          reviews: reviewArray,
          likes: [{ user: user._id }],
          follows: [{ user: user._id }],
          comments: commentArray,
        });

        post.save().then((postRef) => {
          console.log(`${postRef} saved successfully`);
        });
      });
    });
  }
};

// Import into DB
loadInfo();

// Delete Data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Profile.deleteMany();
    await Post.deleteMany();

    console.log('Data Imported...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
}
