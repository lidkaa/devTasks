const q = ''
const w = 0
const e = true
const r = undefined
const t = null
const y = []
const u = {}
const i = () => { }
const o = new Date()

const qq = new String("")
const ww = new Number(0)
const ee = new Boolean(true)
const rr = undefined
const tt = null
const yy = new Array([])
const uu = new Object({})
const ii = () => { }
const oo = new Date()

const arr01 = [q, w, e, r, t, y, u, ii, o];
const arr02 = [qq, ww, ee, rr, tt, yy, uu, ii, oo];

for (const [index, el] of arr01.entries()) {
    const el01 = arr01[index];
    const el02 = arr02[index];

    const typeof01 = typeof el01;
    const typeof02 = typeof el02;

    const proto01 = Object.prototype.toString.call(el01);
    const proto02 = Object.prototype.toString.call(el02);

    console.log(`typeof - ${el}  -  ${typeof01} / ${typeof02}`);
    console.log(`proto - ${el}  -  ${proto01} / ${proto02}`);
}


// typeof
// instanceof
// Object.prototype.toString.call(u) === '[object Object]'
// Object.prototype.toString.call(q) === '[object String]'