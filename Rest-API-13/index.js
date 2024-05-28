
const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const { writeFile } = require('fs/promises');


const app = express();
const PORT = 4000;

//middleware

app.use(express.urlencoded({extended:false}))
app.use(express.json());

//Routes

//html

app.get('/users',(req,res)=>{
    const html = `
    <ul>
      ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html)
})
//json format
app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);

})
app.patch('/api/users/:id', async(req,res)=>{
    //edit user with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user)=> user.id === id);
    if(userIndex != -1){
     const body = req.body;
     const update = {...users[userIndex],...body};
     users[userIndex] = update;
     try {
        await writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2));
            return res.status(200).json(update);
     } catch (error) {
        return res.send(500).json({error:'write file'})
     }
    }
    else{
        return res.status(404).json('user is not found')
    }
})
app.delete('/api/users/:id', async(req,res)=>{
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user)=> user.id === id);
    if(userIndex !== -1){
        users.splice(userIndex, 1);

        try {
            await writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2));
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to write file' });
        }
          
    }else{
        return res.status(404).json('User not Found');
    }
    return res.json({status:'Pendding'})
})
app.post('/api/users',async(req,res)=>{
    //create user with id
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    try {
        await writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2));
        return res.status(200).json({state: "sucess",id:users.length});
    } catch (err) {
        return res.status(500).json({ error: 'Failed to write file',  });
    }
})

app.listen(PORT,(req,res)=>{
    console.log(`server is running on PORT ${PORT}`);
})