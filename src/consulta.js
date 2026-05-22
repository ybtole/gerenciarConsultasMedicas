import { consulta, proximaConsultaId } from './db.js';

export const cadastrarConsulta = (data, idMedico, idPaciente, descricao) => {
    const conflito = consulta.find(c => c.idMedico === idMedico && c.data === data);
    if (conflito) return null;

    const novaConsulta = {
        id: proximaConsultaId(),
        data,
        idMedico,
        idPaciente,
        descricao
    };
    consulta.push(novaConsulta);
    return novaConsulta;
};

export const listarConsultas = () => { return consulta };

export const buscarConsultaPorId = (id) => {
    return consulta.find(c => c.id === id); // c de consulta, para não confundir com m de médico ou p de paciente
};

export const buscarConsultaPorData = (data) => {
    return consulta.filter(c => c.data === data);
};

export const buscarConsultaPorMedico = (idMedico) => {
    return consulta.filter(c => c.idMedico === idMedico);
};

export const buscarConsultaPorPaciente = (idPaciente) => {
    return consulta.filter(c => c.idPaciente === idPaciente);
};

export const buscarConsultaPorDescricao = (descricao) => {
    return consulta.filter(c => c.descricao.toLowerCase().includes(descricao.toLowerCase()));
};

export const buscarConsultaPorMes = (mes, ano) => {
    return consulta.filter(c => {
        const [anoConsulta, mesConsulta] = c.data.split('-');
        return mesConsulta === mes && anoConsulta === ano;
    });
};

export const removerConsulta = (id) => {
    const index = consulta.findIndex(c => c.id === id);
    if (index === -1) return null;
    const removido = consulta.splice(index, 1);
    return removido[0];
};
