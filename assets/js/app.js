// Firebase
var config = {
    apiKey: "AIzaSyDGkiWexthigOU0mJMMYGePRkUjViM1bdI",
    authDomain: "train-scheduler-384f2.firebaseapp.com",
    databaseURL: "https://train-scheduler-384f2.firebaseio.com",
    projectId: "train-scheduler-384f2",
    storageBucket: "",
    messagingSenderId: "661433660739"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

//When submit button is pressed
$("#submit-button").on("click", function(){

    // User input
    var TrainName = $("#TrainName").val().trim();
    var Destination = $("#Destination").val().trim();
    var FirstTime = $("#FirstTime").val().trim();
    var Frequency = $("#Frequency").val().trim();

    // Push the data to the database
    database.ref().push({
        TrainName: TrainName,
        Destination: Destination,
        FirstTime: FirstTime,
        Frequency: Frequency
    });
});

// Firebase watcher
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
  
    // Console.loging the last user's data
    console.log(sv.TrainName);
    console.log(sv.Destination);
    console.log(sv.FirstTime);
    console.log(sv.Frequency);

    var newRow = $("<tr>");
    newRow.append("<td>" + sv.TrainName + "</td>" +
                  "<td>" + sv.Destination + "</td>" +
                  "<td>" + sv.Frequency + "</td>" + 
                  "<td>" + /*Next arrival +*/ "</td>" +  
                  "<td>" + /*Minutes away +*/ "</td>");
    $("tbody").append(newRow);
 
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });