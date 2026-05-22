import { cadastrarMedico, listarMedicos, buscarMedicoPorNome, buscarMedicoPorEspecialidade, atualizarMedico, removerMedico } from './src/medico.js';
import { cadastrarPaciente, listarPacientes, buscarPacientePorNome, buscarPacientePorDataNascimento, atualizarPaciente, removerPaciente } from './src/paciente.js';
import { cadastrarConsulta, listarConsultas, buscarConsultaPorData, buscarConsultaPorMedico, buscarConsultaPorPaciente, buscarConsultaPorDescricao, buscarConsultaPorMes, removerConsulta } from './src/consulta.js';
import { medico, paciente } from './src/db.js';

import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Porta ${PORT} aberta`)
});

app.get('/', (req, res) => {
    res.send("Sistema de Gerenciamento de Consultas Médicas")
})

app.get('/medico/cadastrar', (req, res) => {
    res.status(200).json({
        metodo: "POST",
        url: "/medico/cadastrar",
        body: {
            nome: "string",
            especialidade: "string"
        },
        exemplo: {
            nome: "Ana Lima",
            especialidade: "Cardiologia"
        }
    })
})

app.post('/medico/cadastrar', (req, res) => {
    const novoMedico = cadastrarMedico(req.body.nome, req.body.especialidade);
    res.status(201).json(novoMedico);
})

app.get('/medico/listar', (req, res) => {
    res.status(200).json(listarMedicos());
})

app.get('/medico/buscar/nome/:nome', (req, res) => {
    const resultado = buscarMedicoPorNome(req.params.nome);
    res.status(200).json(resultado);
})

app.get('/medico/buscar/especialidade/:especialidade', (req, res) => {
    const resultado = buscarMedicoPorEspecialidade(req.params.especialidade);
    res.status(200).json(resultado);
})

app.get('/medico/atualizar', (req, res) => {
    res.status(200).json({
        metodo: "PUT",
        url: "/medico/atualizar/:id",
        exemplo_url: "/medico/atualizar/1",
        body: {
            nome: "string (opcional)",
            especialidade: "string (opcional)"
        },
        exemplo: {
            nome: "Ana Souza"
        }
    })
})

app.put('/medico/atualizar/:id', (req, res) => {
    const atualizado = atualizarMedico(Number(req.params.id), req.body.nome, req.body.especialidade);
    if (!atualizado) return res.status(404).json({ erro: "Médico não encontrado" });
    res.status(200).json(atualizado);
})

app.delete('/medico/remover/:id', (req, res) => {
    const removido = removerMedico(Number(req.params.id));
    if (!removido) return res.status(404).json({ erro: "Médico não encontrado" });
    res.status(200).json(removido);
})

app.get('/paciente/cadastrar', (req, res) => {
    res.status(200).json({
        metodo: "POST",
        url: "/paciente/cadastrar",
        body: {
            nome: "string",
            dataNascimento: "string (formato: YYYY-MM-DD)"
        },
        exemplo: {
            nome: "João Silva",
            dataNascimento: "1990-05-10"
        }
    })
})

app.post('/paciente/cadastrar', (req, res) => {
    const novoPaciente = cadastrarPaciente(req.body.nome, req.body.dataNascimento);
    res.status(201).json(novoPaciente);
})

app.get('/paciente/listar', (req, res) => {
    res.status(200).json(listarPacientes());
})

app.get('/paciente/buscar/nome/:nome', (req, res) => {
    const resultado = buscarPacientePorNome(req.params.nome);
    res.status(200).json(resultado);
})

app.get('/paciente/buscar/nascimento/:data', (req, res) => {
    const resultado = buscarPacientePorDataNascimento(req.params.data);
    res.status(200).json(resultado);
})

app.get('/paciente/atualizar', (req, res) => {
    res.status(200).json({
        metodo: "PUT",
        url: "/paciente/atualizar/:id",
        exemplo_url: "/paciente/atualizar/1",
        body: {
            nome: "string (opcional)",
            dataNascimento: "string opcional (formato: YYYY-MM-DD)"
        },
        exemplo: {
            nome: "João Costa"
        }
    })
})

app.put('/paciente/atualizar/:id', (req, res) => {
    const atualizado = atualizarPaciente(Number(req.params.id), req.body.nome, req.body.dataNascimento);
    if (!atualizado) return res.status(404).json({ erro: "Paciente não encontrado" });
    res.status(200).json(atualizado);
})

app.delete('/paciente/remover/:id', (req, res) => {
    const removido = removerPaciente(Number(req.params.id));
    if (!removido) return res.status(404).json({ erro: "Paciente não encontrado" });
    res.status(200).json(removido);
})

app.get('/consulta/cadastrar', (req, res) => {
    res.status(200).json({
        metodo: "POST",
        url: "/consulta/cadastrar",
        body: {
            data: "string (formato: YYYY-MM-DD)",
            idMedico: "number",
            idPaciente: "number",
            descricao: "string"
        },
        exemplo: {
            data: "2025-05-15",
            idMedico: 1,
            idPaciente: 1,
            descricao: "Dor no peito"
        },
        observacao: "Não é permitido cadastrar duas consultas com o mesmo médico na mesma data"
    })
})

app.post('/consulta/cadastrar', (req, res) => {
    const novaConsulta = cadastrarConsulta(req.body.data, req.body.idMedico, req.body.idPaciente, req.body.descricao);
    if (!novaConsulta) return res.status(409).json({ erro: "Médico já possui consulta nessa data" });
    res.status(201).json(novaConsulta);
})

app.get('/consulta/listar', (req, res) => {
    res.status(200).json(listarConsultas());
})

app.get('/consulta/buscar/data/:data', (req, res) => {
    const resultado = buscarConsultaPorData(req.params.data);
    res.status(200).json(resultado);
})

app.get('/consulta/buscar/medico/:idMedico', (req, res) => {
    const resultado = buscarConsultaPorMedico(Number(req.params.idMedico));
    res.status(200).json(resultado);
})

app.get('/consulta/buscar/paciente/:idPaciente', (req, res) => {
    const resultado = buscarConsultaPorPaciente(Number(req.params.idPaciente));
    res.status(200).json(resultado);
})

app.get('/consulta/buscar/descricao/:descricao', (req, res) => {
    const resultado = buscarConsultaPorDescricao(req.params.descricao);
    res.status(200).json(resultado);
})

app.get('/consulta/buscar/mes/:mes/:ano', (req, res) => {
    const resultado = buscarConsultaPorMes(req.params.mes, req.params.ano);
    res.status(200).json(resultado);
})

app.delete('/consulta/remover/:id', (req, res) => {
    const removido = removerConsulta(Number(req.params.id));
    if (!removido) return res.status(404).json({ erro: "Consulta não encontrada" });
    res.status(200).json(removido);
})

app.get('/relatorio/medico/:idMedico/consultas', (req, res) => {
    const consultas = buscarConsultaPorMedico(Number(req.params.idMedico));
    res.status(200).json(consultas);
})

app.get('/relatorio/medico/:idMedico/pacientes', (req, res) => {
    const consultas = buscarConsultaPorMedico(Number(req.params.idMedico));
    const idsPacientes = [...new Set(consultas.map(c => c.idPaciente))];
    const pacientesAtendidos = paciente.filter(p => idsPacientes.includes(p.id));
    res.status(200).json(pacientesAtendidos);
})

app.get('/relatorio/paciente/:idPaciente/medicos', (req, res) => {
    const consultas = buscarConsultaPorPaciente(Number(req.params.idPaciente));
    const idsMedicos = [...new Set(consultas.map(c => c.idMedico))];
    const medicosAtenderam = medico.filter(m => idsMedicos.includes(m.id));
    res.status(200).json(medicosAtenderam);
})

app.get('/relatorio/consultas/mes/:mes/:ano', (req, res) => {
    const resultado = buscarConsultaPorMes(req.params.mes, req.params.ano);
    res.status(200).json(resultado);
})