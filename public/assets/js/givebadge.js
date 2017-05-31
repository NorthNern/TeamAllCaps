//IMPORTANT TODO:  This is just a sample from the May13 'blog' project for updating posts.
// We can use as a template for Plaudit posts.
// ***HEAVY EDITS NEEDED***

$(document).ready(function() {

  // Gets an optional query string from our url (i.e. ?badge_id=23)
  // var url = window.location.search;
  // var postId;
  // // Sets a flag for whether or not we're updating a post to be false initially
  // var updating = false;

  // // 
  // // If we have this section in our url, we pull out the post id from the url
  // // In localhost:8080/cms?post_id=1, postId is 1
  // if (url.indexOf("?badge_id=") !== -1) {
  //   badgeId = url.split("=")[1];
  //   getBadgeData(BadgeId);
  // }

  // $(':radio[name=badge-group]').change(function() {
  //   //In Case we want to add animations or anything when different badge selected
  //   // alert(this.value);
  // });
  // Getting jQuery references to the post commenty, badgeId and recipient
      var badgeRecipient = $("#autocomplete-input");
      var badgeSubmitForm = $("#badge-form");
      var badgeComment = $("#comment");



// Autocomplete helps user find recipient; although it does not prevent user from sending badge to random people. Names and images are hard-coded, which is not ideal, but for now it works. Is there a Sequelize statement to add?

  $("input.autocomplete").autocomplete({
    data: {
        "Adam McNerney": "./images/profilePictures/Adam.png",
        "Michelle Didier": "./images/profilePictures/Michelle.png",
        "Rebecca Palmore": "./images/profilePictures/Rebecca.png",
        "Susan Heiniger": "./images/profilePictures/Susan.png",
        "Yilin Xu": "./images/profilePictures/Yilin.png"
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });

// Validate recipient is in database. Alert user if they are not, and clear out recipient name field.

$(badgeRecipient).on("change", function(event) {
    event.preventDefault();
   $.post("/checkname", badgeRecipient, function(data) {
        if (data === true) {
          console.log("Great!");
        } else if (data === "invalid") {
          console.log("Shucks!");
          alert("There is no Plaudit user with that name. Please try again.")
          $(badgeRecipient).val("");
        };

    });

});

//TODO DELETE IF NOT NEEDED:
  // var postCategorySelect = $("#category");
  // // Giving the postCategorySelect a default value
  // postCategorySelect.val("Personal");

  // Adding an event listener for when the form is submitted
  $(badgeSubmitForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    var badgeType = $(':radio[name=badge-group]:checked').val();

    // Wont submit the badge if we are missing a body or a title
    if (!badgeComment.val().trim() || !badgeType || !badgeRecipient.val().trim()) {
      return;
    }    
    var newBadge = {
          recipient_name: badgeRecipient.val().trim(),
          badgeid: badgeType,
          //badgeurl: TODO:  Could do if 6 cases here and assign, or just use badgeid and load badge
          badgeurl: "/assets/images/badges/" + badgeType + ".svg",
          comment: badgeComment.val().trim()
    }
    submitBadge(newBadge);
    // Constructing a newBadge object to hand to the database

    // db.employ_basic.findOne({
    //   where:{
    //     name: badgeRecipient.val().trim()
    //   }
    // }).then(function(data){   
    //   (if data){
    //   }else{
    //     alert("recipient not found");
    //   };
    })
    
    //TODO:  Add a query to check if recipient_name exists as a user

    // If we're updating a badge run updateBadge.  Currently not implemented
    // Otherwise run submitBadge to create a whole new post
  //   if (updating) {
  //     newBadge.id = badgeId;
  //     updateBadge(newBadge);
  //   }
  //   else {
  //     submitBadge(newBadge);
  //   }
  // });

  // Submits a new badge and brings user to feed page upon completion
  function submitBadge(Badge) {
    $.post("/badge/post", Badge, function(req,res) {
      console.log("sucess");
      window.location.href = "/index";
    });
  }
//TODO:  Following currently unused, but included if/when we want to edit badges
  // // Gets post data for a post if we're editing
  // function getBadgeData(id) {
  //   $.get("/badge/post/" + id, function(data) {
  //     if (data) {
  //       // If this post exists, prefill our cms forms with its data
  //       badgeRecipient.val(data.recipient_name);
  //       badgeComment.val(data.comment);
  //       badgeType.val(data.badgeid);
  //       // If we have a post with this id, set a flag for us to know to update the post
  //       // when we hit submit
  //       updating = true;
  //     }
  //   });
  // }

  // // Update a given post, bring user to the index page when done
  // function updateBadge(badge) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/badge/post/",
  //     data: badge
  //   })
  //   .done(function() {
  //     window.location.href = "/index";
  //   });
  // }
// });
});