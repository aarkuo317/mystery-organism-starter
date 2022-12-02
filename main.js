// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = function (par1, par2) {
  return {
    specimenNum: par1,
    dna: par2,

    // calSurRate(dna = this.dna) {
    //   const dnaCOrG = dna.filter(b => {
    //     return b === "C" || b === "G";
    //   })
    //   return dnaCOrG.length / 15;

    // },
    surviveRate: 0,
    // willLikelySurvive(surviveRate = this.surviveRate) {
    //   return surviveRate >= 0.6;

    // },
    willLikelySurvive(dna = this.dna) {
      const dnaCOrG = dna.filter((b) => {
        return b === "C" || b === "G";
      });
      this.surviveRate = dnaCOrG.length / 15;
      return dnaCOrG.length / 15 >= 0.8;
    },

    ComplementStrand: [],

    calComplementStrand(dna = this.dna) {
      const compArray = dna.map((base) => {
        const helices = {
          A: "T",
          T: "A",
          C: "G",
          G: "C",
        };
        return helices[base];
      });
      this.ComplementStrand = compArray;
      return compArray;
    },

    mutate(i) {
      // 比起不斷loop去找不是原始值的其他值，還不如一開始就刪掉原始值
      // indexOf()在找不到值的時候會回傳-1，雖然應該不會出現在這個案例中，但還是寫一下基本判定
      const base = ["A", "T", "C", "G"];
      const findBasis = base.indexOf(this.dna[i]);
      if (findBasis !== -1) {
        delete base[findBasis];
        this.dna[i] = base[Math.floor(Math.random() * 3)];
      }
    },

    compareDNA(dna1, dna2 = this.dna) {
      const samedna = dna1.filter((basis, i, arr) => {
        return basis === dna2[i];
      });

      const percentage = (samedna.length / 15) * 100;
      return percentage;
    },
  };
};

// const a = pAequorFactory(12, mockUpStrand());
// const b = pAequorFactory(12, mockUpStrand());
// console.log(`A: ${a.dna}, B: ${b.dna}`);
// // const compareResult = a.compareDNA(b.dna);
// // console.log(compareResult);
// console.log(a.willLikelySurvive());
// console.log(b.willLikelySurvive());

// var numbers=[20, 10, 9, 25, 1, 3, 8, 11];
// var result=numbers.filter(function(element, index, arr){
//   console.log(index, arr);
// return element >= 10;
// });
// console.log(result); // [20, 10, 25, 11]

const pAequorAmount = (amount) => {
  const result = [];
  let i = 0;

  while (result.length <= amount) {
    const ins = pAequorFactory(i, mockUpStrand());
    ins.calComplementStrand();
    ins.willLikelySurvive() ? result.push(ins) : undefined;
    i += 1;
  }

  return result;
};

const surviveList = pAequorAmount(2);
console.log(surviveList);
