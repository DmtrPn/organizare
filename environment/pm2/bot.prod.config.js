'use strict';

module.exports = {
    apps: [
        {
            name: 'hmf_bot',
            interpreter: '/bin/bash',
            script: 'bin/environment',
            cwd: '',
            args: ['node', 'dist/botApp.js'],
        },
    ],
};
