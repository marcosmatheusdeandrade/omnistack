const {Router} = require('express')
const axios = require('axios')
const Dev = require("./models/Dev")

const routes = Router();

routes.post('/devs', async (request, response) => {
    console.log('-------------------------------------')
    const {github_username, techs} = request.body;

    const repsGitHub = await axios.get(`https://api.github.com/users/${github_username}`)
    
    const {
        name = login, 
        avatar_url, 
        bio
    } = repsGitHub.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray
    })

    return response.json(dev)
})

module.exports = routes;