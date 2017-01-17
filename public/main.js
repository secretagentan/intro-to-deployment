$('#createPost').on('click', function(evt) {
  var message = $('#message').val();
  $.post('/posts', {message: message}, function(res) {
    $('ul').append('<li>' + message + '</li>');
  });
});

$.get('/posts', function(res) {
  // http://underscorejs.org/#template
  var template = $('#posts-template').html();
  var compiled = _.template(template);
  var html = compiled({posts: res.posts});
  $('#posts').html(html);
});
