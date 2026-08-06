const swaggerUi = require('swagger-ui-express');

const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Recruitment Assessment Portal API',
        version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    paths: {
        '/aptitude': {
            get: { summary: 'Get 3 random aptitude questions', responses: { 200: { description: 'OK' } } },
            post: { summary: 'Add a new aptitude question', responses: { 201: { description: 'Created' } } }
        },
        '/aptitude/submit': {
            post: { summary: 'Submit an aptitude answer', responses: { 200: { description: 'OK' } } }
        },
        '/encrypted': {
            get: { summary: 'Get 3 random encrypted messages', responses: { 200: { description: 'OK' } } },
            post: { summary: 'Add a new encrypted message', responses: { 201: { description: 'Created' } } }
        },
        '/encrypted/submit': {
            post: { summary: 'Submit a decoded answer', responses: { 200: { description: 'OK' } } }
        },
        '/memory': {
            post: { summary: 'Save Memory Matrix stage result', responses: { 201: { description: 'Created' } } }
        },
        '/memory-sequence': {
            get: { summary: 'Get a random sequence for a level', responses: { 200: { description: 'OK' } } },
            post: { summary: 'Add a new memory sequence', responses: { 201: { description: 'Created' } } }
        },
        '/report': {
            post: { summary: 'Generate final assessment report', responses: { 201: { description: 'Created' } } }
        },
        '/leaderboard': {
            get: { summary: 'Get leaderboard', responses: { 200: { description: 'OK' } } },
            post: { summary: 'Add leaderboard entry', responses: { 201: { description: 'Created' } } }
        }
    }
};

module.exports = { swaggerUi, swaggerSpec };