let number=[Math.floor(Math.random()*100)];
document.getElementById("btn").addEventListener("click", function() 
 
{
    let input=document.getElementById('userinput').value;
    while(input!=number){
  
    if(input>number)
    {
        alert("you guess is larger");
        break;
    }
    else if(input<number)
    {
        alert("you guess is smaller");  
        break; 
    }
}
if(input==number)
      alert("you guess correct");

});