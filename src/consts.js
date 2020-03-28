export const width = 6;
export const height = 6;
export const towin = 4;
export const positions = genPositions();

function genRun(i, j, iOff, jOff) {
  const run = [ i * width + j ];

  for (let c = 1; c < towin; c++) {
    i += iOff;
    j += jOff;
    if (i >= 0 && j >= 0 && i < height && j < width) {
      run.push(i * width + j);
    }
  }

  return run;
}

function genPositions() {
  const result = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let row = genRun(i, j, 0, 1);
      let col = genRun(i, j, 1, 0);
      let rdg = genRun(i, j, 1, 1);
      let ldg = genRun(i, j, 1, -1);

      if (row.length === towin) {
        result.push(row);
      }

      if (col.length === towin) {
        result.push(col);
      }

      if (rdg.length === towin) {
        result.push(rdg);
      }

      if (ldg.length === towin) {
        result.push(ldg);
      }
    }
  }

  return result;
}
