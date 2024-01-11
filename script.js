import {ParticleEffect, ConstellationEffect} from './scripts/particle.js'

const canvas = document.querySelector('.header-canvas');
const effect = new ParticleEffect(canvas, window.innerWidth, 400, ConstellationEffect)