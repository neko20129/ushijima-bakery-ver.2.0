function save() {
  localStorage.setItem('moneyKey',money);
  localStorage.setItem('levelKey',level);
  localStorage.setItem('soldKey',sold);
  localStorage.setItem('levelUpKey',levelUp);
  localStorage.setItem('buyDisplayKey',JSON.stringify(buyDisplay));
  localStorage.setItem('makeDisplayKey',JSON.stringify(makeDisplay));
  localStorage.setItem('upgradeDisplayKey',JSON.stringify(upgradeDisplay));
}

function load() {
  if (localStorage.getItem('moneyKey') && localStorage.getItem('levelKey') && localStorage.getItem('soldKey') && localStorage.getItem('levelUpKey') && localStorage.getItem('buyDisplayKey') && localStorage.getItem('makeDisplayKey') && localStorage.getItem('upgradeDisplayKey')) {
    money = JSON.parse(localStorage.getItem('moneyKey'));
    level = JSON.parse(localStorage.getItem('levelKey'));
    sold = JSON.parse(localStorage.getItem('soldKey'));
    levelUp = JSON.parse(localStorage.getItem('levelUpKey'));
    buyDisplay = JSON.parse(localStorage.getItem('buyDisplayKey'));
    makeDisplay = JSON.parse(localStorage.getItem('makeDisplayKey'));
    upgradeDisplay = JSON.parse(localStorage.getItem('upgradeDisplayKey'));
  } else {
      clear();
  }
}

function clearStorage() {
    localStorage.clear();
}





