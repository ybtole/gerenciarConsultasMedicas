import { medico, proximoMedicoId } from './db.js';

export const cadastrarMedico = (nome, especialidade) => {
    const novoMedico = {
        id: proximoMedicoId(),
        nome,
        especialidade
    };
    medico.push(novoMedico);
    return novoMedico;
};

export const listarMedicos = () => { return medico };

export const buscarMedicoPorId = (id) => {
    return medico.find(m => m.id === id); // m de médico, para não confundir com p de paciente ou c de consulta
};

export const buscarMedicoPorNome = (nome) => {
    return medico.filter(m => m.nome.toLowerCase().includes(nome.toLowerCase()));
};

export const buscarMedicoPorEspecialidade = (especialidade) => {
    return medico.filter(m => m.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
};

export const atualizarMedico = (id, nome, especialidade) => {
    const m = medico.find(m => m.id === id);
    if (!m) return null;
    if (nome) m.nome = nome;
    if (especialidade) m.especialidade = especialidade;
    return m;
};

export const removerMedico = (id) => {
    const index = medico.findIndex(m => m.id === id);
    if (index === -1) return null;
    const removido = medico.splice(index, 1);
    return removido[0];
};