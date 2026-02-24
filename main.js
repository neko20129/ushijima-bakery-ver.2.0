//EventListener
window.addEventListener('load', function() {
  load();
});

buyOpen.addEventListener('click', () => {
    buyPage = 1;
    reloadOfBuy();
});

buyToL.addEventListener('click', () => {
    if (buyPage > 1) {
        buyPage--;
    }
    reloadOfBuy();
});

buyToR.addEventListener('click', () => {
    if (buyPage < buyDisplay.length - 1) {
        buyPage++;
    }
    reloadOfBuy();
});

makeOpen.addEventListener('click', () => {
    makePage = 1;
    reloadOfMake();
});

makeToL.addEventListener('click', () => {
    if (makePage > 1) {
        makePage--;
    }
    reloadOfMake();
});

makeToR.addEventListener('click', () => {
    if (makePage < makeDisplay.length - 1) {
        makePage++;
    }
    reloadOfMake();
});

buy1.addEventListener('click', () => {
    if (buyDisplay[buyPage][4] <= level) {
        buy(1);
    }
});

buy10.addEventListener('click', () => {
    if (buyDisplay[buyPage][4] <= level) {
        buy(10);
    }
});

buyAll.addEventListener('click', () => {
    if (buyDisplay[buyPage][4] <= level) {
        let num = Math.floor(money / buyDisplay[buyPage][1]);
        buy(num);
    }
});

sell1.addEventListener('click', () => {
    if (buyDisplay[buyPage][4] <= level) {
        sell(1);
    }
});

sell10.addEventListener('click', () => {
    if (buyDisplay[buyPage][4] <= level) {
        sell(10);
    }
});

sellAll.addEventListener('click', () => {
    if (buyDisplay[buyPage][4] <= level) {
        let num = buyDisplay[buyPage][3];
        sell(num);
    }
});

make1.addEventListener('click', () => {
    if (makeDisplay[makePage][7] <= level) {
        make(1);
    }
});

make10.addEventListener('click', () => {
    if (makeDisplay[makePage][7] <= level) {
        let canmake = true;
        let makeN = 0;
        if (makeDisplay[makePage][1][0] != 0) { //材料枠1に材料がある?
            if (buyDisplay[makeDisplay[makePage][1][0]][3] >= makeDisplay[makePage][1][1]) {//持っている数が必要数ある?
                makeN = Math.floor(buyDisplay[makeDisplay[makePage][1][0]][3] / makeDisplay[makePage][1][1]);
                //持っている数÷必要数を切り下げて、何個作れるか
            } else {
                canmake = false;
            };
        };
    
        if (makeDisplay[makePage][2][0] != 0) { //材料枠2に材料がある?
            if (buyDisplay[makeDisplay[makePage][2][0]][3] >= makeDisplay[makePage][2][1]) {//持っている数が必要数ある? 
              if (makeN > Math.floor(buyDisplay[makeDisplay[makePage][2][0]][3] / makeDisplay[makePage][2][1])) {
                    //材料枠1の条件で買える量より少なかったら合わせる
                    makeN = Math.floor(buyDisplay[makeDisplay[makePage][2][0]][3] / makeDisplay[makePage][2][1]);
                };
                //持っている数÷必要数を切り下げて、何個作れるか
            } else {
                canmake = false;
            };
        };

        if (makeDisplay[makePage][3][0] != 0) { //材料枠3に材料がある?
            if (buyDisplay[makeDisplay[makePage][3][0]][3] >= makeDisplay[makePage][3][1]) {//持っている数が必要数ある?
                if (makeN > Math.floor(buyDisplay[makeDisplay[makePage][3][0]][3] / makeDisplay[makePage][3][1])) {
                    //材料枠1,2の条件で買える量より少なかったら合わせる
                    makeN = Math.floor(buyDisplay[makeDisplay[makePage][3][0]][3] / makeDisplay[makePage][3][1]);
                };
                //持っている数÷必要数を切り下げて、何個作れるか
            } else {
                canmake = false;
            };
        };

        if (makeN >= 10) make(10);
    };
});

