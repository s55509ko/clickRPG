//名前の入力
let name = prompt("名前を入力してください");
plySt0.textContent = name;
//プレイヤーデータ
let flag = true;
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = [5, 10, 20, 40, 80, 160, 320, 640, 1280];
let plyExpNeed = [5, 10, 20, 40, 80, 160, 320, 640, 1280];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(7);
for (let i = 0; plySt.length > i; i++) {
  plySt[i] = document.getElementById("plySt" + i);
  console.log(plySt[i]);
}

//敵のデータ
let eneLv = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let eneHp = new Array(10, 20, 40, 80, 100, 130, 170, 200, 250, 1000);
let eneExp = new Array(1, 5, 10, 20, 40, 80, 160, 320, 640, 1080);
let eneHpMax = new Array(10, 25, 50, 80, 100, 150, 300, 500, 700, 1000);
let eneAtt = new Array(2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
let eneKill = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let eneCntMax = new Array(5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
let eneCnt = new Array(5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
let eneName = new Array(
  "スライム",
  "コウモリ",
  "ネズミ",
  "ヘビ",
  "オオカミ",
  "小鬼",
  "オバケ",
  "ゾンビ",
  "炎の勾玉",
  "BOSS:オオグマ"
);
let eneEne = 0;
let eneImg = document.getElementById("eneImg");
let eneSec = document.getElementById("eneSec");
let eneSt = new Array(5);
for (let i = 0; eneSt.length > i; i++) {
  eneSt[i] = document.getElementById("eneSt" + i);
  console.log(eneSt[i]);
}
function change() {
  eneHp[eneEne] = eneHpMax[eneEne];
  eneImg.src = "img/enemyA" + eneEne + ".png";
  eneSt0.textContent = eneName[eneEne];
  eneSt1.textContent = "レベル:" + eneLv[eneEne];
  eneSt2.textContent = "HP:" + eneHp[eneEne];
  eneSt3.textContent = "攻撃力:" + eneAtt[eneEne];
  eneSt4.textContent = "倒した回数" + eneKill[eneEne];
}

//プレイヤーを回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP:" + plyHp;
  }
});

//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + eneEne + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + eneEne + ".png";
    if (eneHp[eneEne] > 0) {
      eneHp[eneEne] -= plyAtt;
      if (eneHp[eneEne] < 0) {
        eneHp[eneEne] = 0;
      }
    } else {
      eneHp[eneEne] = eneHpMax[eneEne];
      eneKill[eneEne]++;
      eneSt4.textContent = "倒した回数:" + eneKill[eneEne];
      //ゲームクリア
      if (eneKill[9] > 0) {
        flag = false;
        clearInterval(loop);
        eneSec.textContent = "ゲームクリア！おめでとう！！";
      }
      //経験値の処理
      plyExp += eneExp[eneEne];
      if (plyExp <= 3000) {
        plySt5.textContent = "経験値:" + plyExp;
        plyExpNext[plyLv] -= eneExp[eneEne];
      } else {
        plySt5.textContent = "最大に達しました！";
        plySt6.textContent = "最大に達しました！";
      }
      if (plyExpNext[plyLv] <= 0) {
        plyLv++;
        console.log(plyExpNext[plyLv]);
        plyExpNext[plyLv] = plyExpNeed[plyLv];
        plySt1.textContent = "レベル" + plyLv;
        plyHpMax = plyLv * 2 + 6;
        plyHp = plyHpMax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt++;
        plySt3.textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法:" + plyHeal;
      }

      plySt6.textContent =
        "次のレベルまでの経験値" + plyExpNext[plyLv] + "ポイント";
    }
    eneSt2.textContent = "HP:" + eneHp[eneEne];
  }
});

//逃げる＆次の敵
let left = document.getElementById("left");
let right = document.getElementById("right");
left.addEventListener("click", () => {
  if (flag) {
    if (eneEne > 0) {
      eneEne--;
      change();
    }
  }
});
right.addEventListener("click", () => {
  if (flag) {
    if (eneEne < 9) {
      eneEne++;
      change();
    }
  }
});
//敵が時間ごとに攻撃
let loop = setInterval(() => {
  if (eneCnt[eneEne] > 0) {
    eneCnt[eneEne]--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneEne] + "秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp = plyHp - eneAtt[eneEne];
    if (plyHp > 0) {
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneEne] + "秒";
    } else {
      flag = false;
      clearInterval(loop);
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt[eneEne] = eneCntMax[eneEne]; //変数ｋを入れる
        plyImg.src = "img/playerA.png";
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneEne] + "秒";
      }
    }, 500);
  }
}, 1000);
