const test = require('node:test');
const assert = require('node:assert/strict');
const User = require('../models/User');
const authController = require('../controllers/authController');

test('saving a new user hashes the password', async () => {
  const insertOne = User.collection.insertOne;
  User.collection.insertOne = async (document) => ({
    acknowledged: true,
    insertedId: document._id
  });

  try {
    const user = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '08012345678',
      password: 'password123'
    });
    await user.save();

    assert.notEqual(user.password, 'password123');
    assert.equal(await user.matchPassword('password123'), true);
    assert.equal(await user.matchPassword('incorrect'), false);
  } finally {
    User.collection.insertOne = insertOne;
  }
});

test('signup accepts the homepage form fields', async () => {
  const findOne = User.findOne;
  const create = User.create;
  let created;
  User.findOne = async () => null;
  User.create = async (data) => {
    created = data;
    return { ...data, _id: 'test-user', walletBalance: 0 };
  };
  const response = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };

  try {
    await authController.signup({
      body: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '08012345678',
        password: 'password123',
        passwordConfirm: 'password123'
      }
    }, response);

    assert.equal(response.statusCode, 201);
    assert.equal(response.body.success, true);
    assert.equal(created.firstName, 'Test');
    assert.equal(created.lastName, 'User');
    assert.equal(created.phone, '08012345678');
    assert.ok(response.body.token);
  } finally {
    User.findOne = findOne;
    User.create = create;
  }
});
