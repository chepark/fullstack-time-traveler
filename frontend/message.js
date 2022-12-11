const popup= document.getElementById('popup');
function showMessage(){
  popup.show()
}
function closeMessage(){
  popup.close()
}

function success(){
  let message=document.getElementById('popupMessage');
  let leftButton=document.getElementById('leftButton');
  let rightButton=document.getElementById('rightButton');

    message.innerHTML = `Congratulations! <br> You found a right timezones`
    leftButton.innerHTML =`Exit`
    rightButton.innerHTML=`Play next`

  const popup= document.getElementById('popup');
  popup.show();}
success();

function failure(){
  const popup= document.getElementById('popup');
    popup.show();
  let message=document.getElementById('popupMessage');
  let leftButton=document.getElementById('leftButton');
  let rightButton=document.getElementById('rightButton');

  message.innerHTML =`Oops!!! <br> You are in wrong timezones.`
  leftButton.innerHTML = `Exit`
  rightButton.innerHTML=`Try Again`
}
failure();

function gameOver(){
  const popup= document.getElementById('popup');
    popup.show();
  let message=document.getElementById('popupMessage');
  let leftButton=document.getElementById('leftButton');
  let rightButton=document.getElementById('rightButton');

  message.innerHTML =`Game over.<br>Your CO2 budget is over. `
  leftButton.innerHTML = `Exit`
  rightButton.innerHTML=`Try Again`
}
gameOver();