const express = require('express');
const { uuid } = require('uuidv4');
const { validateId, countReq } = require('./middleware')
const app = express();

app.use(express.json());

app.use(countReq)

app.use('/projects/:id', validateId)

const projects = [];


//Rota para listar todos projetos.
app.get('/projects', (req, res) => {
    return res.json(projects)
})
//Rota para criar um novo projeto
app.post('/projects', (req, res) => {
    const { title } = req.body
    const project = {id: uuid(), title: title, tasks: []}
    projects.push(project)
    return res.json(project)
})
//Rota para atualizar um novo projeto
app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const projectIndex = projects.findIndex(project => project.id === id)
    if(projectIndex < 0){
        return res.status(400).json({ error: 'Project not found!'})
    }
    const project = {
        id,
        title,
        tasks: [],
    }
    projects[projectIndex] = project
    return res.json(project)

})
//Rota para deletar um projeto
app.delete('/projects/:id',  (req, res) => {
    const { id } = req.params
    const projectIndex = projects.findIndex(project => project.id === id)
    if(projectIndex < 0){
        return res.status(400).json({ error: 'Project not found.'})
    }

    projects.splice(projectIndex, 1);
    return res.status(204).send()
});
//Rota para adicionar uma tarefa a um projeto.
app.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params
    const { task } = req.body
    const projectIndex = projects.findIndex(project => project.id === id)
    if(projectIndex < 0){
        return res.status(400).json({ error: 'Project not found! '})
    }
    projects[projectIndex].tasks.push(task)
    return res.json(projects[projectIndex])
})

app.listen(3334, () => {
    console.log('Server started on port 3334')
})