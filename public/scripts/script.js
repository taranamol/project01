
$(function() {

  var postsController = {

    //this is the template: connecting to the html 
    postTemplate: _.template($('#postTemplate').html());

    all: function() {
      $.get('/api/posts', function(data) {
        var allPosts = data;
        _.each(allPosts, function(post) {
          //append the posts so they appear on the page
          var $postHtml = $(postsController.template(post));
          $('#listOfPosts').append($postHtml); //check this. example has ul?
        });
        postsController.addEventHandlers();
      });
    },

    create: function(newTitle, newDescription) {
      var postData = {title: newTitle, description: newDescription};
    //request to server to create a new post
    $.post('/api/posts', postData, function(data) {
      //passing it through template to show on the page
      var $postHtml = $(postsController.template(data));
      $('#listOfPosts').append($postHtml);
    });
  },

  update: function(postId, updatedTitle, updatedDescription) {
    //updating the info
    $ajax({
      type: 'PUT',
      url: '/api/posts/' + postId,
      data {
        title: updatedTitle,
        description: updatedDescription
      },
      // success: function(data) {
      //   var $postHtml = $(postsController.template(data));
      //   $('#post-' + postId).replaceWith($postHtml);
      // }
    });
  },

  delete: function(postId) {
    $.ajax({
      type: 'DELETE'.
      url: '/api/posts/' + postId,
      success: function(data) {
        $('#post-' + postId).remove();
        }
      });
    },  
      
  addEventHandlers: function() {
    $('#listOfPosts')
      .on('submit', '.updatePost', function(event) {
        event.preventDefault();
        var postId = $(this).closest('.post').attr('data-id');
        var postsController.delete(postId);
      });
  },

  setupView: function() {
    //exising phrases to screen
    postsController.all()

    $('listOfPosts').on('submit', function(event) {
      event.preventDefault();
      var newTitle = $('#newTitle').val();
      var newDescription = $('newDescription').val();
      postsController.create(newTitle, newDescription);
    });
  }
};

//   //adding the id of new_to_do to a variable of new item
//   var $newFormPost = $("#newFormPost"); 

//   //element to hold list of todos
//   var $listPosts = $("#listOfPosts");

//    //model of seed data 
//    var tasks = [
//    {title: "madrid, spain", description: "this restaurant was amazing! great vegetarian choices."},
//    {title: "lisbon, portugal", description: "great meal to start off our foodventures! never knew what sweet potatoes could be!"},
//    {title: "florence, italy", description: "lovedd risotto! can't find it anywhere but italy!"}
//    ];

//   //append existing seed data to html
//   _.each(tasks, function (task, index) {
//     var $task = $(postTemplate(task));
//     $task.attr('data-index', index);
//     $listPosts.append($task)
//   });

//   //constructor function 
//   function blogPost (title, description, image) {
//     this.title = title;
//     this.description = description;
//     // this.image = image;
//   };

//   //variable to hold all of the instances
//   blogPost.all = [];

//   blogPost.prototype.save = function(){
//     blogPost.all.push(this);
//     console.log(this);
//   };

  
//   blogPost.prototype.render = function() {
//     // _.each(ToDo.all, function (task, index) {
//       var $post = $(postTemplate(this));
//     // $task.attr('data-index', index);
//     $listPosts.append($post)
//     console.log("render works")
//     // });
// }

//     //listens to the click for the submit
//     $newFormPost.on("submit", function(event) {
//       event.preventDefault();

//       console.log('post submitted!'); //printing that the submit button was clicked
//       console.log($('#postTitle').val() ); //to do list info
//       console.log($('#postDesc').val() );
//       // console.log($('#postImg').val() );
      
//       // create new todo object from form data
//       var postTitle = $('#postTitle').val();
//       var postDesc = $('#postDesc').val();
//       // var postImg = $('#postImg').val();
//       // var toDoData = {title: toDoName, description: toDoDesc, date: toDoDate};
      
//       //this is test data pre-loaded to the HTML
//       var post1 = new blogPost(postTitle, postDesc);
//       post1.save();
//       post1.render();

//       // //this is for the to do list items that newly added in
//       var $listItems = $("#listOfPosts .post"); 
//       $listItems.click(function (event) {
//         event.preventDefault();
//         $(this).addClass("done");
//       }) 

//     });

//   });