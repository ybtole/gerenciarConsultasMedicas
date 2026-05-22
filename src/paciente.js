import { paciente, proximoPacienteId } from './db.js';

export const cadastrarPaciente = (nome, dataNascimento) => {
    const novoPaciente = {
        id: proximoPacienteId(),
        nome,
        dataNascimento
    };
    paciente.push(novoPaciente);
    return novoPaciente;
};

export const listarPacientes = () => { return paciente };

export const buscarPacientePorId = (id) => {
    return paciente.find(p => p.id === id); // p de paciente, para não confundir com m de médico ou c de consulta
};

export const buscarPacientePorNome = (nome) => {
    return paciente.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
};

export const buscarPacientePorDataNascimento = (dataNascimento) => {
    return paciente.filter(p => p.dataNascimento === dataNascimento);
};

export const atualizarPaciente = (id, nome, dataNascimento) => {
    const p = paciente.find(p => p.id === id);
    if (!p) return null;
    if (nome) p.nome = nome;
    if (dataNascimento) p.dataNascimento = dataNascimento;
    return p;
};

export const removerPaciente = (id) => {
    const index = paciente.findIndex(p => p.id === id);
    if (index === -1) return null;
    const removido = paciente.splice(index, 1);
    return removido[0];
};