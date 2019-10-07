const test = require('ava');
const { CreateMap, Island } = require('./puzzle-2');

test('Island#constructor', t => {
  const i = new Island();
  t.assert(i);
});

test('Island#contains', t => {
  const i = new Island(1, 2);

  t.is(i.contains(1, 2), true);
});

test('Island#add', t => {
  const i = new Island();
  i.add(1, 2);

  t.is(i.contains(1, 2), true);
});

test('Island#add - cannot add non-adjacent location', t => {
  const i = new Island(1, 1);

  t.throws(() => i.add(2, 2));
});

test('Island#adjecentTo', t => {
  const i = new Island();
  i.add(1, 1);

  t.is(i.adjecentTo(0, 1), true);
  t.is(i.adjecentTo(2, 1), true);
  t.is(i.adjecentTo(1, 0), true);
  t.is(i.adjecentTo(1, 2), true);
  t.is(i.adjecentTo(0, 0), false);
  t.is(i.adjecentTo(2, 2), false);
  t.is(i.adjecentTo(2, 0), false);
  t.is(i.adjecentTo(0, 2), false);
});

test('test case 1: isolated islands', t => {
  const map = CreateMap`
    11110
    00000
    00000
    00000
    00011
  `;

  t.is(map.countIslands(), 2);
});

test('test case 2: one jagged isalnd', t => {
  const map = CreateMap`
    00011
    00110
    00010
    00011
    00001
    `;

    t.is(map.countIslands(), 1);
});

test('test case 3: one compact island', t => {
  const map = CreateMap`
    00000
    11100
    00111
    00000
    00000
    `;

    t.is(map.countIslands(), 1);
});

test('test case 4: diagonally adjecent islands', t => {
  const map = CreateMap`
    00111
    11001
    00111
    00000
    00000
    `;

    t.is(map.countIslands(), 2);
});

test('test case 5: islands with sea loch', t => {
  const map = CreateMap`
    00111
    11001
    01111
    00000
    00000
    `;

    t.is(map.countIslands(), 1);
});

test('test case 6: islands with lake', t => {
  const map = CreateMap`
    01111
    11001
    01111
    00000
    00000
    `;

    t.is(map.countIslands(), 1);
});