makeAll.addEventListener('click', () => {
    let canmake = true;
    let makeN = 0;
    if (makeDisplay[makePage][1][0] != 0) { //材料枠1に材料がある?
        if (buyDisplay[makeDisplay[makePage][1][0]][3] >= makeDisplay[makePage][1][1]) {//持っている数が必要数ある?
            makeN = Math.floor(buyDisplay[makeDisplay[makePage][1][0]][3] / makeDisplay[makePage][1][1]);
            //持っている数÷必要数を切り下げて、何個作れるか
        } else {
            canmake = false;
        };
    };
    
    if (makeDisplay[makePage][2][0] != 0) { //材料枠2に材料がある?
        if (buyDisplay[makeDisplay[makePage][2][0]][3] >= makeDisplay[makePage][2][1]) {//持っている数が必要数ある?
            if (makeN > Math.floor(buyDisplay[makeDisplay[makePage][2][0]][3] / makeDisplay[makePage][2][1])) {
                //材料枠1の条件で買える量より少なかったら合わせる
                makeN = Math.floor(buyDisplay[makeDisplay[makePage][2][0]][3] / makeDisplay[makePage][2][1]);
            };
            //持っている数÷必要数を切り下げて、何個作れるか
        } else {
            canmake = false;
        };
    };

    if (makeDisplay[makePage][3][0] != 0) { //材料枠3に材料がある?
        if (buyDisplay[makeDisplay[makePage][3][0]][3] >= makeDisplay[makePage][3][1]) {//持っている数が必要数ある?
            if (makeN > Math.floor(buyDisplay[makeDisplay[makePage][3][0]][3] / makeDisplay[makePage][3][1])) {
                //材料枠1,2の条件で買える量より少なかったら合わせる
                makeN = Math.floor(buyDisplay[makeDisplay[makePage][3][0]][3] / makeDisplay[makePage][3][1]);
            };
            //持っている数÷必要数を切り下げて、何個作れるか
        } else {
            canmake = false;
        };
    };

    canmake === true && make(makeN)
    //作れるなら作れる分作る
});

saveElm.addEventListener('click', () => {
  alert('以下をコピーしてください。出力された値を変更した場合、データが壊れる可能性があります。\n'+
        money+'*'+level+'*'+sold+'*'+levelUp+'*'+JSON.stringify(buyDisplay)+'*'+JSON.stringify(makeDisplay));
});
//ゲームループ
setInterval(() => {
    reloadOfDisplay();
    if (Math.floor(Math.random() * 15 * (100 - level * 2)) === 1) {
        if (makeDisplay[1][6] > 0 || makeDisplay[2][6] > 0) comeBuyer();
    }
    if (sold >= levelUp) {
        level++
        sold = sold - levelUp;
        levelUp = Math.floor(levelUp * 1.5);
        addMessage('レベルアップ！', 1)
    }
}, 10);

//関数
function addMessage(message,color) {
    const createAdd = document.createElement('p');
    createAdd.textContent = message;
    if (color === 1) {
        createAdd.style.backgroundColor = 'red';
    }
    log.appendChild(createAdd);
    let timerN = 3;
    const timer = setInterval(() => {
        timerN--;
        if (timerN === 0) {
            createAdd.style.opacity = 0;
        } else if (timerN < 0) {
            clearInterval(timer);
            createAdd.remove();
        }
    }, 1000);
};

function reloadOfDisplay() {
    levelElm.textContent = level;
    soldElm.textContent = sold;
    levelUpElm.textContent = levelUp;
    moneyElm1.textContent = money;
    moneyElm2.textContent = money;

    reloadOfChangeTub();
}

