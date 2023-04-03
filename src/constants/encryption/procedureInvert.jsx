export const procedureInvert = (a, n) => {
  let g0 = n,
    g1 = a;
  let u0 = 1,
    u1 = 0;
  let v0 = 0,
    v1 = 1;
  while (g0 % g1 != 0) {
    let y = Math.floor(g0 / g1);
    let temp = g0 % g1;
    g0 = g1;
    g1 = temp;

    let tempU = u0 - y * u1;
    u0 = u1;
    u1 = tempU;

    let tempV = v0 - y * v1;
    v0 = v1;
    v1 = tempV;
  }
  let t = v1;
  if (t > 0) {
    return t;
  } else {
    // console.log("result t<0: " + (n + t));
    return n + t;
  }
};
