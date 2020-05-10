callMe();
document.body.style.background = "green";
console.log("my comment");
function callMe(){ (4)
setTimeout(function(){
console.log("function called");
}, 1000);
}