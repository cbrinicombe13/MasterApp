import { delay } from 'q'

/* A bunch of utilities for dynamic animation through css */

// Shake element for 1s:
export const shake = async (id) => {
    document.getElementById(id).classList.add('faa-horizontal');
    document.getElementById(id).classList.add('animated');
    delay(1000).then(() => {
        document.getElementById(id).classList.remove('faa-horizontal');
        document.getElementById(id).classList.remove('animated');
    });
}