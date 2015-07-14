
$(document).ready(function(){
  $(".click-me").on("click", function(event){

    event.preventDefault();
    var username = $("#gitusername").val();
    var requesturi = "https://api.github.com/users/"+username;
    var reposuri = requesturi+"/repos";
    var repos;
    var userOutput;


    if (!username){
      alert("Please enter a valid username");
      return;
    }
     $("#recieved-data").html(""); // Helps to clear out the page and refresh it with new info. 


    $.getJSON(requesturi, function(json){
        var name = json.name;
        if(name == undefined){
          name = username;
        }
        var numOfFollowers = json.followers;
        var numOfFollowing = json.following;
        var avatarUrl = json.avatar_url;
        var numOfRepos = json.public_repos;
        var profile = json.html_url;

        userOutput = '<h2>'+name+' <span class="profile-name">(@<a href="'+profile+'" target="_blank">'+username+'</a>)</span></h2>';
        userOutput = userOutput+'<img src="'+avatarUrl+'" height="90" width="90" alt='+username+'>';
        userOutput = userOutput+"<p>Followers: "+numOfFollowers+"<br>Follwing: "+numOfFollowing+"<br>Number of Repos: "+numOfRepos+"</p><h3>Available Repos:</h3>";
        userOutput = userOutput+"<div class = 'repos-sec clearfix'>"

        $("#recieved-data").append(userOutput);
        // console.log(json);


    });// End of the first ajax call.


    $.getJSON(reposuri, function(json){
        repos = json;
        // console.log(repos);
        if(repos.length === 0){
          alert("No repositories in this profile :(");
        }else{
          $.each(repos, function(i){   
            var repoOutput;         
             // console.log(repos[i]);
            repoOutput = "<ul><a class = 'btn btn-success' href='"+repos[i].html_url+"'>"+repos[i].name+"</a></ul></div>";
            $("#recieved-data").append(repoOutput);
          });
        } // End of the else statement.
      }); // End of the second ajax call.
    });// End of the second ajax call.


    $(function() {
      var availableTags = ["shivanip", 
                          "roseweixel", 
                          "stevennunez",
                          "aviflombaum"] ;
        $( "#gitusername" ).autocomplete({
            source: availableTags
        });
    });



});