function reloadOfChangeTub() {
    if (buyDisplay[1]) {
        if (buyDisplay[1][4] <= level) {
            table1_1_name.textContent = buyDisplay[1][0];
            table1_1_num.textContent = buyDisplay[1][3];
            table1_1_elm.style.display = '';
        } else {
            table1_1_elm.style.display = 'none';
        }
    } else {
        table1_1_elm.style.display = 'none';
    }

    if (buyDisplay[2]) {
        if (buyDisplay[2][4] <= level) {
            table1_2_name.textContent = buyDisplay[2][0];
            table1_2_num.textContent = buyDisplay[2][3];
            table1_2_elm.style.display = '';
        } else {
            table1_2_elm.style.display = 'none';
        }
    } else {
        table1_2_elm.style.display = 'none';
    }

    if (buyDisplay[3]) {
        if (buyDisplay[3][4] <= level) {
            table1_3_name.textContent = buyDisplay[3][0];
            table1_3_num.textContent = buyDisplay[3][3];
            table1_3_elm.style.display = '';
        } else {
            table1_3_elm.style.display = 'none';
        }
    } else {
        table1_3_elm.style.display = 'none';
    }

    if (buyDisplay[4]) {
        if (buyDisplay[4][4] <= level) {
            table1_4_name.textContent = buyDisplay[4][0];
            table1_4_num.textContent = buyDisplay[4][3];
            table1_4_elm.style.display = '';
        } else {
            table1_4_elm.style.display = 'none';
        }
    } else {
        table1_4_elm.style.display = 'none';
    }

    if (buyDisplay[5]) {
        if (buyDisplay[5][4] <= level) {
            table1_5_name.textContent = buyDisplay[5][0];
            table1_5_num.textContent = buyDisplay[5][3];
            table1_5_elm.style.display = '';
        } else {
            table1_5_elm.style.display = 'none';
        }
    } else {
        table1_5_elm.style.display = 'none';
    }

    if (buyDisplay[6]) {
        if (buyDisplay[6][4] <= level) {
            table1_6_name.textContent = buyDisplay[6][0];
            table1_6_num.textContent = buyDisplay[6][3];
            table1_6_elm.style.display = '';
        } else {
            table1_6_elm.style.display = 'none';
        }
    } else {
        table1_6_elm.style.display = 'none';
    }

    if (buyDisplay[7]) {
        if (buyDisplay[7][4] <= level) {
            table1_7_name.textContent = buyDisplay[7][0];
            table1_7_num.textContent = buyDisplay[7][3];
            table1_7_elm.style.display = '';
        } else {
            table1_7_elm.style.display = 'none';
        }
    } else {
        table1_7_elm.style.display = 'none';
    }

    if (buyDisplay[8]) {
        if (buyDisplay[8][4] <= level) {
            table1_8_name.textContent = buyDisplay[8][0];
            table1_8_num.textContent = buyDisplay[8][3];
            table1_8_elm.style.display = '';
        } else {
            table1_8_elm.style.display = 'none';
        }
    } else {
        table1_8_elm.style.display = 'none';
    }

    if (buyDisplay[9]) {
        if (buyDisplay[9][4] <= level) {
            table1_9_name.textContent = buyDisplay[9][0];
            table1_9_num.textContent = buyDisplay[9][3];
            table1_9_elm.style.display = '';
        } else {
            table1_9_elm.style.display = 'none';
        }
    } else {
        table1_9_elm.style.display = 'none';
    }


    if (makeDisplay[1]) {
        if (makeDisplay[1][7] <= level) {
            table2_1_name.textContent = makeDisplay[1][0];
            table2_1_num.textContent = makeDisplay[1][6];
            table2_1_elm.style.display = '';
        } else {
            table2_1_elm.style.display = 'none';
        }
    } else {
        table2_1_elm.style.display = 'none';
    }

    if (makeDisplay[2]) {
        if (makeDisplay[2][7] <= level) {
            table2_2_name.textContent = makeDisplay[2][0];
            table2_2_num.textContent = makeDisplay[2][6];
            table2_2_elm.style.display = '';
        } else {
            table2_2_elm.style.display = 'none';
        }
    } else {
        table2_2_elm.style.display = 'none';
    }

    if (makeDisplay[3]) {
        if (makeDisplay[3][7] <= level) {
            table2_3_name.textContent = makeDisplay[3][0];
            table2_3_num.textContent = makeDisplay[3][6];
            table2_3_elm.style.display = '';
        } else {
            table2_3_elm.style.display = 'none';
        }
    } else {
        table2_3_elm.style.display = 'none';
    }

    if (makeDisplay[4]) {
        if (makeDisplay[4][7] <= level) {
            table2_4_name.textContent = makeDisplay[4][0];
            table2_4_num.textContent = makeDisplay[4][6];
            table2_4_elm.style.display = '';
        } else {
            table2_4_elm.style.display = 'none';
        }
    } else {
        table2_4_elm.style.display = 'none';
    }

    if (makeDisplay[5]) {
        if (makeDisplay[5][7] <= level) {
            table2_5_name.textContent = makeDisplay[5][0];
            table2_5_num.textContent = makeDisplay[5][6];
            table2_5_elm.style.display = '';
        } else {
            table2_5_elm.style.display = 'none';
        }
    } else {
        table2_5_elm.style.display = 'none';
    }

    if (makeDisplay[6]) {
        if (makeDisplay[6][7] <= level) {
            table2_6_name.textContent = makeDisplay[6][0];
            table2_6_num.textContent = makeDisplay[6][6];
            table2_6_elm.style.display = '';
        } else {
            table2_6_elm.style.display = 'none';
        }
    } else {
        table2_6_elm.style.display = 'none';
    }

    if (makeDisplay[7]) {
        if (makeDisplay[7][7] <= level) {
            table2_7_name.textContent = makeDisplay[7][0];
            table2_7_num.textContent = makeDisplay[7][6];
            table2_7_elm.style.display = '';
        } else {
            table2_7_elm.style.display = 'none';
        }
    } else {
        table2_7_elm.style.display = 'none';
    }

    if (makeDisplay[8]) {
        if (makeDisplay[8][7] <= level) {
            table2_8_name.textContent = makeDisplay[8][0];
            table2_8_num.textContent = makeDisplay[8][6];
            table2_8_elm.style.display = '';
        } else {
            table2_8_elm.style.display = 'none';
        }
    } else {
        table2_8_elm.style.display = 'none';
    }

    if (makeDisplay[9]) {
        if (makeDisplay[9][7] <= level) {
            table2_9_name.textContent = makeDisplay[9][0];
            table2_9_num.textContent = makeDisplay[9][6];
            table2_9_elm.style.display = '';
        } else {
            table2_9_elm.style.display = 'none';
        }
    } else {
        table2_9_elm.style.display = 'none';
    }
}

