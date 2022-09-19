db.createUser({
  user: 'TestUser',
  pwd: 'testPassword',
  roles: [
    {
      role: 'readWrite',
      db: 'weGoNiceTest',
    },
  ],
});
