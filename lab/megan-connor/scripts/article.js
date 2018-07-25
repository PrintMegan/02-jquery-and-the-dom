'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// Purpose is to create blog post article. It's cap because its a constructor function. Context of "this" is an instance article object. rawDataObj references the info passed through the constructor function.

function Article(rawDataObj) {
  //DONE: Use the JS object that is passed in to complete this constructor function:

  this.blogPost = rawDataObj;
  // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function () {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // It copies all matched elements, raw data, convient way to duplicate elements on pages.
  const article = this.blogPost;

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');
  if (!article.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', article.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */


  $newArticle
    .find('h1').text(article.title);
  $newArticle
    .find('a').text(article.author).attr('href', article.authorUrl);
  $newArticle
    .find('.article-body').html(article.body);
  // REVIEW: Display the date as a relative number of 'days ago' REVIEWED
  $newArticle
    .find('time').html('about ' + parseInt((new Date() - new Date(article.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle
    .append('<hr>');
  return $newArticle;
};

rawData.sort(function (a, b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method. REVIEWED
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE: Refactor these for loops using the .forEach() array method.

rawData.forEach(function (article) {
  articles.push(new Article(article));
});

articles.forEach(function (article) {
  $('#articles').append(article.toHtml());
});