function reloadOfBuy() {
    buyName.textContent = buyDisplay[buyPage][0];
    buyNedan.textContent = buyDisplay[buyPage][1];
    buyHave.textContent = buyDisplay[buyPage][3];
    buyOpenLv.textContent = buyDisplay[buyPage][4];
    buyImg.src = buyDisplay[buyPage][2];
    
    if (buyPage <= 1) {
        buyToL.style.filter = 'brightness(0.5)';
    } else {
        buyToL.style.filter = '';
    }
    
    if (buyPage >= buyDisplay.length - 1) {
        buyToR.style.filter = 'brightness(0.5)';
    } else {
        buyToR.style.filter = '';
    }

    if (buyDisplay[buyPage][4] <= level) {
        buy1.style.filter = '';
        buy10.style.filter = '';
        buyAll.style.filter = '';
        sell1.style.filter = '';
        sell10.style.filter = '';
        sellAll.style.filter = '';
        buyOpenLvElm.style.display = 'none';
    } else {
        buy1.style.filter = 'brightness(0.5)';
        buy10.style.filter = 'brightness(0.5)';
        buyAll.style.filter = 'brightness(0.5)';
        sell1.style.filter = 'brightness(0.5)';
        sell10.style.filter = 'brightness(0.5)';
        sellAll.style.filter = 'brightness(0.5)';
        buyOpenLvElm.style.display = '';
    }
};

function reloadOfMake() {
    makeName.textContent = makeDisplay[makePage][0];
    makeHave.textContent = makeDisplay[makePage][6];
    income.textContent = makeDisplay[makePage][4];
    makeOpenLv.textContent = makeDisplay[makePage][7];
    makeImg.src = makeDisplay[makePage][5];

    
    
    if (makePage <= 1) {
        makeToL.style.filter = 'brightness(0.5)'
    } else {
        makeToL.style.filter = '';
    }
    
    if (makePage >= makeDisplay.length - 1) {
        makeToR.style.filter = 'brightness(0.5)'
    } else {
        makeToR.style.filter = '';
    }

    if (makeDisplay[makePage][1][0] != 0) {
        ing1.style.display = '';
        ing1_img.src = buyDisplay[makeDisplay[makePage][1][0]][2];
        ing1_have.textContent = buyDisplay[makeDisplay[makePage][1][0]][3];
        ing1_need.textContent = makeDisplay[makePage][1][1];
    } else {
        ing1.style.display = 'none';
    }

    if (makeDisplay[makePage][2][0] != 0) {
        ing2.style.display = '';
        ing2_img.src = buyDisplay[makeDisplay[makePage][2][0]][2];
        ing2_have.textContent = buyDisplay[makeDisplay[makePage][2][0]][3];
        ing2_need.textContent = makeDisplay[makePage][2][1];
    } else {
        ing2.style.display = 'none';
    }

    if (makeDisplay[makePage][3][0] != 0) {
        ing3.style.display = '';
        ing3_img.src = buyDisplay[makeDisplay[makePage][3][0]][2];
        ing3_have.textContent = buyDisplay[makeDisplay[makePage][3][0]][3];
        ing3_need.textContent = makeDisplay[makePage][3][1];
    } else {
        ing3.style.display = 'none';
    }

    if (makeDisplay[makePage][7] <= level) {
        make1.style.filter = '';
        make10.style.filter = '';
        makeAll.style.filter = '';
        makeOpenLvElm.style.display = 'none';
    } else {
        make1.style.filter = 'brightness(0.5)';
        make10.style.filter = 'brightness(0.5)';
        makeAll.style.filter = 'brightness(0.5)';
        makeOpenLvElm.style.display = '';
    }
};

