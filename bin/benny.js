#!/usr/bin/env node
'use strict';

const { playGame } = require('../src/index');

const io = {
  log: (m) => console.log(m),
};

playGame(io);
