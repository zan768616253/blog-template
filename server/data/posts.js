'use strict';
import keystone from 'keystone';

export function getPost(postid, /* ref */data) {
  return new Promise((resolve, reject) => {
    keystone.list('Post').model.findOne({
        state: 'published',
        slug: postid,
      })
      .populate('author categories')
      .exec(function (err, result) {
        data.post = result;
        resolve();
      });
  });
}

export function getPosts(/* ref */data) {
  return new Promise((resolve, reject) => {
    keystone.list('Post')
      .model
      .find()
      .where('state', 'published')
      .sort('-publishedDate')
      .populate('author categories')
      .exec(function (err, results) {
        data.posts = results || [];
        resolve();
      });
  });
}