function buy(num) {
    if (buyDisplay[buyPage][1]*num <= money) {
        money = money - buyDisplay[buyPage][1] * num;
        if (buyDisplay[buyPage][3] <= 0) {
            buyDisplay[buyPage][3] = 1
            buyDisplay[buyPage][3] = buyDisplay[buyPage][3] + num - 1;
        } else {
            buyDisplay[buyPage][3] = buyDisplay[buyPage][3] + num
        }
    }
    reloadOfBuy();
    save();
}

function sell(num) {
    if (buyDisplay[buyPage][3] >= num) {
        money = money + buyDisplay[buyPage][1] * num;
        buyDisplay[buyPage][3] = buyDisplay[buyPage][3] - num;
    }
    reloadOfBuy();
    save();
}

function make(num) {
    if (makeDisplay[makePage][1][0] == 0 || 
        buyDisplay[makeDisplay[makePage][1][0]][3] * num >= makeDisplay[makePage][1][1])
    {
        buyDisplay[makeDisplay[makePage][1][0]][3] = buyDisplay[makeDisplay[makePage][1][0]][3] - makeDisplay[makePage][1][1] * num;
    } else {
        return;
    };

    if (makeDisplay[makePage][2][0] == 0 || 
        buyDisplay[makeDisplay[makePage][2][0]][3] * num >= makeDisplay[makePage][2][1])
    {
        buyDisplay[makeDisplay[makePage][2][0]][3] = buyDisplay[makeDisplay[makePage][2][0]][3] - makeDisplay[makePage][2][1] * num;
    } else {
        return;
    };

    if (makeDisplay[makePage][3][0] == 0 || 
        buyDisplay[makeDisplay[makePage][3][0]][3] * num >= makeDisplay[makePage][3][1])
    {
        buyDisplay[makeDisplay[makePage][3][0]][3] = buyDisplay[makeDisplay[makePage][3][0]][3] - makeDisplay[makePage][3][1] * num;
    } else {
        return;
    };

    if (makeDisplay[makePage][6] <= 0) {
            makeDisplay[makePage][6] = 1
            makeDisplay[makePage][6] = makeDisplay[makePage][6] + num - 1;
        } else {
            makeDisplay[makePage][6] = makeDisplay[makePage][6] + num
    }
    
    reloadOfMake();
    save();
    addMessage(makeDisplay[makePage][0] + 'を' + num + '個作った');
}

function comeBuyer() {
    const canbuyList = [];
    for (let i = 1; i < 9; i++) {
        if (!makeDisplay[i]) {
            break;
        }
        if (makeDisplay[i][6]) {
            if (makeDisplay[i][6] > 0) {
                canbuyList.push(i);
            }
        }
    }
    let willbuytype = canbuyList[Math.floor(Math.random() * canbuyList.length)];
    let willbuynum = Math.floor(Math.random() * Math.min(makeDisplay[willbuytype][6], level + 1)) + 1;
    //乱数で選んだ内の1つのパンの個数
    addMessage(makeDisplay[willbuytype][0] + 'が' + willbuynum + '個売れた');
    makeDisplay[willbuytype][6] = makeDisplay[willbuytype][6] - willbuynum;
    money = money + makeDisplay[willbuytype][4] * willbuynum;
    sold = sold + willbuynum;
    save();
}
